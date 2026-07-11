import styles from './CalculatorPage.module.scss';

interface CalculatorPageProps {
  title: string;
  intro: string;
  children: React.ReactNode;
}

const CalculatorPage = ({ title, intro, children }: CalculatorPageProps) => (
  <div className={styles.content}>
    <div className={styles.head}>
      <h1 className={styles.title}>
        {title}
      </h1>

      <p className={styles.intro}>
        {intro}
      </p>
    </div>

    {children}
  </div>
);

export default CalculatorPage;
