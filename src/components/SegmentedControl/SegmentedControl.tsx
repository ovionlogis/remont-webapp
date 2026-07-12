'use client';

import { useCallback } from 'react';
import { Label, ToggleButton, ToggleButtonGroup } from '@heroui/react';

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
  const handleSelectionChange = useCallback((keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      return;
    }

    const [first] = keys;

    if (first !== undefined) {
      onChange(String(first));
    }
  }, [onChange]);

  return (
    <div className={styles.field}>
      <Label>{label}</Label>

      <ToggleButtonGroup
        disallowEmptySelection
        isDetached
        selectedKeys={new Set([value])}
        selectionMode="single"
        onSelectionChange={handleSelectionChange}
      >
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            id={option.value}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default SegmentedControl;
