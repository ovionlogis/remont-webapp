'use client';

import { useCallback } from 'react';
import {
  Description, Label, ListBox, Select
} from '@heroui/react';

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
  const handleSelectionChange = useCallback((key: React.Key | null) => {
    if (key !== null) {
      onChange(String(key));
    }
  }, [onChange]);

  return (
    <Select
      className={styles.field}
      fullWidth
      selectedKey={value}
      onSelectionChange={handleSelectionChange}
    >
      <Label>{label}</Label>

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox items={options}>
          {(option) => (
            <ListBox.Item
              id={option.value}
              textValue={option.label}
            >
              {option.label}
            </ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>

      {hint ? <Description>{hint}</Description> : null}
    </Select>
  );
};

export default SelectField;
