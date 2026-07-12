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
import {
  KILOGRAM_FORMAT, METER_FORMAT, MILLIMETER_FORMAT, PERCENT_FORMAT
} from '@/utils/numberFieldFormats';

import { faqItems } from './faqItems';

const PLASTER_TYPES = [
  { value: 'gypsum-machine', label: 'Гипсовая машинного нанесения (тип. 0.85 кг/м²/мм)', rate: 0.85 },
  { value: 'gypsum-hand', label: 'Гипсовая ручного нанесения (тип. 0.9 кг/м²/мм)', rate: 0.9 },
  { value: 'lime-cement', label: 'Известково-цементная (тип. 1.5 кг/м²/мм)', rate: 1.5 },
  { value: 'cement-sand', label: 'Цементно-песчаная (тип. 1.7 кг/м²/мм)', rate: 1.7 }
];

const BAG_WEIGHT_PRESETS = [
  { value: '25', label: '25 кг' },
  { value: '30', label: '30 кг' }
];

const PlasterCalculator = () => {
  const [areaMode, setAreaMode] = useState('area');
  const [areaM2, setAreaM2] = useState('30');
  const [perimeterM, setPerimeterM] = useState('14');
  const [heightM, setHeightM] = useState('2.7');
  const [openingsM2, setOpeningsM2] = useState('0');
  const [plasterType, setPlasterType] = useState('gypsum-machine');
  const [rateOverride, setRateOverride] = useState('');
  const [thicknessMm, setThicknessMm] = useState('15');
  const [layers, setLayers] = useState('1');
  const [wastePercent, setWastePercent] = useState('10');
  const [bagWeightPreset, setBagWeightPreset] = useState('30');
  const [bagWeightKg, setBagWeightKg] = useState('30');

  const handleBagPresetChange = useCallback((value: string) => {
    setBagWeightPreset(value);
    setBagWeightKg(value);
  }, []);

  const result = useMemo(() => {
    const areaDirect = parseNumber(areaM2);
    const perimeter = parseNumber(perimeterM);
    const height = parseNumber(heightM);
    const openings = parseNumber(openingsM2) ?? 0;
    const thickness = parseNumber(thicknessMm);
    const layersNum = parseNumber(layers);
    const waste = parseNumber(wastePercent);
    const bagWeight = parseNumber(bagWeightKg);
    const override = parseNumber(rateOverride);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        area = areaDirect;
      }
    } else if (perimeter !== null && height !== null && isInRange(perimeter, 0.1, 100) && isInRange(height, 2, 4.5)) {
      area = perimeter * height - openings;
    }

    const typeOption = PLASTER_TYPES.find((item) => item.value === plasterType);
    const rate = override !== null && override > 0 ? override : typeOption?.rate ?? null;

    const isValid = area !== null && area > 0
      && thickness !== null && isInRange(thickness, 5, 50)
      && layersNum !== null && isInRange(layersNum, 1, 3)
      && waste !== null && isInRange(waste, 0, 25)
      && rate !== null && isInRange(rate, 0.3, 3);

    if (!isValid || area === null || thickness === null || layersNum === null || waste === null || rate === null) {
      return null;
    }

    const perLayerKg = area * thickness * rate;
    const totalKg = perLayerKg * layersNum * (1 + waste / 100);
    const bags = bagWeight !== null && bagWeight > 0 ? Math.ceil(totalKg / bagWeight) : null;

    return {
      area, totalKg, bags, rate, isOverride: override !== null && override > 0
    };
  }, [areaMode, areaM2, perimeterM, heightM, openingsM2, plasterType, rateOverride, thicknessMm, layers, wastePercent, bagWeightKg]);

  const metrics = result ? [
    { label: 'Площадь поверхности', value: `${formatNumber(result.area)} м²` },
    { label: 'Применённая норма', value: `${formatNumber(result.rate)} кг/м²/мм${result.isOverride ? ' (ваша)' : ' (типовая)'}` },
    ...(result.bags !== null ? [{ label: 'Мешков', value: `${result.bags} шт.` }] : []),
    { label: 'Тип штукатурки', value: PLASTER_TYPES.find((type) => type.value === plasterType)?.label.replace(/\s*\(.*\)$/, '') ?? '' },
    { label: 'Толщина слоя', value: `${thicknessMm} мм` },
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
      intro="Калькулятор считает расход штукатурки в килограммах и мешках по площади поверхности, толщине слоя и типу смеси. Это ориентир для закупки материала, а не стоимость штукатурных работ."
      title="Калькулятор расхода штукатурки"
    >
      <CalculatorGrid
        fields={(
          <>
            <FieldGroup title="Площадь поверхности">
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
                  label="Площадь поверхности"
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
                    hint="Двери, окна и другие зоны без штукатурки"
                    label="Площадь проёмов"
                    unit="м²"
                    value={openingsM2}
                    onChange={setOpeningsM2}
                  />
                </>
              )}
            </FieldGroup>

            <FieldGroup title="Штукатурка">
              <SelectField
                label="Тип штукатурки"
                options={PLASTER_TYPES.map((type) => ({ value: type.value, label: type.label }))}
                value={plasterType}
                onChange={setPlasterType}
              />

              <NumberField
                hint="Заполните расход с этикетки конкретной упаковки — он приоритетнее типового значения"
                label="Расход по этикетке (переопределение)"
                unit="кг/м²/мм"
                value={rateOverride}
                onChange={setRateOverride}
              />

              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                label="Средняя толщина слоя"
                value={thicknessMm}
                onChange={setThicknessMm}
              />
            </FieldGroup>

            <FieldGroup title="Слои и запас">
              <NumberField
                label="Количество слоёв"
                unit="шт."
                value={layers}
                onChange={setLayers}
              />
              <NumberField
                formatOptions={PERCENT_FORMAT}
                label="Запас"
                value={wastePercent}
                onChange={setWastePercent}
              />
            </FieldGroup>

            <FieldGroup title="Упаковка">
              <SelectField
                label="Вес мешка"
                options={BAG_WEIGHT_PRESETS}
                value={bagWeightPreset}
                onChange={handleBagPresetChange}
              />

              <NumberField
                formatOptions={KILOGRAM_FORMAT}
                label="Вес мешка"
                value={bagWeightKg}
                onChange={setBagWeightKg}
              />
            </FieldGroup>
          </>
        )}
        result={(
          <ResultCard
            ctaHref="/price#plastering"
            ctaLabel="Стоимость штукатурных работ в прайс-листе"
            heading="Нужно штукатурки"
            invalid={!result}
            invalidMessage="Укажите площадь, толщину слоя и норму расхода"
            metrics={metrics}
            note="Норма расхода зависит от производителя и неровности стен — типовое значение можно переопределить данными с упаковки."
            value={result ? `${formatNumber(result.totalKg)} кг` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <Typography.Paragraph>
          Расход за один слой — это площадь поверхности, умноженная на среднюю толщину слоя в
          миллиметрах и норму расхода на 1 мм. Итог умножается на количество слоёв и увеличивается
          на процент запаса. Среднюю толщину для сильно неровных стен лучше определить замером
          правилом в нескольких точках, а не на глаз.
        </Typography.Paragraph>

        <Typography.Paragraph>
          Норма расхода жёстко зависит от конкретного производителя и способа нанесения (машинное
          или ручное): калькулятор даёт типовые ориентиры по категории смеси, но точный расход
          всегда указан на упаковке купленного товара — используйте поле переопределения для
          точного результата. Итог — объём закупки материала, а не расход времени или денег на
          работу.
        </Typography.Paragraph>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['putty-consumption', 'drywall', 'paint-consumption']} />

      <Disclaimer>
        Расчёт — количество штукатурки по введённым данным, а не смета работ. Точный расход зависит
        от неровности основания и квалификации мастера — уточняйте у прораба при большом объёме
        закупки.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default PlasterCalculator;
