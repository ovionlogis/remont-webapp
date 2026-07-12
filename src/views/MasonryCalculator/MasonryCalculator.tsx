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

const MATERIAL_PRESETS = [
  {
    value: 'brick-single', label: 'Кирпич одинарный (250×120×65 мм)', unitLabel: 'кирпичей', lengthMm: 250, widthMm: 120, heightMm: 65, seamMm: 10
  },
  {
    value: 'brick-oneandhalf', label: 'Кирпич полуторный (250×120×88 мм)', unitLabel: 'кирпичей', lengthMm: 250, widthMm: 120, heightMm: 88, seamMm: 10
  },
  {
    value: 'brick-double', label: 'Керамический камень (250×120×138 мм)', unitLabel: 'камней', lengthMm: 250, widthMm: 120, heightMm: 138, seamMm: 10
  },
  {
    value: 'gas-block', label: 'Газобетонный блок (600×200×300 мм)', unitLabel: 'блоков', lengthMm: 600, widthMm: 200, heightMm: 300, seamMm: 2
  },
  {
    value: 'foam-block', label: 'Пеноблок (600×200×300 мм)', unitLabel: 'блоков', lengthMm: 600, widthMm: 200, heightMm: 300, seamMm: 5
  },
  {
    value: 'expanded-clay-block', label: 'Керамзитобетонный блок (390×190×188 мм)', unitLabel: 'блоков', lengthMm: 390, widthMm: 190, heightMm: 188, seamMm: 10
  },
  {
    value: 'custom', label: 'Свои размеры', unitLabel: 'штук', lengthMm: 250, widthMm: 120, heightMm: 65, seamMm: 10
  }
];

