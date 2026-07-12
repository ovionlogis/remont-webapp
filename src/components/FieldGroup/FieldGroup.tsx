import { Fieldset } from '@heroui/react';

import styles from './FieldGroup.module.scss';

interface FieldGroupProps {
  title: string;
  children: React.ReactNode;
}

const FieldGroup = ({ title, children }: FieldGroupProps) => (
  <Fieldset className={styles.group}>
    <Fieldset.Legend className={styles.legend}>
      {title}
    </Fieldset.Legend>

    <Fieldset.Group className={styles.body}>
      {children}
    </Fieldset.Group>
  </Fieldset>
);

export default FieldGroup;
