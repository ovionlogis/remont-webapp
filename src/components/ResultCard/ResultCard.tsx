import styles from './ResultCard.module.scss';

interface ResultMetric {
  label: string;
  value: string;
}

interface ResultCardProps {
  heading: string;
  value?: string;
  metrics?: ResultMetric[];
  note?: string;
  invalid?: boolean;
  invalidMessage?: string;
}

const ResultCard = ({
  heading,
  value,
  metrics = [],
  note,
  invalid = false,
  invalidMessage = 'Заполните поля выше корректными значениями'
}: ResultCardProps) => (
  <div className={styles.card}>
    {invalid ? (
      <p className={styles.invalid}>
        {invalidMessage}
      </p>
    ) : (
      <>
        <span className={styles.heading}>
          {heading}
        </span>

        <span className={styles.value}>
          {value}
        </span>

        {metrics.length > 0 ? (
          <ul className={styles.metrics}>
            {metrics.map((metric) => (
              <li key={metric.label}>
                <span className={styles.metricLabel}>
                  {metric.label}
                </span>

                <span className={styles.metricValue}>
                  {metric.value}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {note ? (
          <p className={styles.note}>
            {note}
          </p>
        ) : null}
      </>
    )}
  </div>
);

export default ResultCard;
