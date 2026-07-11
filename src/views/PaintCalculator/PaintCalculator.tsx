'use client';

import { useCallback, useMemo, useState } from 'react';

import CalculatorGrid from '@/components/CalculatorGrid';
import CalculatorPage from '@/components/CalculatorPage';
import CalculatorSection from '@/components/CalculatorSection';
import Disclaimer from '@/components/Disclaimer';
import Faq from '@/components/Faq';
import NumberField from '@/components/NumberField';
import RelatedCalculators from '@/components/RelatedCalculators';
import ResultCard from '@/components/ResultCard';
import SegmentedControl from '@/components/SegmentedControl';
import SelectField from '@/components/SelectField';
import { formatNumber, isInRange, parseNumber } from '@/utils/calculator';

import { faqItems } from './faqItems';

const PAINT_TYPES = [
  { value: 'wall', label: 'Водоэмульсионная, стены (тип. 0.12 л/м²/слой)', rate: 0.12 },
  { value: 'ceiling', label: 'Водоэмульсионная, потолок (тип. 0.13 л/м²/слой)', rate: 0.13 },
  { value: 'enamel', label: 'Эмаль по дереву/металлу (тип. 0.15 л/м²/слой)', rate: 0.15 },
  { value: 'facade', label: 'Фасадная (тип. 0.18 л/м²/слой)', rate: 0.18 }
];

const CAN_VOLUME_PRESETS = [
  { value: '0.9', label: '0.9 л' },
  { value: '2.5', label: '2.5 л' },
  { value: '5', label: '5 л' },
  { value: '10', label: '10 л' }
];

const PaintCalculator = () => {
  const [areaMode, setAreaMode] = useState('area');
  const [areaM2, setAreaM2] = useState('30');
  const [perimeterM, setPerimeterM] = useState('14');
  const [heightM, setHeightM] = useState('2.7');
  const [openingsM2, setOpeningsM2] = useState('0');
  const [paintType, setPaintType] = useState('wall');
  const [rateOverride, setRateOverride] = useState('');
  const [layers, setLayers] = useState('2');
  const [wastePercent, setWastePercent] = useState('10');
  const [canVolumePreset, setCanVolumePreset] = useState('2.5');
  const [canVolumeL, setCanVolumeL] = useState('2.5');

  const handleCanPresetChange = useCallback((value: string) => {
    setCanVolumePreset(value);
    setCanVolumeL(value);
  }, []);

  const result = useMemo(() => {
    const areaDirect = parseNumber(areaM2);
    const perimeter = parseNumber(perimeterM);
    const height = parseNumber(heightM);
    const openings = parseNumber(openingsM2) ?? 0;
    const layersNum = parseNumber(layers);
    const waste = parseNumber(wastePercent);
    const canVolume = parseNumber(canVolumeL);
    const override = parseNumber(rateOverride);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        area = areaDirect;
      }
    } else if (perimeter !== null && height !== null && isInRange(perimeter, 0.1, 100) && isInRange(height, 2, 4.5)) {
      area = perimeter * height - openings;
    }

    const typeOption = PAINT_TYPES.find((item) => item.value === paintType);
    const rate = override !== null && override > 0 ? override : typeOption?.rate ?? null;

    const isValid = area !== null && area > 0
      && layersNum !== null && isInRange(layersNum, 1, 4)
      && waste !== null && isInRange(waste, 0, 20)
      && rate !== null && isInRange(rate, 0.05, 0.5);

    if (!isValid || area === null || layersNum === null || waste === null || rate === null) {
      return null;
    }

    const perLayerL = area * rate;
    const totalL = perLayerL * layersNum * (1 + waste / 100);
    const cans = canVolume !== null && canVolume > 0 ? Math.ceil(totalL / canVolume) : null;

    return {
      area, totalL, cans, rate, isOverride: override !== null && override > 0
    };
  }, [areaMode, areaM2, perimeterM, heightM, openingsM2, paintType, rateOverride, layers, wastePercent, canVolumeL]);

  const metrics = result ? [
    { label: 'Площадь окрашивания', value: `${formatNumber(result.area)} м²` },
    { label: 'Применённая норма', value: `${formatNumber(result.rate, 3)} л/м²/слой${result.isOverride ? ' (ваша)' : ' (типовая)'}` },
    ...(result.cans !== null ? [{ label: 'Банок', value: `${result.cans} шт.` }] : [])
  ] : [];

  return (
    <CalculatorPage
      intro="Калькулятор считает расход краски в литрах и банках по площади окрашивания, типу поверхности и количеству слоёв. Это ориентир для закупки материала, а не стоимость малярных работ."
      title="Калькулятор расхода краски"
    >
      <CalculatorGrid
        fields={(
          <>
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
                label="Площадь окрашивания"
                unit="м²"
                value={areaM2}
                onChange={setAreaM2}
              />
            ) : (
              <>
                <NumberField
                  label="Периметр помещения"
                  unit="м"
                  value={perimeterM}
                  onChange={setPerimeterM}
                />
                <NumberField
                  label="Высота стен"
                  unit="м"
                  value={heightM}
                  onChange={setHeightM}
                />
                <NumberField
                  hint="Двери, окна и другие зоны без покраски"
                  label="Площадь проёмов"
                  unit="м²"
                  value={openingsM2}
                  onChange={setOpeningsM2}
                />
              </>
            )}

            <SelectField
              label="Тип краски / поверхности"
              options={PAINT_TYPES.map((type) => ({ value: type.value, label: type.label }))}
              value={paintType}
              onChange={setPaintType}
            />

            <NumberField
              hint="Заполните расход с банки конкретной краски — он приоритетнее типового значения"
              label="Расход по банке (переопределение)"
              unit="л/м²/слой"
              value={rateOverride}
              onChange={setRateOverride}
            />

            <NumberField
              label="Количество слоёв"
              unit="шт."
              value={layers}
              onChange={setLayers}
            />
            <NumberField
              label="Запас"
              unit="%"
              value={wastePercent}
              onChange={setWastePercent}
            />

            <SelectField
              label="Объём тары"
              options={CAN_VOLUME_PRESETS}
              value={canVolumePreset}
              onChange={handleCanPresetChange}
            />

            <NumberField
              label="Объём тары"
              unit="л"
              value={canVolumeL}
              onChange={setCanVolumeL}
            />
          </>
        )}
        result={(
          <ResultCard
            heading="Нужно краски"
            invalid={!result}
            invalidMessage="Укажите площадь окрашивания, норму расхода и количество слоёв"
            metrics={metrics}
            note="Норма расхода зависит от краски и основания — типовое значение можно переопределить данными с банки."
            value={result ? `${formatNumber(result.totalL)} л` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <p>
          Расход за один слой — площадь окрашивания, умноженная на норму расхода конкретного типа
          краски. Итог умножается на количество слоёв и увеличивается на процент запаса. Второй слой
          не удваивает расход линейно: краска частично впитывается в уже прокрашенную поверхность,
          но для закупки безопаснее считать по полной норме на каждый слой.
        </p>

        <p>
          Расход краски всегда указан производителем для конкретного основания и меняется в
          зависимости от его пористости и шероховатости — это ориентировочная величина, а не точная
          физическая константа. Итог расчёта — объём закупки материала, а не бюджет малярных работ.
        </p>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['putty-consumption', 'wallpaper', 'tile']} />

      <Disclaimer>
        Расчёт — количество краски по введённым данным, а не смета работ. Точный расход зависит от
        типа и пористости основания — уточняйте по этикетке купленной краски.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default PaintCalculator;
