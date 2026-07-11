'use client';

import { useCallback } from 'react';

import styles from './NumberField.module.scss';

interface NumberFieldProps {
  label: string;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
}

const NumberField = ({
  label, unit, value, onChange, hint, error
}: NumberFieldProps) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
      </span>

      <span className={styles.inputRow}>
        <input
          className={error ? `${styles.input} ${styles.inputError}` : styles.input}
          inputMode="decimal"
          step="any"
          type="number"
          value={value}
          onChange={handleChange}
        />

        {unit ? (
          <span className={styles.unit}>
            {unit}
          </span>
        ) : null}
      </span>

      {hint ? (
        <span className={styles.hint}>
          {hint}
        </span>
      ) : null}

      {error ? (
        <span className={styles.error}>
          {error}
        </span>
      ) : null}
    </label>
  );
};

export default NumberField;
