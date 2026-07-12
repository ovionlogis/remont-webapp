import { cn, Typography } from '@heroui/react';

import styles from './Disclaimer.module.scss';

interface DisclaimerProps {
  className?: string;
  children: React.ReactNode;
}

const Disclaimer = ({ className, children }: DisclaimerProps) => (
  <Typography.Paragraph className={cn(styles.disclaimer, className)}>
    {children}
  </Typography.Paragraph>
);

export default Disclaimer;
