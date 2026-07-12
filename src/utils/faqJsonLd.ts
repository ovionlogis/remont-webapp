import type { FAQPage, WithContext } from 'schema-dts';

interface FaqItem {
  question: string;
  answer: string;
}

export const createFaqJsonLd = (items: FaqItem[]): WithContext<FAQPage> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
});
