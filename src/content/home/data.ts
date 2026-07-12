import {
  Clock,
  MapPin,
  ShieldCheck,
  Users
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Advantage {
  title: string;
  text: string;
  icon: LucideIcon;
}

export const advantages: Advantage[] = [
  {
    title: '20+ лет опыта',
    text: 'Занимаемся ремонтно-отделочными работами более 20 лет — от простой отделки до класса люкс.',
    icon: Clock
  },
  {
    title: 'Контроль качества',
    text: 'Проверяем каждый этап работ и материалы, прежде чем переходить к следующему.',
    icon: ShieldCheck
  },
  {
    title: 'Физлицам и юрлицам',
    text: 'Ремонтируем квартиры, дома и офисные помещения любой сложности.',
    icon: Users
  },
  {
    title: 'Бердск и Академгородок',
    text: 'Работаем в Бердске, Академгородке и Советском районе Новосибирска.',
    icon: MapPin
  }
];
