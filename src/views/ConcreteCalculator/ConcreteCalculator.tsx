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
import { METER_FORMAT, MILLIMETER_FORMAT, PERCENT_FORMAT } from '@/utils/numberFieldFormats';

import { faqItems } from './faqItems';

const CONCRETE_DENSITY_KG_M3 = 2400;

const TRUCK_VOLUME_PRESETS = [
  { value: '4', label: '4 м³' },
  { value: '6', label: '6 м³' },
  { value: '7', label: '7 м³' }
];

const SHAPE_LABELS: Record<string, string> = {
  slab: 'Плита / перекрытие',
  strip: 'Лента фундамента',
  columns: 'Столбы / сваи'
};

const ConcreteCalculator = () => {
  const [shapeMode, setShapeMode] = useState('slab');

  const [slabLengthM, setSlabLengthM] = useState('6');
  const [slabWidthM, setSlabWidthM] = useState('6');
  const [slabThicknessMm, setSlabThicknessMm] = useState('150');

  const [stripPerimeterM, setStripPerimeterM] = useState('30');
  const [stripWidthMm, setStripWidthMm] = useState('400');
  const [stripHeightMm, setStripHeightMm] = useState('600');

  const [columnsCount, setColumnsCount] = useState('10');
  const [columnDiameterMm, setColumnDiameterMm] = useState('300');
  const [columnHeightM, setColumnHeightM] = useState('2');

  const [wastePercent, setWastePercent] = useState('5');
  const [truckVolumePreset, setTruckVolumePreset] = useState('6');
  const [truckVolumeM3, setTruckVolumeM3] = useState('6');

  const handleTruckPresetChange = useCallback((value: string) => {
    setTruckVolumePreset(value);
    setTruckVolumeM3(value);
  }, []);

  const result = useMemo(() => {
    const waste = parseNumber(wastePercent);
    const truckVolume = parseNumber(truckVolumeM3);

    let rawVolumeM3: number | null = null;

    if (shapeMode === 'slab') {
      const length = parseNumber(slabLengthM);
      const width = parseNumber(slabWidthM);
      const thickness = parseNumber(slabThicknessMm);

      if (
        length !== null && isInRange(length, 0.1, 50)
        && width !== null && isInRange(width, 0.1, 50)
        && thickness !== null && isInRange(thickness, 50, 500)
      ) {
        rawVolumeM3 = length * width * (thickness / 1000);
      }
    } else if (shapeMode === 'strip') {
      const perimeter = parseNumber(stripPerimeterM);
      const width = parseNumber(stripWidthMm);
      const height = parseNumber(stripHeightMm);

      if (
        perimeter !== null && isInRange(perimeter, 0.1, 300)
        && width !== null && isInRange(width, 200, 800)
        && height !== null && isInRange(height, 200, 2000)
      ) {
        rawVolumeM3 = perimeter * (width / 1000) * (height / 1000);
      }
    } else {
      const count = parseNumber(columnsCount);
      const diameter = parseNumber(columnDiameterMm);
      const height = parseNumber(columnHeightM);

      if (
        count !== null && isInRange(count, 1, 500)
        && diameter !== null && isInRange(diameter, 100, 1500)
        && height !== null && isInRange(height, 0.1, 30)
      ) {
        rawVolumeM3 = count * Math.PI * (diameter / 1000 / 2) ** 2 * height;
      }
    }

    if (rawVolumeM3 === null || rawVolumeM3 <= 0 || waste === null || !isInRange(waste, 0, 20)) {
      return null;
    }

    const volumeM3 = rawVolumeM3 * (1 + waste / 100);
    const weightTons = (volumeM3 * CONCRETE_DENSITY_KG_M3) / 1000;
    const trucks = truckVolume !== null && truckVolume > 0 ? Math.ceil(volumeM3 / truckVolume) : null;

    return {
      volumeM3, weightTons, trucks
    };
  }, [
    shapeMode, slabLengthM, slabWidthM, slabThicknessMm,
    stripPerimeterM, stripWidthMm, stripHeightMm,
    columnsCount, columnDiameterMm, columnHeightM,
    wastePercent, truckVolumeM3
  ]);

  const metrics = result ? [
    { label: 'Конструкция', value: SHAPE_LABELS[shapeMode] },
    { label: 'Вес бетона', value: `≈ ${formatNumber(result.weightTons)} т` },
    ...(result.trucks !== null ? [{ label: 'Заездов миксера', value: `${result.trucks} шт.` }] : [])
  ] : [];

  return (
    <CalculatorPage
      intro="Калькулятор считает объём бетона в кубометрах для плиты, ленточного фундамента или столбов и свай. Это ориентир для заказа готового бетона от миксера, а не проектный расчёт конструкции."
      title="Калькулятор бетона"
    >
      <CalculatorGrid
        fields={(
          <>
            <FieldGroup title="Конструкция">
              <SegmentedControl
                label="Форма конструкции"
                options={[
                  { value: 'slab', label: 'Плита' },
                  { value: 'strip', label: 'Лента' },
                  { value: 'columns', label: 'Столбы' }
                ]}
                value={shapeMode}
                onChange={setShapeMode}
              />

              {shapeMode === 'slab' && (
                <>
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Длина плиты"
                    value={slabLengthM}
                    onChange={setSlabLengthM}
                  />
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Ширина плиты"
                    value={slabWidthM}
                    onChange={setSlabWidthM}
                  />
                  <NumberField
                    formatOptions={MILLIMETER_FORMAT}
                    label="Толщина плиты"
                    value={slabThicknessMm}
                    onChange={setSlabThicknessMm}
                  />
                </>
              )}

              {shapeMode === 'strip' && (
                <>
                  <NumberField
                    formatOptions={METER_FORMAT}
                    hint="Суммарная длина ленты фундамента по осям"
                    label="Периметр ленты"
                    value={stripPerimeterM}
                    onChange={setStripPerimeterM}
                  />
                  <NumberField
                    formatOptions={MILLIMETER_FORMAT}
                    label="Ширина ленты"
                    value={stripWidthMm}
                    onChange={setStripWidthMm}
                  />
                  <NumberField
                    formatOptions={MILLIMETER_FORMAT}
                    label="Высота ленты"
                    value={stripHeightMm}
                    onChange={setStripHeightMm}
                  />
                </>
              )}

              {shapeMode === 'columns' && (
                <>
                  <NumberField
                    label="Количество столбов или свай"
                    unit="шт."
                    value={columnsCount}
                    onChange={setColumnsCount}
                  />
                  <NumberField
                    formatOptions={MILLIMETER_FORMAT}
                    hint="Диаметр бурения или опалубки, а не арматурного каркаса"
                    label="Диаметр"
                    value={columnDiameterMm}
                    onChange={setColumnDiameterMm}
                  />
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Высота"
                    value={columnHeightM}
                    onChange={setColumnHeightM}
                  />
                </>
              )}
            </FieldGroup>

            <FieldGroup title="Запас">
              <NumberField
                formatOptions={PERCENT_FORMAT}
                hint="На неровности опалубки и усадку"
                label="Запас"
                value={wastePercent}
                onChange={setWastePercent}
              />
            </FieldGroup>

            <FieldGroup title="Доставка">
              <SelectField
                label="Объём миксера"
                options={TRUCK_VOLUME_PRESETS}
                value={truckVolumePreset}
                onChange={handleTruckPresetChange}
              />

              <NumberField
                hint="Можно указать фактический объём вашего миксера"
                label="Объём миксера"
                unit="м³"
                value={truckVolumeM3}
                onChange={setTruckVolumeM3}
              />
            </FieldGroup>
          </>
        )}
        result={(
          <ResultCard
            ctaHref="/price#concrete"
            ctaLabel="Стоимость бетонных работ в прайс-листе"
            heading="Нужно бетона"
            invalid={!result}
            invalidMessage="Укажите размеры конструкции для выбранной формы"
            metrics={metrics}
            note="Вес бетона рассчитан по средней плотности 2400 кг/м³ и носит ориентировочный характер — точная плотность зависит от марки бетона и заполнителя."
            value={result ? `${formatNumber(result.volumeM3, 3)} м³` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <Typography.Paragraph>
          Для плиты объём — это длина, ширина и толщина. Для ленточного фундамента — периметр ленты,
          умноженный на её ширину и высоту в сечении. Для столбов и свай — объём цилиндра по
          диаметру и высоте, умноженный на количество. К полученному объёму добавляется процент
          запаса на неровности опалубки и усадку.
        </Typography.Paragraph>

        <Typography.Paragraph>
          Калькулятор считает объём готового бетона для заказа у поставщика, а не пропорции цемента,
          песка и щебня для самостоятельного замеса — они сильно зависят от марки цемента и
          влажности заполнителей. Расчёт также не учитывает армирование и опалубку — их считают
          отдельно по проекту.
        </Typography.Paragraph>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['masonry', 'floor-screed', 'insulation']} />

      <Disclaimer>
        Расчёт — объём бетона по введённым данным, а не проектный расчёт конструкции. Марку бетона,
        армирование и опалубку для несущих конструкций уточняйте у проектировщика.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default ConcreteCalculator;
