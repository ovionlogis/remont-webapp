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

const BOARD_PRESETS = [
  {
    value: '1260x190', label: '1260 × 190 мм', length: 1260, width: 190
  },
  {
    value: '1285x192', label: '1285 × 192 мм', length: 1285, width: 192
  },
  {
    value: '1380x193', label: '1380 × 193 мм', length: 1380, width: 193
  },
  { value: 'custom', label: 'Свой размер' }
];

const LAYOUT_OPTIONS = [
  { value: 'straight', label: 'Прямая', waste: 7 },
  { value: 'diagonal', label: 'По диагонали', waste: 15 }
];

const LaminateCalculator = () => {
  const [areaMode, setAreaMode] = useState('dimensions');
  const [lengthM, setLengthM] = useState('4');
  const [widthM, setWidthM] = useState('3');
  const [areaM2, setAreaM2] = useState('12');
  const [boardPreset, setBoardPreset] = useState('1285x192');
  const [boardLengthMm, setBoardLengthMm] = useState('1285');
  const [boardWidthMm, setBoardWidthMm] = useState('192');
  const [layout, setLayout] = useState('straight');
  const [wastePercent, setWastePercent] = useState('7');
  const [boardsPerPack, setBoardsPerPack] = useState('');
  const [packAreaM2, setPackAreaM2] = useState('');

  const handlePresetChange = useCallback((value: string) => {
    setBoardPreset(value);

    const preset = BOARD_PRESETS.find((item) => item.value === value);

    if (preset && preset.value !== 'custom') {
      setBoardLengthMm(String(preset.length));
      setBoardWidthMm(String(preset.width));
    }
  }, []);

  const handleLayoutChange = useCallback((value: string) => {
    setLayout(value);

    const option = LAYOUT_OPTIONS.find((item) => item.value === value);

    if (option) {
      setWastePercent(String(option.waste));
    }
  }, []);

  const handleBoardsPerPackChange = useCallback((value: string) => {
    setBoardsPerPack(value);

    if (value.trim() !== '') {
      setPackAreaM2('');
    }
  }, []);

  const handlePackAreaChange = useCallback((value: string) => {
    setPackAreaM2(value);

    if (value.trim() !== '') {
      setBoardsPerPack('');
    }
  }, []);

  const result = useMemo(() => {
    const length = parseNumber(lengthM);
    const width = parseNumber(widthM);
    const areaDirect = parseNumber(areaM2);
    const boardLength = parseNumber(boardLengthMm);
    const boardWidth = parseNumber(boardWidthMm);
    const waste = parseNumber(wastePercent);
    const boardsPerPackNum = parseNumber(boardsPerPack);
    const packAreaNum = parseNumber(packAreaM2);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        area = areaDirect;
      }
    } else if (length !== null && width !== null && isInRange(length, 0.1, 50) && isInRange(width, 0.1, 50)) {
      area = length * width;
    }

    const isValid = area !== null
      && boardLength !== null && isInRange(boardLength, 300, 2500)
      && boardWidth !== null && isInRange(boardWidth, 50, 400)
      && waste !== null && isInRange(waste, 5, 20);

    if (!isValid || area === null || boardLength === null || boardWidth === null || waste === null) {
      return null;
    }

    const boardAreaM2 = (boardLength * boardWidth) / 1_000_000;
    const areaWithWaste = area * (1 + waste / 100);
    const boardsWithWaste = Math.ceil(areaWithWaste / boardAreaM2);

    let packs: number | null = null;

    if (boardsPerPackNum !== null && boardsPerPackNum > 0) {
      packs = Math.ceil(boardsWithWaste / boardsPerPackNum);
    } else if (packAreaNum !== null && packAreaNum > 0) {
      packs = Math.ceil(areaWithWaste / packAreaNum);
    }

    return {
      area, areaWithWaste, boardsWithWaste, packs, waste
    };
  }, [areaMode, lengthM, widthM, areaM2, boardLengthMm, boardWidthMm, wastePercent, boardsPerPack, packAreaM2]);

  const metrics = result ? [
    { label: 'Площадь помещения', value: `${formatNumber(result.area)} м²` },
    { label: 'Площадь с запасом', value: `${formatNumber(result.areaWithWaste)} м²` },
    { label: 'Запас на подрезку', value: `${result.waste}%` },
    ...(result.packs !== null ? [{ label: 'Досок', value: `${result.boardsWithWaste} шт.` }] : []),
    { label: 'Формат доски', value: `${boardLengthMm} × ${boardWidthMm} мм` },
    { label: 'Способ укладки', value: LAYOUT_OPTIONS.find((option) => option.value === layout)?.label ?? '' }
  ] : [];

  const note = result?.packs === null
    ? 'Укажите досок в упаковке или площадь упаковки, чтобы увидеть количество упаковок для закупки.'
    : 'Ламинат продаётся упаковками фиксированного объёма — округление до целой упаковки уже учтено.';

  const heading = result && result.packs !== null ? 'Нужно упаковок' : 'Нужно досок';

  let value;

  if (result) {
    value = result.packs !== null ? `${result.packs} уп.` : `${result.boardsWithWaste} шт.`;
  }

  return (
    <CalculatorPage
      intro="Калькулятор считает количество досок и упаковок ламината по площади комнаты и размеру доски, с учётом способа укладки. Это ориентир для закупки материала, а не стоимость работ по укладке."
      title="Калькулятор ламината: сколько упаковок нужно на комнату"
    >
      <CalculatorGrid
        fields={(
          <>
            <FieldGroup title="Помещение">
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
                    formatOptions={METER_FORMAT}
                    label="Длина помещения"
                    value={lengthM}
                    onChange={setLengthM}
                  />
                  <NumberField
                    formatOptions={METER_FORMAT}
                    label="Ширина помещения"
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
            </FieldGroup>

            <FieldGroup title="Доска">
              <SelectField
                label="Формат доски"
                options={BOARD_PRESETS.map((preset) => ({ value: preset.value, label: preset.label }))}
                value={boardPreset}
                onChange={handlePresetChange}
              />

              {boardPreset === 'custom' && (
                <>
                  <NumberField
                    formatOptions={MILLIMETER_FORMAT}
                    label="Длина доски"
                    value={boardLengthMm}
                    onChange={setBoardLengthMm}
                  />
                  <NumberField
                    formatOptions={MILLIMETER_FORMAT}
                    label="Ширина доски"
                    value={boardWidthMm}
                    onChange={setBoardWidthMm}
                  />
                </>
              )}
            </FieldGroup>

            <FieldGroup title="Укладка и запас">
              <SegmentedControl
                label="Способ укладки"
                options={LAYOUT_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
                value={layout}
                onChange={handleLayoutChange}
              />

              <NumberField
                formatOptions={PERCENT_FORMAT}
                hint="Подобран под способ укладки, можно изменить вручную"
                label="Запас на подрезку"
                value={wastePercent}
                onChange={setWastePercent}
              />
            </FieldGroup>

            <FieldGroup title="Упаковка">
              <NumberField
                hint="Если известно — посчитаем количество упаковок"
                label="Досок в упаковке"
                unit="шт."
                value={boardsPerPack}
                onChange={handleBoardsPerPackChange}
              />

              <NumberField
                hint="Альтернатива предыдущему полю, если известна площадь одной упаковки"
                label="Площадь упаковки"
                unit="м²"
                value={packAreaM2}
                onChange={handlePackAreaChange}
              />
            </FieldGroup>
          </>
        )}
        result={(
          <ResultCard
            ctaHref="/price#flooring"
            ctaLabel="Стоимость укладки ламината в прайс-листе"
            heading={heading}
            invalid={!result}
            invalidMessage="Укажите площадь помещения и размер доски"
            metrics={metrics}
            note={note}
            value={value}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <Typography.Paragraph>
          Площадь одной доски получается из длины и ширины в миллиметрах, переведённых в квадратные
          метры. Площадь помещения делится на площадь доски, к результату добавляется запас на
          подрезку — при диагональной укладке он выше из-за большего числа косых резов по краям
          комнаты.
        </Typography.Paragraph>

        <Typography.Paragraph>
          Подложка под ламинат — отдельный материал и в этом расчёте не учитывается, для неё
          достаточно взять площадь пола с небольшим запасом. Результат — количество материала для
          закупки, а не стоимость укладки: цены на работы смотрите в прайс-листе.
        </Typography.Paragraph>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['floor-screed', 'tile', 'wallpaper']} />

      <Disclaimer>
        Расчёт — количество ламината по введённым данным, а не смета работ. Точный объём закупки
        уточняйте у продавца с учётом остатков на складе и конкретной партии товара.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default LaminateCalculator;
