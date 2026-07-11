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

const ROLL_WIDTH_PRESETS = [
  { value: '0.53', label: '0.53 м' },
  { value: '0.7', label: '0.7 м' },
  { value: '1.0', label: '1.0 м' },
  { value: '1.06', label: '1.06 м' }
];

const DOOR_WIDTH_M = 0.8;
const WINDOW_WIDTH_M = 0.6;
const TRIM_ALLOWANCE_M = 0.1;

const ceilToMultiple = (value: number, multiple: number): number => Math.ceil(value / multiple) * multiple;

const WallpaperCalculator = () => {
  const [perimeterMode, setPerimeterMode] = useState('dimensions');
  const [lengthM, setLengthM] = useState('4');
  const [widthM, setWidthM] = useState('3');
  const [perimeterM, setPerimeterM] = useState('14');
  const [heightM, setHeightM] = useState('2.7');
  const [rollWidthM, setRollWidthM] = useState('1.0');
  const [rollLengthM, setRollLengthM] = useState('10.05');
  const [rapportCm, setRapportCm] = useState('0');
  const [doorCount, setDoorCount] = useState('1');
  const [windowCount, setWindowCount] = useState('1');
  const [wastePercent, setWastePercent] = useState('0');

  const handleRapportChange = useCallback((value: string) => {
    setRapportCm(value);

    const rapportNum = parseNumber(value);

    if (rapportNum !== null) {
      setWastePercent(rapportNum > 0 ? '10' : '0');
    }
  }, []);

  const result = useMemo(() => {
    const length = parseNumber(lengthM);
    const width = parseNumber(widthM);
    const perimeterDirect = parseNumber(perimeterM);
    const height = parseNumber(heightM);
    const rollWidth = parseNumber(rollWidthM);
    const rollLength = parseNumber(rollLengthM);
    const rapport = parseNumber(rapportCm);
    const doors = parseNumber(doorCount) ?? 0;
    const windows = parseNumber(windowCount) ?? 0;
    const waste = parseNumber(wastePercent);

    let perimeter: number | null = null;

    if (perimeterMode === 'perimeter') {
      if (perimeterDirect !== null && isInRange(perimeterDirect, 0.1, 100)) {
        perimeter = perimeterDirect;
      }
    } else if (length !== null && width !== null && isInRange(length, 0.1, 50) && isInRange(width, 0.1, 50)) {
      perimeter = 2 * (length + width);
    }

    const isValid = perimeter !== null
      && height !== null && isInRange(height, 2, 4.5)
      && rollWidth !== null && isInRange(rollWidth, 0.3, 1.5)
      && rollLength !== null && isInRange(rollLength, 1, 25)
      && rapport !== null && isInRange(rapport, 0, 100)
      && waste !== null && isInRange(waste, 0, 25);

    if (!isValid || perimeter === null || height === null || rollWidth === null || rollLength === null || rapport === null || waste === null) {
      return null;
    }

    const stripHeightBase = height + TRIM_ALLOWANCE_M;
    const stripHeight = rapport > 0 ? ceilToMultiple(stripHeightBase, rapport / 100) : stripHeightBase;
    const stripsPerRoll = Math.floor(rollLength / stripHeight);

    if (stripsPerRoll < 1) {
      return null;
    }

    const perimeterEffective = Math.max(perimeter - (doors * DOOR_WIDTH_M + windows * WINDOW_WIDTH_M), rollWidth);
    const stripsNeededBase = Math.ceil(perimeterEffective / rollWidth);
    const stripsNeeded = Math.ceil(stripsNeededBase * (1 + waste / 100));
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    const wallAreaM2 = perimeter * height;

    return {
      rollsNeeded, stripsNeeded, stripsPerRoll, wallAreaM2, waste
    };
  }, [perimeterMode, lengthM, widthM, perimeterM, heightM, rollWidthM, rollLengthM, rapportCm, doorCount, windowCount, wastePercent]);

  const metrics = result ? [
    { label: 'Полос нужно', value: `${result.stripsNeeded} шт.` },
    { label: 'Полос из рулона', value: `${result.stripsPerRoll} шт.` },
    { label: 'Площадь стен', value: `${formatNumber(result.wallAreaM2)} м²` },
    { label: 'Запас на подгонку', value: `${result.waste}%` }
  ] : [];

  return (
    <CalculatorPage
      intro="Калькулятор считает количество рулонов обоев по периметру и высоте комнаты, ширине и длине рулона, а также раппорту рисунка. Это ориентир для закупки материала, а не стоимость поклейки обоев."
      title="Калькулятор обоев: сколько рулонов нужно на комнату"
    >
      <CalculatorGrid
        fields={(
          <>
            <SegmentedControl
              label="Как ввести периметр"
              options={[
                { value: 'dimensions', label: 'Длина × ширина' },
                { value: 'perimeter', label: 'Периметр напрямую' }
              ]}
              value={perimeterMode}
              onChange={setPerimeterMode}
            />

            {perimeterMode === 'dimensions' ? (
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
                label="Периметр помещения"
                unit="м"
                value={perimeterM}
                onChange={setPerimeterM}
              />
            )}

            <NumberField
              label="Высота потолков"
              unit="м"
              value={heightM}
              onChange={setHeightM}
            />

            <SelectField
              label="Ширина рулона"
              options={ROLL_WIDTH_PRESETS}
              value={rollWidthM}
              onChange={setRollWidthM}
            />

            <NumberField
              label="Длина рулона"
              unit="м"
              value={rollLengthM}
              onChange={setRollLengthM}
            />

            <NumberField
              hint="0 — обои без подгонки рисунка"
              label="Раппорт рисунка"
              unit="см"
              value={rapportCm}
              onChange={handleRapportChange}
            />

            <NumberField
              label="Дверных проёмов"
              unit="шт."
              value={doorCount}
              onChange={setDoorCount}
            />
            <NumberField
              label="Оконных проёмов"
              unit="шт."
              value={windowCount}
              onChange={setWindowCount}
            />

            <NumberField
              hint="Авторасчёт по раппорту, можно изменить вручную"
              label="Запас на подгонку"
              unit="%"
              value={wastePercent}
              onChange={setWastePercent}
            />
          </>
        )}
        result={(
          <ResultCard
            heading="Нужно рулонов"
            invalid={!result}
            invalidMessage="Укажите размеры комнаты, высоту потолков и параметры рулона"
            metrics={metrics}
            note="Обои клеятся целыми полосами по периметру — остаток по высоте от последнего рулона идёт в отход."
            value={result ? `${result.rollsNeeded} рулон(ов)` : undefined}
          />
        )}
      />

      <CalculatorSection title="Как считает калькулятор">
        <p>
          Расчёт идёт полосами, а не делением площади на площадь рулона: высота одной полосы — это
          высота потолков плюс запас на подрезку сверху и снизу, а при наличии раппорта высота
          округляется вверх до величины, кратной раппорту. Из длины рулона получается целое число
          полос, а из периметра — необходимое число полос по ширине рулона.
        </p>

        <p>
          Дверные и оконные проёмы уменьшают периметр не пропорционально своей площади — кусок обоев
          над дверью часто всё равно идёт в отход, поэтому вычитается только часть ширины проёма.
          Итоговое число рулонов — ориентир для закупки, стоимость самой поклейки смотрите в
          прайс-листе.
        </p>
      </CalculatorSection>

      <Faq items={faqItems} />

      <RelatedCalculators slugs={['tile', 'laminate', 'putty-consumption']} />

      <Disclaimer>
        Расчёт — количество рулонов по введённым размерам, а не смета работ. Уточняйте фактическую
        длину и ширину рулона на этикетке купленных обоев — у разных производителей она может
        отличаться от указанной здесь.
      </Disclaimer>
    </CalculatorPage>
  );
};

export default WallpaperCalculator;
