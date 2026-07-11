'use client';

import { useCallback } from 'react';

import styles from './SelectField.module.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  hint?: string;
}

const SelectField = ({
  label, value, onChange, options, hint
}: SelectFieldProps) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
      </span>

      <select
        className={styles.select}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {hint ? (
        <span className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </label>
  );
};

export default SelectField;
