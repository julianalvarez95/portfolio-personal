import { caseStudies } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { CaseStudy } from "./CaseStudy";

export function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading index="02" title="Work" />
        {caseStudies.map((entry, i) => (
          <CaseStudy key={entry.id} entry={entry} subIndex={`02.${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
