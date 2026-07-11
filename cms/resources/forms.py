from django import forms
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.template.defaultfilters import filesizeformat
from wagtail.admin.widgets import AdminDateInput

from .models import Resource, is_video_filename


class FolderForm(forms.Form):
    name = forms.CharField(label="Folder name", max_length=255)


class ResourceFileField(forms.FileField):
    """
    FileField enforcing the resource library's upload rules from settings:
    RESOURCE_LIBRARY_EXTENSIONS, and a per-kind size limit so videos
    (RESOURCE_LIBRARY_VIDEO_MAX_UPLOAD_SIZE) can be far larger than documents
    (RESOURCE_LIBRARY_MAX_UPLOAD_SIZE). Either limit may be None for no limit.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        allowed_extensions = getattr(settings, "RESOURCE_LIBRARY_EXTENSIONS", None)
        if allowed_extensions:
            self.validators = [
                *self.validators,
                FileExtensionValidator(allowed_extensions),
            ]
        if not self.help_text:
            self.help_text = self.size_limits_text()

    @staticmethod
    def size_limits_text():
        doc_max = getattr(settings, "RESOURCE_LIBRARY_MAX_UPLOAD_SIZE", None)
        video_max = getattr(settings, "RESOURCE_LIBRARY_VIDEO_MAX_UPLOAD_SIZE", None)
        parts = []
        if doc_max is not None:
            parts.append(f"documents up to {filesizeformat(doc_max)}")
        if video_max is not None:
            parts.append(f"videos up to {filesizeformat(video_max)}")
        return f"Maximum filesize: {', '.join(parts)}." if parts else ""

    def validate(self, value):
        super().validate(value)
        if value is None:
            return
        if is_video_filename(value.name):
            max_size = getattr(settings, "RESOURCE_LIBRARY_VIDEO_MAX_UPLOAD_SIZE", None)
        else:
            max_size = getattr(settings, "RESOURCE_LIBRARY_MAX_UPLOAD_SIZE", None)
        if max_size is not None and value.size > max_size:
            raise ValidationError(
                f"'{value.name}' is too big ({filesizeformat(value.size)}). "
                f"Maximum filesize: {filesizeformat(max_size)}.",
                code="file_too_large",
            )


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleResourceFileField(ResourceFileField):
    """ResourceFileField accepting multiple files, validated one by one."""

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput(attrs={"multiple": True}))
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_clean = super().clean
        if not isinstance(data, (list, tuple)):
            data = [data]
        if not data:
            data = [None]  # let FileField raise its usual 'required' error
        cleaned = [single_clean(d, initial) for d in data]
        return [f for f in cleaned if f is not None]


class MultipleDocumentUploadForm(forms.Form):
    """
    Bulk upload form: the metadata fields are applied to every selected file;
    each resource's title is derived from its filename.
    """

    files = MultipleResourceFileField(label="Files")
    resource_type = forms.ChoiceField(
        choices=Resource.ResourceType.choices,
        initial=Resource.ResourceType.PDS,
    )
    language = forms.CharField(
        max_length=10,
        required=False,
        initial="en",
        help_text="ISO language code, e.g. en, fr, de",
    )
    revision_date = forms.DateField(required=False, widget=AdminDateInput)
    description = forms.CharField(
        required=False, widget=forms.Textarea(attrs={"rows": 3})
    )


class ResourceForm(forms.ModelForm):
    """Edit form for a single resource; replacing the file is optional."""

    class Meta:
        model = Resource
        fields = [
            "title",
            "file",
            "resource_type",
            "description",
            "language",
            "revision_date",
        ]
        field_classes = {"file": ResourceFileField}
        widgets = {
            "revision_date": AdminDateInput,
            "description": forms.Textarea(attrs={"rows": 3}),
        }
