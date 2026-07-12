import { Typography } from '@heroui/react';

import ButtonLink from '@/components/ButtonLink';

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
  ctaHref?: string;
  ctaLabel?: string;
}

const ResultCard = ({
  heading,
  value,
  metrics = [],
  note,
  invalid = false,
  invalidMessage = 'Заполните поля выше корректными значениями',
  ctaHref,
  ctaLabel
}: ResultCardProps) => (
  <div className={styles.card}>
    {invalid ? (
      <Typography.Paragraph className={styles.invalid}>
        {invalidMessage}
      </Typography.Paragraph>
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
          <Typography.Paragraph className={styles.note}>
            {note}
          </Typography.Paragraph>
        ) : null}

        {ctaHref && ctaLabel ? (
          <ButtonLink
            className={styles.cta}
            href={ctaHref}
            size="sm"
            variant="secondary"
          >
            {ctaLabel}
          </ButtonLink>
        ) : null}
      </>
    )}
  </div>
);

export default ResultCard;
