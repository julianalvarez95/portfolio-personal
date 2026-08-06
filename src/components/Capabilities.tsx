import { capabilityGroups, languages } from "@/data/capabilities";
import { SectionHeading } from "./SectionHeading";
import { BrandIcon } from "./icons/BrandIcon";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="container">
        <SectionHeading index="04" title="Capabilities" />
        <div className={styles.grid}>
          {capabilityGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.icon && (
                      <BrandIcon icon={item.icon} className={styles.itemIcon} />
                    )}
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <dl className={styles.languages}>
          {languages.map((lang) => (
            <div key={lang.name} className={styles.language}>
              <dt>{lang.name}</dt>
              <dd>{lang.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
