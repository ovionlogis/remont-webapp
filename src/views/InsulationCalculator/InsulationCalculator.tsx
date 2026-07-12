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

const INSULATION_TYPES = [
  { value: 'mineral-slab', label: 'Минеральная вата в плитах' },
  { value: 'mineral-roll', label: 'Минеральная вата в рулонах' },
  { value: 'xps', label: 'Пеноплекс / экструдированный пенополистирол' },
  { value: 'sprayed-pu', label: 'Напыляемый пенополиуретан' }
];

const PACK_VOLUME_PRESETS = [
  { value: '0.2', label: '0,2 м³' },
  { value: '0.3', label: '0,3 м³' },
  { value: '0.5', label: '0,5 м³' }
];

const InsulationCalculator = () => {
  const [areaMode, setAreaMode] = useState('area');
  const [areaM2, setAreaM2] = useState('30');
  const [perimeterM, setPerimeterM] = useState('14');
  const [heightM, setHeightM] = useState('2.7');
  const [openingsM2, setOpeningsM2] = useState('0');
  const [insulationType, setInsulationType] = useState('mineral-slab');
  const [thicknessMm, setThicknessMm] = useState('100');
  const [wastePercent, setWastePercent] = useState('10');
  const [packVolumePreset, setPackVolumePreset] = useState('0.3');
  const [packVolumeM3, setPackVolumeM3] = useState('0.3');

  const handlePackPresetChange = useCallback((value: string) => {
    setPackVolumePreset(value);
    setPackVolumeM3(value);
  }, []);

  const result = useMemo(() => {
    const areaDirect = parseNumber(areaM2);
    const perimeter = parseNumber(perimeterM);
    const height = parseNumber(heightM);
    const openings = parseNumber(openingsM2) ?? 0;
    const thickness = parseNumber(thicknessMm);
    const waste = parseNumber(wastePercent);
    const packVolume = parseNumber(packVolumeM3);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 1000)) {
        area = areaDirect;
      }
    } else if (perimeter !== null && height !== null && isInRange(perimeter, 0.1, 100) && isInRange(height, 2, 4.5)) {
      area = perimeter * height - openings;
    }

    const isValid = area !== null && area > 0
      && thickness !== null && isInRange(thickness, 20, 300)
      && waste !== null && isInRange(waste, 0, 25);

    if (!isValid || area === null || thickness === null || waste === null) {
      return null;
    }

    const volumeM3 = area * (thickness / 1000) * (1 + waste / 100);
    const packs = packVolume !== null && packVolume > 0 ? Math.ceil(volumeM3 / packVolume) : null;

    return { area, volumeM3, packs };
  }, [areaMode, areaM2, perimeterM, heightM, openingsM2, thicknessMm, wastePercent, packVolumeM3]);

  const metrics = result ? [
    { label: 'Площадь поверхности', value: `${formatNumber(result.area)} м²` },
    { label: 'Толщина слоя', value: `${thicknessMm} мм` },
    ...(result.packs !== null ? [{ label: 'Упаковок', value: `${result.packs} шт.` }] : []),
    { label: 'Тип утеплителя', value: INSULATION_TYPES.find((type) => type.value === insulationType)?.label ?? '' }
  ] : [];

  return (
    <CalculatorPage
      intro="Калькулятор считает объём утеплителя в кубометрах и количество упаковок по площади поверхности и толщине слоя. Это ориентир для закупки материала, а не теплотехнический расчёт."
      title="Калькулятор утеплителя"
    >
      <CalculatorGrid
        fields={(
          <>
            <FieldGroup title="Утепляемая поверхность">
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
                  label="Площадь утепления"
                  unit="м²"
                  value={areaM2}
                  onChange={setAreaM2}
                />
              ) : (
                <>
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Периметр"
                    value={perimeterM}
                    onChange={setPerimeterM}
                  />
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Высота"
                    value={heightM}
                    onChange={setHeightM}
                  />
                  <NumberField
                    hint="Двери, окна и другие зоны без утепления"
                    label="Площадь проёмов"
                    unit="м²"
                    value={openingsM2}
                    onChange={setOpeningsM2}
                  />
                </>
              )}
            </FieldGroup>

            <FieldGroup title="Утеплитель">
              <SelectField
                label="Тип утеплителя"
                options={INSULATION_TYPES}
                value={insulationType}
                onChange={setInsulationType}
              />

              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                label="Толщина слоя"
                value={thicknessMm}
                onChange={setThicknessMm}
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

            <FieldGroup title="Упаковка">
              <SelectField
                label="Объём упаковки"
                options={PACK_VOLUME_PRESETS}
                value={packVolumePreset}
                onChange={handlePackPresetChange}
              />

              <NumberField
                hint="Указан на этикетке упаковки — можно ввести своё значение"
                label="Объём упаковки"
                unit="м³"
                value={packVolumeM3}
                onChange={setPackVolumeM3}
              />
            </FieldGroup>
          </>
        )}
        result={(
          <ResultCard
            heading="Нужно утеплителя"
            invalid={!result}
            invalidMessage="Укажите площадь поверхности и толщину слоя"
            metrics={metrics}
            note="Толщину утеплителя калькулятор не подбирает — она определяется отдельным теплотехническим расчётом для вашего региона и конструкции."
            value={result ? `${formatNumber(result.volumeM3, 3)} м³` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <Typography.Paragraph>
          Объём утеплителя — это площадь поверхности, умноженная на толщину слоя в метрах, с
          добавлением процента запаса на подрезку у каркаса, нахлёст рулонов и потери при монтаже.
          Формула одинакова для всех типов утеплителя — разница только в удобстве раскроя и
          величине нахлёста.
        </Typography.Paragraph>

        <Typography.Paragraph>
          Нужная толщина утеплителя зависит от климатической зоны, конструкции стены или кровли и
          требуемого сопротивления теплопередаче — это отдельный теплотехнический расчёт, который
          калькулятор не выполняет. Итог — объём закупки утеплителя по уже выбранной толщине, без
          учёта пароизоляции, ветрозащиты и крепежа.
        </Typography.Paragraph>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['drywall', 'floor-screed', 'masonry']} />

      <Disclaimer>
        Расчёт — объём утеплителя по введённым данным, а не теплотехнический проект. Толщину слоя
        и тип материала для вашего объекта уточняйте у проектировщика или прораба.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default InsulationCalculator;
