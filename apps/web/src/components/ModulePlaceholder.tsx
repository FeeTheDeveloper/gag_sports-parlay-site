import type { LucideIcon } from "lucide-react";
import styles from "./ModulePlaceholder.module.css";

type ModulePlaceholderProps = {
  icon: LucideIcon;
  phase: string;
  title: string;
  body: string;
};

export function ModulePlaceholder({ icon: Icon, phase, title, body }: ModulePlaceholderProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>
        <Icon size={26} strokeWidth={2} aria-hidden />
      </span>
      <p className={styles.phase}>{phase}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.body}>{body}</p>
    </div>
  );
}
