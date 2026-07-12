'use client';

import { useCallback } from 'react';
import {
  Description, FieldError, Label, NumberField as HeroNumberField
} from '@heroui/react';

import styles from './NumberField.module.scss';

interface NumberFieldProps {
  label: string;
  unit?: string;
  formatOptions?: Intl.NumberFormatOptions;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
}

const parseValue = (value: string): number => {
  if (value.trim() === '') {
    return Number.NaN;
  }

  const parsed = Number(value.replace(',', '.'));

  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

const NumberField = ({
  label, unit, formatOptions, value, onChange, hint, error
}: NumberFieldProps) => {
  const handleChange = useCallback((next: number) => {
    onChange(Number.isNaN(next) ? '' : String(next));
  }, [onChange]);

  return (
    <HeroNumberField
      className={styles.field}
      formatOptions={formatOptions}
      fullWidth
      isInvalid={Boolean(error)}
      value={parseValue(value)}
      onChange={handleChange}
    >
      <Label>{label}</Label>

      <div className={styles.inputRow}>
        <HeroNumberField.Group>
          <HeroNumberField.DecrementButton />
          <HeroNumberField.Input />
          <HeroNumberField.IncrementButton />
        </HeroNumberField.Group>

        {unit && !formatOptions ? (
          <span className={styles.unit}>
            {unit}
          </span>
        ) : null}
      </div>

      {hint ? <Description>{hint}</Description> : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </HeroNumberField>
  );
};

export default NumberField;
