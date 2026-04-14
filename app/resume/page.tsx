import { Download, Briefcase, GraduationCap, Wrench, Award, User } from "lucide-react";
import { resumeData } from "@/lib/data/resume";
import { siteConfig } from "@/lib/data/siteConfig";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";

export const metadata = {
  title: "Resume — Shahrin Nakkhatra",
  description: "Professional experience, education, and skills.",
};

export default function ResumePage() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Resume</h1>
            <p className="mt-3 text-text-secondary">
              {siteConfig.shortName} &middot; {siteConfig.role}
            </p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-background text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

        <div className="max-w-3xl space-y-14">
          {/* Professional Summary */}
          {resumeData.summary && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <User size={20} className="text-accent" />
                <h2 className="text-2xl font-bold font-heading">
                  Professional Summary
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={20} className="text-accent" />
              <h2 className="text-2xl font-bold font-heading">Experience</h2>
            </div>
            <div className="space-y-8">
              {resumeData.experience.map((exp) => (
                <div
                  key={`${exp.company}-${exp.period}`}
                  className="relative pl-6 border-l-2 border-border"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <h3 className="font-heading font-semibold text-text-primary text-lg">
                    {exp.title}
                  </h3>
                  <p className="text-accent text-sm mt-0.5">{exp.company}</p>
                  <p className="text-text-muted text-sm">
                    {exp.period} &middot; {exp.location}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-text-secondary text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-accent mt-1.5 shrink-0">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={20} className="text-accent" />
              <h2 className="text-2xl font-bold font-heading">Education</h2>
            </div>
            <div className="space-y-6">
              {resumeData.education.map((edu) => (
                <div
                  key={edu.institution}
                  className="relative pl-6 border-l-2 border-border"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <h3 className="font-heading font-semibold text-text-primary">
                    {edu.degree}
                  </h3>
                  <p className="text-accent text-sm mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="text-text-muted text-sm">
                    {edu.period} &middot; {edu.location}
                  </p>
                  {edu.details && (
                    <p className="text-text-secondary text-sm mt-2">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Wrench size={20} className="text-accent" />
              <h2 className="text-2xl font-bold font-heading">Skills</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {resumeData.skills.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-accent" />
                <h2 className="text-2xl font-bold font-heading">
                  Certifications
                </h2>
              </div>
              <ul className="space-y-2">
                {resumeData.certifications.map((cert, i) => (
                  <li key={i} className="text-text-secondary text-sm flex gap-2">
                    <span className="text-accent">•</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
