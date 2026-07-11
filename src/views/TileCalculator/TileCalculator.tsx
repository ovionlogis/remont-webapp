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

const TILE_PRESETS = [
  {
    value: '300x300', label: '300 × 300 мм', length: 300, width: 300
  },
  {
    value: '300x600', label: '300 × 600 мм', length: 300, width: 600
  },
  {
    value: '600x600', label: '600 × 600 мм', length: 600, width: 600
  },
  {
    value: '600x1200', label: '600 × 1200 мм', length: 600, width: 1200
  },
  { value: 'custom', label: 'Свой размер' }
];

const LAYOUT_OPTIONS = [
  { value: 'straight', label: 'Прямая', waste: 7 },
  { value: 'offset', label: 'Со смещением', waste: 10 },
  { value: 'diagonal', label: 'Диагональная', waste: 15 }
];

const TileCalculator = () => {
  const [areaMode, setAreaMode] = useState('dimensions');
  const [lengthM, setLengthM] = useState('4');
  const [widthM, setWidthM] = useState('3');
  const [areaM2, setAreaM2] = useState('12');
  const [deductionM2, setDeductionM2] = useState('0');
  const [tilePreset, setTilePreset] = useState('300x600');
  const [tileLengthMm, setTileLengthMm] = useState('300');
  const [tileWidthMm, setTileWidthMm] = useState('600');
  const [layout, setLayout] = useState('straight');
  const [wastePercent, setWastePercent] = useState('7');
  const [tilesPerBox, setTilesPerBox] = useState('');

  const handlePresetChange = useCallback((value: string) => {
    setTilePreset(value);

    const preset = TILE_PRESETS.find((item) => item.value === value);

    if (preset && preset.value !== 'custom') {
      setTileLengthMm(String(preset.length));
      setTileWidthMm(String(preset.width));
    }
  }, []);

  const handleLayoutChange = useCallback((value: string) => {
    setLayout(value);

    const option = LAYOUT_OPTIONS.find((item) => item.value === value);

    if (option) {
      setWastePercent(String(option.waste));
    }
  }, []);

  const result = useMemo(() => {
    const length = parseNumber(lengthM);
    const width = parseNumber(widthM);
    const areaDirect = parseNumber(areaM2);
    const deduction = parseNumber(deductionM2) ?? 0;
    const tileLength = parseNumber(tileLengthMm);
    const tileWidth = parseNumber(tileWidthMm);
    const waste = parseNumber(wastePercent);
    const tilesPerBoxNum = parseNumber(tilesPerBox);

    let netAreaM2: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        netAreaM2 = areaDirect - deduction;
      }
    } else if (length !== null && width !== null && isInRange(length, 0.1, 50) && isInRange(width, 0.1, 50)) {
      netAreaM2 = length * width - deduction;
    }

    const isValid = netAreaM2 !== null
      && netAreaM2 > 0
      && tileLength !== null && isInRange(tileLength, 10, 2000)
      && tileWidth !== null && isInRange(tileWidth, 10, 2000)
      && waste !== null && isInRange(waste, 0, 30);

    if (!isValid || netAreaM2 === null || tileLength === null || tileWidth === null || waste === null) {
      return null;
    }

    const tileAreaM2 = (tileLength * tileWidth) / 1_000_000;
    const tilesRaw = netAreaM2 / tileAreaM2;
    const tilesWithWaste = Math.ceil(tilesRaw * (1 + waste / 100));
    const purchaseAreaM2 = tilesWithWaste * tileAreaM2;
    const boxes = tilesPerBoxNum !== null && tilesPerBoxNum > 0
      ? Math.ceil(tilesWithWaste / tilesPerBoxNum)
      : null;

    return {
      netAreaM2, tilesWithWaste, purchaseAreaM2, boxes, waste
    };
  }, [areaMode, lengthM, widthM, areaM2, deductionM2, tileLengthMm, tileWidthMm, wastePercent, tilesPerBox]);

  const metrics = result ? [
    { label: 'Площадь помещения', value: `${formatNumber(result.netAreaM2)} м²` },
    { label: 'Площадь с запасом', value: `${formatNumber(result.purchaseAreaM2)} м²` },
    { label: 'Запас на подрезку', value: `${result.waste}%` },
    ...(result.boxes !== null ? [{ label: 'Упаковок', value: `${result.boxes} шт.` }] : [])
  ] : [];

  return (
    <CalculatorPage
      intro="Калькулятор считает количество плитки в штуках и, при необходимости, в упаковках — по размерам помещения, формату плитки и способу укладки. Это ориентир для закупки материала, а не смета или стоимость облицовочных работ."
      title="Калькулятор плитки: сколько плитки нужно на комнату"
    >
      <CalculatorGrid
        fields={(
          <>
            <SegmentedControl
              label="Как ввести площадь"
              options={[
                { value: 'dimensions', label: 'Длина × ширина' },
                { value: 'area', label: 'Площадь напрямую' }
              ]}
              value={areaMode}
              onChange={setAreaMode}
            />

            {areaMode === 'dimensions' ? (
              <>
                <NumberField
                  label="Длина помещения"
                  unit="м"
                  value={lengthM}
                  onChange={setLengthM}
                />
                <NumberField
                  label="Ширина помещения"
                  unit="м"
                  value={widthM}
                  onChange={setWidthM}
                />
              </>
            ) : (
              <NumberField
                label="Площадь помещения"
                unit="м²"
                value={areaM2}
                onChange={setAreaM2}
              />
            )}

            <NumberField
              hint="Двери, ниши, зоны без плитки — если хотите вычесть из расчёта"
              label="Площадь проёмов без плитки"
              unit="м²"
              value={deductionM2}
              onChange={setDeductionM2}
            />

            <SelectField
              label="Формат плитки"
              options={TILE_PRESETS.map((preset) => ({ value: preset.value, label: preset.label }))}
              value={tilePreset}
              onChange={handlePresetChange}
            />

            <NumberField
              label="Длина плитки"
              unit="мм"
              value={tileLengthMm}
              onChange={setTileLengthMm}
            />
            <NumberField
              label="Ширина плитки"
              unit="мм"
              value={tileWidthMm}
              onChange={setTileWidthMm}
            />

            <SegmentedControl
              label="Способ укладки"
              options={LAYOUT_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
              value={layout}
              onChange={handleLayoutChange}
            />

            <NumberField
              hint="Подобран под способ укладки, можно изменить вручную"
              label="Запас на подрезку"
              unit="%"
              value={wastePercent}
              onChange={setWastePercent}
            />

            <NumberField
              hint="Если известно — посчитаем количество упаковок"
              label="Плиток в упаковке"
              unit="шт."
              value={tilesPerBox}
              onChange={setTilesPerBox}
            />
          </>
        )}
        result={(
          <ResultCard
            heading="Нужно плитки"
            invalid={!result}
            invalidMessage="Укажите размеры помещения и плитки, чтобы увидеть расчёт"
            metrics={metrics}
            note="Плитка продаётся упаковками фиксированного размера — округление до целой плитки и упаковки уже учтено."
            value={result ? `${result.tilesWithWaste} шт.` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <p>
          Расчёт делится на два шага: сначала площадь плитки в штуке (длина × ширина в миллиметрах,
          переведённая в м²), затем площадь помещения делится на площадь одной плитки. К результату
          добавляется запас на подрезку — он зависит от способа укладки, потому что диагональная
          укладка и укладка со смещением требуют больше резов по краям и углам.
        </p>

        <p>
          Что не учитывается автоматически: бой плитки при транспортировке и укладке, а также
          дополнительная подрезка в сложных местах — например, вокруг труб в санузле. Такие случаи
          стоит закладывать увеличением запаса вручную. Результат — ориентир для закупки материала,
          а не бюджет ремонта: стоимость самих работ по укладке смотрите в прайс-листе.
        </p>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['floor-screed', 'laminate', 'wallpaper']} />

      <Disclaimer>
        Расчёт — количество плитки по введённым размерам, а не смета работ. Точный объём закупки
        уточняйте у продавца с учётом остатков на складе и раскроя конкретной партии.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default TileCalculator;
