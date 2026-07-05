import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../../components/page-header";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import TraditionalWatermark from "../../components/traditional-watermark";

export const metadata: Metadata = {
  title: "Services",
  description:
    "How the Ministry of Education and Human Resources Development serves schools, teachers, students, and the public.",
};

type ServiceSection = {
  title: string;
  audience: string;
  image: string;
  description: string;
  steps: string[];
};

const services: ServiceSection[] = [
  {
    title: "School registration & approvals",
    audience: "Schools & education authorities",
    image: "/svc-registration.jpg",
    description:
      "All schools operating in the Solomon Islands must be registered with the Ministry and meet national operating requirements. The Ministry processes new registrations, renewals, and changes of ownership or location, working through provincial education authorities.",
    steps: [
      "Contact your provincial education authority to request the registration pack.",
      "Submit the completed application with supporting documents (land agreement, enrolment projections, staffing plan).",
      "A joint inspection is scheduled with the provincial authority.",
      "Registration certificates are issued by the Ministry and renewed every three years.",
    ],
  },
  {
    title: "Examinations & results",
    audience: "Students & parents",
    image: "/svc-examinations.jpg",
    description:
      "The National Examinations and Standards Unit administers the SISE, SISC, and SINF national examinations. Timetables, preparation materials, and past papers are published on this hub, and candidates can access their results through their school or provincial authority.",
    steps: [
      "Check the current examination timetable in the document library.",
      "Confirm your registration with your school before the closing date.",
      "Use past papers and study guides in the learning resources section to prepare.",
      "Results are released to schools; certificates follow through the provincial authority.",
    ],
  },
  {
    title: "Teacher services & payroll",
    audience: "Teachers",
    image: "/svc-teachers.jpg",
    description:
      "The Teaching Service Division manages teacher registration, appointments, transfers, professional development, and payroll enquiries for the national teaching service.",
    steps: [
      "Register with the Teaching Service Division to receive a teacher registration number.",
      "Appointments and transfers are processed through your education authority.",
      "Professional development modules and recorded training are available in the video library.",
      "Payroll enquiries should quote your registration number and school code.",
    ],
  },
];

export default function ServicesInfoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <PageHeader
        id="wm-services-page"
        eyebrow="About the Ministry"
        title="Services for schools, teachers, and the public."
        lead="What the Ministry does, who each service is for, and how to access it. Most services are delivered together with the nine provincial education authorities."
        crumbs={[{ label: "About" }, { label: "Services" }]}
      />

      <main className="flex-1 bg-background">
        {/* service sections */}
        <div className="relative isolate overflow-hidden">
          <TraditionalWatermark id="wm-services-list" />
          <div className="mx-auto w-full max-w-8xl space-y-20 px-6 py-16 sm:py-20">
            {services.map((s, i) => (
              <section
                key={s.title}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border shadow-sm">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {s.audience}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-sm text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted">
                    {s.description}
                  </p>
                  <ol className="mt-6 space-y-3">
                    {s.steps.map((step, n) => (
                      <li key={n} className="flex gap-3 text-sm leading-6 text-foreground">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
                          {n + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* scholarships callout */}
        <section className="relative isolate overflow-hidden text-white">
          <Image
            src="/cta-scholarships.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(8,20,40,0.92),rgba(8,20,40,0.6))]" />
          <div className="mx-auto w-full max-w-8xl px-6 py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Scholarships &amp; study awards
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              Looking for scholarships?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
              Scholarships and study awards are managed on the national
              scholarships platform, where you can check eligibility, apply,
              and track your application.
            </p>
            <a
              href="https://scholarships.education.gov.sb"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Go to the scholarships portal
              <span aria-hidden>↗</span>
            </a>
          </div>
        </section>

        {/* contact strip */}
        <section className="bg-surface">
          <div className="mx-auto flex w-full max-w-8xl flex-wrap items-center justify-between gap-6 px-6 py-12">
            <div>
              <h2 className="font-serif text-2xl text-foreground">
                Can&apos;t find the service you need?
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Our team can point you to the right division or provincial
                office.
              </p>
            </div>
            <Link
              href="/about/contact"
              className="inline-flex h-12 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Contact the Ministry
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
