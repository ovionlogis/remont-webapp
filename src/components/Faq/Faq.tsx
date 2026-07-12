import { Accordion, Typography } from '@heroui/react';

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
    <Typography.Heading
      className={styles.title}
      level={2}
    >
      Частые вопросы
    </Typography.Heading>

    <Accordion
      className={styles.accordion}
      variant="surface"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.question}
          className={styles.item}
        >
          <Accordion.Heading>
            <Accordion.Trigger className={styles.question}>
              {item.question}

              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>

          <Accordion.Panel>
            <Accordion.Body>
              <Typography.Paragraph className={styles.answer}>
                {item.answer}
              </Typography.Paragraph>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  </div>
);

export default Faq;
