import styles from './Disclaimer.module.scss';

interface DisclaimerProps {
  children: React.ReactNode;
}

const Disclaimer = ({ children }: DisclaimerProps) => (
  <p className={styles.disclaimer}>
    {children}
  </p>
);

export default Disclaimer;