const MasonryCalculator = () => {
  const [areaMode, setAreaMode] = useState('walls');
  const [areaM2, setAreaM2] = useState('20');
  const [lengthM, setLengthM] = useState('8');
  const [heightM, setHeightM] = useState('2.5');
  const [openingsM2, setOpeningsM2] = useState('0');
  const [thicknessMm, setThicknessMm] = useState('250');
  const [materialPreset, setMaterialPreset] = useState('brick-single');
  const [unitLengthMm, setUnitLengthMm] = useState('250');
  const [unitWidthMm, setUnitWidthMm] = useState('120');
  const [unitHeightMm, setUnitHeightMm] = useState('65');
  const [seamMm, setSeamMm] = useState('10');
  const [wastePercent, setWastePercent] = useState('5');

  const handleMaterialChange = useCallback((value: string) => {
    setMaterialPreset(value);

    const preset = MATERIAL_PRESETS.find((item) => item.value === value);

    if (preset) {
      setUnitLengthMm(String(preset.lengthMm));
      setUnitWidthMm(String(preset.widthMm));
      setUnitHeightMm(String(preset.heightMm));
      setSeamMm(String(preset.seamMm));
    }
  }, []);

  const result = useMemo(() => {
    const areaDirect = parseNumber(areaM2);
    const length = parseNumber(lengthM);
    const height = parseNumber(heightM);
    const openings = parseNumber(openingsM2) ?? 0;
    const thickness = parseNumber(thicknessMm);
    const unitLength = parseNumber(unitLengthMm);
    const unitWidth = parseNumber(unitWidthMm);
    const unitHeight = parseNumber(unitHeightMm);
    const seam = parseNumber(seamMm);
    const waste = parseNumber(wastePercent);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        area = areaDirect;
      }
    } else if (length !== null && height !== null && isInRange(length, 0.1, 100) && isInRange(height, 0.5, 6)) {
      area = length * height - openings;
    }

    const isValid = area !== null && area > 0
      && thickness !== null && isInRange(thickness, 60, 640)
      && unitLength !== null && isInRange(unitLength, 50, 700)
      && unitWidth !== null && isInRange(unitWidth, 50, 400)
      && unitHeight !== null && isInRange(unitHeight, 40, 400)
      && seam !== null && isInRange(seam, 0, 20)
      && waste !== null && isInRange(waste, 0, 20);

    if (
      !isValid || area === null || thickness === null || unitLength === null
      || unitWidth === null || unitHeight === null || seam === null || waste === null
    ) {
      return null;
    }

    const rawVolumeM3 = area * (thickness / 1000);
    const unitNetVolumeM3 = (unitLength / 1000) * (unitWidth / 1000) * (unitHeight / 1000);
    // Шов есть только между кирпичами в ряду (длина) и между рядами (высота) — по ширине
    // (глубине стены) кирпичи в один слой кладки идут встык, без шва.
    const unitGrossVolumeM3 = ((unitLength + seam) / 1000) * (unitWidth / 1000) * ((unitHeight + seam) / 1000);
    const piecesBase = rawVolumeM3 / unitGrossVolumeM3;
    const pieces = Math.ceil(piecesBase * (1 + waste / 100));
    const mortarVolumeM3 = Math.max(rawVolumeM3 - piecesBase * unitNetVolumeM3, 0) * (1 + waste / 100);
    const thicknessWarning = thickness < unitWidth;

    return {
      area, rawVolumeM3, pieces, mortarVolumeM3, thicknessWarning
    };
  }, [
    areaMode, areaM2, lengthM, heightM, openingsM2, thicknessMm,
    unitLengthMm, unitWidthMm, unitHeightMm, seamMm, wastePercent
  ]);

  const unitLabel = MATERIAL_PRESETS.find((preset) => preset.value === materialPreset)?.unitLabel ?? 'штук';

  const metrics = result ? [
    { label: 'Площадь кладки', value: `${formatNumber(result.area)} м²` },
    { label: 'Объём кладки', value: `${formatNumber(result.rawVolumeM3, 3)} м³` },
    { label: 'Раствор / клей', value: `${formatNumber(result.mortarVolumeM3, 3)} м³` },
    { label: 'Толщина кладки', value: `${thicknessMm} мм` }
  ] : [];

  return (
    <CalculatorPage
      intro="Калькулятор считает количество кирпича или блоков и объём раствора по площади стены и толщине кладки. Это ориентир для закупки материала, а не проектный расчёт несущей стены."
      title="Калькулятор кирпича и блоков"
    >
      <CalculatorGrid
        fields={(
          <>
            <FieldGroup title="Площадь кладки">
              <SegmentedControl
                label="Как ввести площадь"
                options={[
                  { value: 'walls', label: 'Длина × высота' },
                  { value: 'area', label: 'Площадь напрямую' }
                ]}
                value={areaMode}
                onChange={setAreaMode}
              />

              {areaMode === 'area' ? (
                <NumberField
                  label="Площадь кладки"
                  unit="м²"
                  value={areaM2}
                  onChange={setAreaM2}
                />
              ) : (
                <>
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Длина стены"
                    value={lengthM}
                    onChange={setLengthM}
                  />
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Высота стены"
                    value={heightM}
                    onChange={setHeightM}
                  />
                  <NumberField
                    hint="Двери, окна и другие проёмы без кладки"
                    label="Площадь проёмов"
                    unit="м²"
                    value={openingsM2}
                    onChange={setOpeningsM2}
                  />
                </>
              )}

              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                hint="Для кирпича типовые значения: 120, 250, 380, 510 мм; для блоков — ширина блока"
                label="Толщина кладки"
                value={thicknessMm}
                onChange={setThicknessMm}
              />
            </FieldGroup>

            <FieldGroup title="Материал">
              <SelectField
                label="Кирпич или блок"
                options={MATERIAL_PRESETS.map((preset) => ({ value: preset.value, label: preset.label }))}
                value={materialPreset}
                onChange={handleMaterialChange}
              />

              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                label="Длина"
                value={unitLengthMm}
                onChange={setUnitLengthMm}
              />
              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                label="Ширина"
                value={unitWidthMm}
                onChange={setUnitWidthMm}
              />
              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                label="Высота"
                value={unitHeightMm}
                onChange={setUnitHeightMm}
              />
              <NumberField
                formatOptions={MILLIMETER_FORMAT}
                hint="Толщина шва раствора или клея между кирпичами/блоками"
                label="Толщина шва"
                value={seamMm}
                onChange={setSeamMm}
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
            ctaHref="/price#masonry"
            ctaLabel="Стоимость кладки в прайс-листе"
            heading={`Нужно ${unitLabel}`}
            invalid={!result}
            invalidMessage="Укажите площадь кладки, толщину стены и размеры кирпича или блока"
            metrics={metrics}
            note={result?.thicknessWarning
              ? 'Толщина кладки меньше ширины блока — проверьте, не перепутаны ли толщина стены и размер кирпича или блока.'
              : 'Раствор посчитан как разница между объёмом кладки и объёмом самих кирпичей или блоков без шва.'}
            value={result ? `${result.pieces} шт.` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <Typography.Paragraph>
          Сначала считается объём кладки — площадь стены, умноженная на толщину кладки. Затем он
          делится на объём одного кирпича или блока вместе со швом со всех сторон — это даёт
          количество штук на объём. Раствор или клей — это разница между объёмом кладки и суммарным
          объёмом самих кирпичей или блоков без шва.
        </Typography.Paragraph>

        <Typography.Paragraph>
          Толщина шва сильно влияет на расход раствора: у кирпичной кладки на цементном растворе шов
          обычно около 10 мм, у газобетона на тонкослойном клею — 2–3 мм. Расчёт не учитывает
          перевязку рядов, армирующую сетку и проёмы сложной формы — для несущих стен и точной
          раскладки уточняйте у прораба или проектировщика.
        </Typography.Paragraph>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['concrete', 'floor-screed', 'plaster-consumption']} />

      <Disclaimer>
        Расчёт — количество материала по введённым данным, а не проектный расчёт несущей стены.
        Толщину кладки и марку кирпича или блока для несущих конструкций уточняйте у
        проектировщика.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default MasonryCalculator;
