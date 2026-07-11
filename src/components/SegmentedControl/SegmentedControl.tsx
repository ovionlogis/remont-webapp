'use client';

import { useCallback } from 'react';

import styles from './SegmentedControl.module.scss';

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
}

const SegmentedControl = ({
  label, value, onChange, options
}: SegmentedControlProps) => {
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const optionValue = event.currentTarget.dataset.value;

    if (optionValue !== undefined) {
      onChange(optionValue);
    }
  }, [onChange]);

  return (
    <div className={styles.field}>
      <span className={styles.label}>
        {label}
      </span>

      <div className={styles.segments}>
        {options.map((option) => (
          <button
            key={option.value}
            className={option.value === value ? `${styles.segment} ${styles.segmentActive}` : styles.segment}
            data-value={option.value}
            type="button"
            onClick={handleClick}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
