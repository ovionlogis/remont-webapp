import styles from './CalculatorGrid.module.scss';

interface CalculatorGridProps {
  fields: React.ReactNode;
  result: React.ReactNode;
}

const CalculatorGrid = ({ fields, result }: CalculatorGridProps) => (
  <div className={styles.grid}>
    <div className={styles.fields}>
      {fields}
    </div>

    <div className={styles.result}>
      {result}
    </div>
  </div>
);

export default CalculatorGrid;
