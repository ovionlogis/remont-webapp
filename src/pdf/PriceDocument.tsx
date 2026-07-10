import path from 'path';

import { Fragment } from 'react';
import {
  Document, Image, Page, StyleSheet, Text, View
} from '@react-pdf/renderer';

import { PRICE_UPDATED_AT, prices } from '@/content/prices/data';

const colors = {
  text: '#6b3b25',
  dark: '#4a2f22',
  accent: '#e09402',
  accentTint: '#fdf1dc',
  muted: '#8a8177',
  border: '#e4dfd6',
  rowAlt: '#f7f4ee',
  page: '#fffdfa'
};

const logoSrc = path.join(process.cwd(), 'src/components/Logo/logo.png');

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;

const renderPageNumber = ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => (
  `${pageNumber} / ${totalPages}`
);

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontFamily: 'PT Sans',
    fontSize: 9.5,
    color: colors.text,
    backgroundColor: colors.page
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottom: `1px solid ${colors.border}`
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 22,
    height: 22,
    marginRight: 8
  },
  headerTitle: {
    fontFamily: 'PT Serif',
    fontSize: 10,
    fontWeight: 700,
    color: colors.dark
  },
  headerPhones: {
    fontFamily: 'PT Sans',
    fontSize: 9,
    fontWeight: 700,
    color: colors.text,
    textAlign: 'right'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTop: `1px solid ${colors.border}`
  },
  footerText: {
    fontSize: 8,
    color: colors.muted
  },
  cover: {
    marginBottom: 20
  },
  title: {
    fontFamily: 'PT Serif',
    fontSize: 26,
    fontWeight: 700,
    color: colors.dark,
    marginBottom: 4
  },
  updated: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 14
  },
  disclaimer: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.text,
    backgroundColor: colors.accentTint,
    borderLeft: `3px solid ${colors.accent}`,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  categoryHeadingBlock: {
    marginTop: 14
  },
  categoryHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4
  },
  categoryNum: {
    fontFamily: 'PT Serif',
    fontSize: 13,
    fontWeight: 700,
    color: colors.accent,
    marginRight: 5
  },
  categoryName: {
    fontFamily: 'PT Serif',
    fontSize: 13,
    fontWeight: 700,
    color: colors.dark
  },
  tableHeadRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderBottom: `1px solid ${colors.border}`
  },
  tableHeadCell: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.muted
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  rowAlt: {
    backgroundColor: colors.rowAlt
  },
  name: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingRight: 10,
    lineHeight: 0.72
  },
  price: {
    flexShrink: 0,
    width: 70,
    fontWeight: 700,
    textAlign: 'right',
    color: colors.dark
  },
  dim: {
    flexShrink: 0,
    width: 40,
    textAlign: 'right',
    color: colors.muted
  }
});

const PriceDocument = () => (
  <Document
    author="remont-nsk.net"
    title="Прайс-лист"
  >
    <Page
      size="A4"
      style={styles.page}
    >
      <View
        fixed
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <Image
            src={logoSrc}
            style={styles.logo}
          />

          <Text style={styles.headerTitle}>Ремонт и отделка</Text>
        </View>

        <Text style={styles.headerPhones}>
          8 (913) 955-12-49 · 8 (951) 371-94-11
        </Text>
      </View>

      <View style={styles.cover}>
        <Text style={styles.title}>Прайс-лист</Text>

        <Text style={styles.updated}>
          Прайс обновлён: {PRICE_UPDATED_AT.label}
        </Text>

        <Text style={styles.disclaimer}>
          Цены в прайсе ориентировочные и не являются публичной офертой.
          Итоговая стоимость определяется индивидуально после оценки объекта и может отличаться
          от цен в прайсе в зависимости от сложности, объёма и особенностей работ.
          Чтобы получить точный расчёт и оформить заказ, позвоните нам по телефону
          {' '}8 (913) 955-12-49.
        </Text>
      </View>

      {prices.map((category, categoryIndex) => (
        <Fragment key={category.slug}>
          <View
            minPresenceAhead={40}
            wrap={false}
            style={styles.categoryHeadingBlock}
          >
            <View style={styles.categoryHeading}>
              <Text style={styles.categoryNum}>{categoryIndex + 1}.</Text>

              <Text style={styles.categoryName}>{category.name}</Text>
            </View>

            <View style={styles.tableHeadRow}>
              <Text style={[styles.tableHeadCell, styles.name]}>Наименование работ</Text>
              <Text style={[styles.tableHeadCell, styles.price]}>Цена</Text>
              <Text style={[styles.tableHeadCell, styles.dim]}>Ед.</Text>
            </View>
          </View>

          {category.items.map((item, itemIndex) => (
            <View
              key={item.name}
              wrap={false}
              style={itemIndex % 2 === 1 ? [styles.row, styles.rowAlt] : styles.row}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <Text style={styles.dim}>{item.dim}</Text>
            </View>
          ))}
        </Fragment>
      ))}

      <View
        fixed
        style={styles.footer}
      >
        <Text style={styles.footerText}>remont-nsk.net</Text>

        <Text
          style={styles.footerText}
          render={renderPageNumber}
        >
          {' '}
        </Text>
      </View>
    </Page>
  </Document>
);

export default PriceDocument;
