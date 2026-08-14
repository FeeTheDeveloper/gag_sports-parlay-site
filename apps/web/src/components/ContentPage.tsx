import type { ReactNode } from "react";
import styles from "./ContentPage.module.css";

type ContentPageProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function ContentPage({ eyebrow, title, children }: ContentPageProps) {
  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
}
