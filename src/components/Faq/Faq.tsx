import styles from './Faq.module.scss';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
}

const Faq = ({ items }: FaqProps) => (
  <div className={styles.faq}>
    <h2 className={styles.title}>
      Частые вопросы
    </h2>

    {items.map((item) => (
      <details
        key={item.question}
        className={styles.item}
      >
        <summary className={styles.question}>
          {item.question}
        </summary>

        <p className={styles.answer}>
          {item.answer}
        </p>
      </details>
    ))}
  </div>
);

export default Faq;
