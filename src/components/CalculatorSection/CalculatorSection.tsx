import styles from './CalculatorSection.module.scss';

interface CalculatorSectionProps {
  title?: string;
  children: React.ReactNode;
}

const CalculatorSection = ({ title, children }: CalculatorSectionProps) => (
  <section className={styles.section}>
    {title ? (
      <h2 className={styles.title}>
        {title}
      </h2>
    ) : null}

    <div className={styles.body}>
      {children}
    </div>
  </section>
);

export default CalculatorSection;
