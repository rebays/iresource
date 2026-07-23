from grapple.helpers import register_streamfield_block
from grapple.models import GraphQLString
from wagtail import blocks


PILLAR_ICON_CHOICES = [
    ("shield", "Shield (verified / trust)"),
    ("people", "People (community / inclusion)"),
    ("cloud", "Cloud (access / offline)"),
]


@register_streamfield_block
class PillarBlock(blocks.StructBlock):
    title = blocks.CharBlock(max_length=100)
    text = blocks.TextBlock()
    icon = blocks.ChoiceBlock(choices=PILLAR_ICON_CHOICES, required=False)

    graphql_fields = [
        GraphQLString("title"),
        GraphQLString("text"),
        GraphQLString("icon"),
    ]

    class Meta:
        icon = "list-ul"
