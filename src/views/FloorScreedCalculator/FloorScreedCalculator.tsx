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

const BAG_WEIGHT_PRESETS = [
  { value: '25', label: '25 кг' },
  { value: '40', label: '40 кг' }
];

const PROPORTION_PRESETS = [
  {
    value: '1:3', label: '1 : 3 (цемент : песок)', cementParts: 1, sandParts: 3
  },
  {
    value: '1:4', label: '1 : 4 (цемент : песок)', cementParts: 1, sandParts: 4
  },
  { value: 'custom', label: 'Своя пропорция' }
];

const FloorScreedCalculator = () => {
  const [areaMode, setAreaMode] = useState('dimensions');
  const [lengthM, setLengthM] = useState('4');
  const [widthM, setWidthM] = useState('3');
  const [areaM2, setAreaM2] = useState('12');
  const [thicknessMm, setThicknessMm] = useState('50');
  const [calcMethod, setCalcMethod] = useState('mix');
  const [mixRateKgM2Mm, setMixRateKgM2Mm] = useState('1.8');
  const [bagWeightPreset, setBagWeightPreset] = useState('25');
  const [bagWeightKg, setBagWeightKg] = useState('25');
  const [proportionPreset, setProportionPreset] = useState('1:4');
  const [cementParts, setCementParts] = useState('1');
  const [sandParts, setSandParts] = useState('4');
  const [cementRateKgM3, setCementRateKgM3] = useState('400');
  const [wastePercent, setWastePercent] = useState('10');

  const handleBagPresetChange = useCallback((value: string) => {
    setBagWeightPreset(value);
    setBagWeightKg(value);
  }, []);

  const handleProportionChange = useCallback((value: string) => {
    setProportionPreset(value);

    const preset = PROPORTION_PRESETS.find((item) => item.value === value);

    if (preset && preset.value !== 'custom') {
      setCementParts(String(preset.cementParts));
      setSandParts(String(preset.sandParts));
    }
  }, []);

  const result = useMemo(() => {
    const length = parseNumber(lengthM);
    const width = parseNumber(widthM);
    const areaDirect = parseNumber(areaM2);
    const thickness = parseNumber(thicknessMm);
    const waste = parseNumber(wastePercent);

    let area: number | null = null;

    if (areaMode === 'area') {
      if (areaDirect !== null && isInRange(areaDirect, 0.1, 500)) {
        area = areaDirect;
      }
    } else if (length !== null && width !== null && isInRange(length, 0.1, 50) && isInRange(width, 0.1, 50)) {
      area = length * width;
    }

    const isBaseValid = area !== null && area > 0
      && thickness !== null && isInRange(thickness, 20, 150)
      && waste !== null && isInRange(waste, 0, 20);

    if (!isBaseValid || area === null || thickness === null || waste === null) {
      return null;
    }

    const thicknessWarning = thickness < 30 || thickness > 100;

    if (calcMethod === 'mix') {
      const rate = parseNumber(mixRateKgM2Mm);
      const bagWeight = parseNumber(bagWeightKg);

      if (rate === null || !isInRange(rate, 1.2, 2.5)) {
        return null;
      }

      const totalKg = area * thickness * rate * (1 + waste / 100);
      const bags = bagWeight !== null && bagWeight > 0 ? Math.ceil(totalKg / bagWeight) : null;

      return {
        method: 'mix' as const, area, thicknessWarning, totalKg, bags
      };
    }

    const cementPartsNum = parseNumber(cementParts);
    const sandPartsNum = parseNumber(sandParts);
    const cementRate = parseNumber(cementRateKgM3);

    if (
      cementPartsNum === null || cementPartsNum <= 0
      || sandPartsNum === null || sandPartsNum <= 0
      || cementRate === null || !isInRange(cementRate, 250, 500)
    ) {
      return null;
    }

    const volumeM3 = area * (thickness / 1000) * (1 + waste / 100);
    const cementKg = volumeM3 * cementRate;
    const sandM3 = volumeM3 * (sandPartsNum / (cementPartsNum + sandPartsNum));

    return {
      method: 'volume' as const, area, thicknessWarning, volumeM3, cementKg, sandM3
    };
  }, [
    areaMode, lengthM, widthM, areaM2, thicknessMm, calcMethod,
    mixRateKgM2Mm, bagWeightKg, cementParts, sandParts, cementRateKgM3, wastePercent
  ]);

  let heading = 'Нужно смеси';
  let metrics: { label: string; value: string }[] = [];
  let value;

  if (result?.method === 'mix') {
    metrics = [
      { label: 'Площадь помещения', value: `${formatNumber(result.area)} м²` },
      ...(result.bags !== null ? [{ label: 'Мешков', value: `${result.bags} шт.` }] : [])
    ];
    value = `${formatNumber(result.totalKg)} кг`;
  } else if (result) {
    heading = 'Нужно цемента и песка';
    metrics = [
      { label: 'Площадь помещения', value: `${formatNumber(result.area)} м²` },
      { label: 'Объём стяжки', value: `${formatNumber(result.volumeM3, 3)} м³` },
      { label: 'Песка', value: `${formatNumber(result.sandM3, 3)} м³` }
    ];
    value = `${formatNumber(result.cementKg)} кг цемента`;
  }

  const note = result?.thicknessWarning
    ? 'Толщина за пределами типового диапазона 30–100 мм — при таких значениях часто требуется армирование или другое решение (наливной пол при малой толщине), уточните у прораба.'
    : 'Расчёт смеси не заменяет проектный расчёт нагрузки на перекрытие и не учитывает армирование и маяки.';

  return (
    <CalculatorPage
      intro="Калькулятор считает количество сухой смеси или цемента и песка для стяжки пола по площади и толщине. Это ориентир для закупки материала, а не проектный расчёт конструкции пола."
      title="Калькулятор стяжки пола: расчёт смеси и мешков"
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
              label="Толщина стяжки"
              unit="мм"
              value={thicknessMm}
              onChange={setThicknessMm}
            />

            <SegmentedControl
              label="Способ расчёта"
              options={[
                { value: 'mix', label: 'Готовая сухая смесь' },
                { value: 'volume', label: 'Цемент + песок' }
              ]}
              value={calcMethod}
              onChange={setCalcMethod}
            />

            {calcMethod === 'mix' ? (
              <>
                <NumberField
                  hint="Типовое значение для ЦПС-смесей, уточните по этикетке"
                  label="Расход смеси на м²/мм"
                  unit="кг/м²/мм"
                  value={mixRateKgM2Mm}
                  onChange={setMixRateKgM2Mm}
                />

                <SelectField
                  label="Вес мешка"
                  options={BAG_WEIGHT_PRESETS}
                  value={bagWeightPreset}
                  onChange={handleBagPresetChange}
                />

                <NumberField
                  label="Вес мешка"
                  unit="кг"
                  value={bagWeightKg}
                  onChange={setBagWeightKg}
                />
              </>
            ) : (
              <>
                <SelectField
                  label="Пропорция цемент : песок"
                  options={PROPORTION_PRESETS.map((preset) => ({ value: preset.value, label: preset.label }))}
                  value={proportionPreset}
                  onChange={handleProportionChange}
                />

                <NumberField
                  label="Частей цемента"
                  unit="доля"
                  value={cementParts}
                  onChange={setCementParts}
                />
                <NumberField
                  label="Частей песка"
                  unit="доля"
                  value={sandParts}
                  onChange={setSandParts}
                />

                <NumberField
                  hint="Типовое ориентировочное значение, зависит от марки цемента"
                  label="Расход цемента на м³ смеси"
                  unit="кг/м³"
                  value={cementRateKgM3}
                  onChange={setCementRateKgM3}
                />
              </>
            )}

            <NumberField
              label="Запас"
              unit="%"
              value={wastePercent}
              onChange={setWastePercent}
            />
          </>
        )}
        result={(
          <ResultCard
            heading={heading}
            invalid={!result}
            invalidMessage="Укажите площадь, толщину и параметры выбранного способа расчёта"
            metrics={metrics}
            note={note}
            value={value}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <p>
          Для готовой сухой смеси расход считается напрямую: площадь × толщина в миллиметрах × норма
          расхода смеси на м²/мм, с добавлением запаса. Для варианта «цемент + песок» сначала
          считается объём стяжки в кубометрах, а затем масса цемента и объём песка — по выбранной
          пропорции и норме расхода цемента на кубометр готовой смеси.
        </p>

        <p>
          Готовая смесь проще считать и её расход стабильнее — он указан производителем. Объёмный
          расчёт дешевле, но норма расхода цемента — усреднённый ориентир, который зависит от марки
          цемента и влажности песка. Расчёт не заменяет проектный расчёт нагрузки на перекрытие и не
          учитывает армирование или маяки — для тонких стяжек (менее 30 мм) обычно применяют другие
          решения, например наливной пол.
        </p>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['tile', 'laminate', 'putty-consumption']} />

      <Disclaimer>
        Расчёт — количество материала для стяжки по введённым данным, а не проектный расчёт
        конструкции пола. Перед закупкой большого объёма уточняйте нормы расхода у производителя и
        технологию у прораба.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default FloorScreedCalculator;
