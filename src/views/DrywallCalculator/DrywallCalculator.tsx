'use client';

import { useCallback, useMemo, useState } from 'react';
import { Typography } from '@heroui/react';

import CalculatorGrid from '@/components/CalculatorGrid';
import CalculatorPage from '@/components/CalculatorPage';
import CalculatorSection from '@/components/CalculatorSection';
import Disclaimer from '@/components/Disclaimer';
import Faq from '@/components/Faq';
import FieldGroup from '@/components/FieldGroup';
import NumberField from '@/components/NumberField';
import RelatedCalculators from '@/components/RelatedCalculators';
import ResultCard from '@/components/ResultCard';
import SegmentedControl from '@/components/SegmentedControl';
import SelectField from '@/components/SelectField';
import { formatNumber, isInRange, parseNumber } from '@/utils/calculator';
import { METER_FORMAT, PERCENT_FORMAT } from '@/utils/numberFieldFormats';

import { faqItems } from './faqItems';

const SHEET_PRESETS = [
  { value: '3', label: '1200×2500 мм (3,0 м²)' },
  { value: '3.6', label: '1200×3000 мм (3,6 м²)' },
  { value: '2.4', label: '1200×2000 мм (2,4 м²)' }
];

const SPACING_PRESETS = [
  { value: '0.6', label: '600 мм' },
  { value: '0.4', label: '400 мм' }
];

const PROFILE_BAR_LENGTH_M = 3;

const DrywallCalculator = () => {
  const [areaMode, setAreaMode] = useState('area');
  const [areaM2, setAreaM2] = useState('20');
  const [perimeterM, setPerimeterM] = useState('12');
  const [heightM, setHeightM] = useState('2.7');
  const [openingsM2, setOpeningsM2] = useState('0');
  const [sheetPreset, setSheetPreset] = useState('3');
  const [sheetAreaM2, setSheetAreaM2] = useState('3');
  const [layers, setLayers] = useState('1');
  const [wastePercent, setWastePercent] = useState('7');
  const [spacingPreset, setSpacingPreset] = useState('0.6');
  const [spacingM, setSpacingM] = useState('0.6');
  const [screwRate, setScrewRate] = useState('22');

  const handleSheetPresetChange = useCallback((value: string) => {
    setSheetPreset(value);
    setSheetAreaM2(value);
  }, []);

  const handleSpacingPresetChange = useCallback((value: string) => {
    setSpacingPreset(value);
    setSpacingM(value);
  }, []);

  const result = useMemo(() => {
    const areaDirect = parseNumber(areaM2);
    const perimeter = parseNumber(perimeterM);
    const height = parseNumber(heightM);
    const openings = parseNumber(openingsM2) ?? 0;
    const sheetArea = parseNumber(sheetAreaM2);
    const layersNum = parseNumber(layers);
    const waste = parseNumber(wastePercent);
    const spacing = parseNumber(spacingM);
    const screwRateNum = parseNumber(screwRate);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        area = areaDirect;
      }
    } else if (perimeter !== null && height !== null && isInRange(perimeter, 0.1, 100) && isInRange(height, 2, 4.5)) {
      area = perimeter * height - openings;
    }

    const isValid = area !== null && area > 0
      && sheetArea !== null && isInRange(sheetArea, 1, 10)
      && layersNum !== null && isInRange(layersNum, 1, 3)
      && waste !== null && isInRange(waste, 0, 20)
      && spacing !== null && isInRange(spacing, 0.3, 0.6)
      && screwRateNum !== null && isInRange(screwRateNum, 5, 60);

    if (
      !isValid || area === null || sheetArea === null || layersNum === null
      || waste === null || spacing === null || screwRateNum === null
    ) {
      return null;
    }

    const sheets = Math.ceil((area * layersNum * (1 + waste / 100)) / sheetArea);
    const studLengthM = (area / spacing) * layersNum;
    const studBars = Math.ceil(studLengthM / PROFILE_BAR_LENGTH_M);
    const screws = Math.ceil(area * layersNum * screwRateNum);

    return {
      area, sheets, studLengthM, studBars, screws
    };
  }, [areaMode, areaM2, perimeterM, heightM, openingsM2, sheetAreaM2, layers, wastePercent, spacingM, screwRate]);

  const metrics = result ? [
    { label: 'Площадь обшивки', value: `${formatNumber(result.area)} м²` },
    { label: 'Формат листа', value: SHEET_PRESETS.find((preset) => preset.value === sheetPreset)?.label ?? `${sheetAreaM2} м²` },
    { label: 'Профиль стоечный', value: `${formatNumber(result.studLengthM)} м (${result.studBars} шт. по ${PROFILE_BAR_LENGTH_M} м)` },
    { label: 'Саморезы', value: `${result.screws} шт.` },
    { label: 'Слоёв', value: `${layers} шт.` }
  ] : [];

  const heightValue = parseNumber(heightM);
  const heightError = areaMode === 'walls' && heightValue !== null && !isInRange(heightValue, 2, 4.5)
    ? 'Обычно 2–4.5 м'
    : undefined;

  const perimeterValue = parseNumber(perimeterM);
  const openingsValue = parseNumber(openingsM2);
  const openingsError = areaMode === 'walls' && openingsValue !== null && perimeterValue !== null
    && heightValue !== null && openingsValue >= perimeterValue * heightValue
    ? 'Не может быть больше площади стен'
    : undefined;

  return (
    <CalculatorPage
      intro="Калькулятор считает количество листов гипсокартона, длину стоечного профиля и саморезы по площади стен или потолка. Это ориентир для закупки материала, а не проектный расчёт каркаса."
      title="Калькулятор гипсокартона: листы, профиль и саморезы"
    >
      <CalculatorGrid
        fields={(
          <>
            <FieldGroup title="Площадь обшивки">
              <SegmentedControl
                label="Как ввести площадь"
                options={[
                  { value: 'area', label: 'Площадь напрямую' },
                  { value: 'walls', label: 'Периметр × высота' }
                ]}
                value={areaMode}
                onChange={setAreaMode}
              />

              {areaMode === 'area' ? (
                <NumberField
                  label="Площадь обшивки"
                  unit="м²"
                  value={areaM2}
                  onChange={setAreaM2}
                />
              ) : (
                <>
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Периметр помещения"
                    value={perimeterM}
                    onChange={setPerimeterM}
                  />
                  <NumberField
                    error={heightError}
                    formatOptions={METER_FORMAT}
                    label="Высота стен"
                    value={heightM}
                    onChange={setHeightM}
                  />
                  <NumberField
                    error={openingsError}
                    hint="Двери, окна и другие зоны без обшивки"
                    label="Площадь проёмов"
                    unit="м²"
                    value={openingsM2}
                    onChange={setOpeningsM2}
                  />
                </>
              )}
            </FieldGroup>

            <FieldGroup title="Лист гипсокартона">
              <SelectField
                label="Формат листа"
                options={SHEET_PRESETS}
                value={sheetPreset}
                onChange={handleSheetPresetChange}
              />

              <NumberField
                hint="Площадь одного листа — можно указать свою"
                label="Площадь листа"
                unit="м²"
                value={sheetAreaM2}
                onChange={setSheetAreaM2}
              />

              <NumberField
                label="Количество слоёв"
                unit="шт."
                value={layers}
                onChange={setLayers}
              />
            </FieldGroup>

            <FieldGroup title="Каркас и крепёж">
              <SelectField
                label="Шаг стоек каркаса"
                options={SPACING_PRESETS}
                value={spacingPreset}
                onChange={handleSpacingPresetChange}
              />

              <NumberField
                hint="Направляющий профиль, подвесы и крепёж каркаса к основанию считаются отдельно"
                label="Расход саморезов"
                unit="шт./м²"
                value={screwRate}
                onChange={setScrewRate}
              />
            </FieldGroup>

            <FieldGroup title="Запас">
              <NumberField
                formatOptions={PERCENT_FORMAT}
                label="Запас"
                value={wastePercent}
                onChange={setWastePercent}
              />
            </FieldGroup>
          </>
        )}
        result={(
          <ResultCard
            ctaHref="/price#drywall"
            ctaLabel="Стоимость монтажа гипсокартона в прайс-листе"
            heading="Нужно листов гипсокартона"
            invalid={!result}
            invalidMessage="Укажите площадь обшивки и параметры листа"
            metrics={metrics}
            note="Длина стоечного профиля — ориентировочная, направляющий профиль и подвесы считайте отдельно по чертежу каркаса."
            value={result ? `${result.sheets} шт.` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <Typography.Paragraph>
          Количество листов — это площадь обшивки, умноженная на число слоёв и увеличенная на
          процент запаса, делённая на площадь одного листа. Длина стоечного профиля — это площадь
          обшивки, делённая на шаг стоек, с учётом числа слоёв; саморезы считаются по норме расхода
          на квадратный метр обшивки, умноженной на число слоёв — при двух слоях реальный расход
          может быть чуть выше из-за дополнительных саморезов между слоями, стоит закладывать запас.
        </Typography.Paragraph>

        <Typography.Paragraph>
          Расчёт профиля не учитывает направляющие профили по периметру, подвесы, перемычки и
          крепёж каркаса к стенам, полу и потолку — их количество зависит от конкретной схемы
          каркаса и считается отдельно. Итог калькулятора — объём закупки листов, профиля и
          саморезов, а не расход времени или денег на монтаж.
        </Typography.Paragraph>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['insulation', 'putty-consumption', 'paint-consumption']} />

      <Disclaimer>
        Расчёт — количество материала по введённым данным, а не смета работ. Точный расход профиля
        и крепежа зависит от схемы каркаса — уточняйте у прораба при большом объёме закупки.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default DrywallCalculator;
