import image01 from './images/01.jpg';
import image02 from './images/02.jpg';
import image03 from './images/03.jpg';
import image04 from './images/04.jpg';
import image05 from './images/05.jpg';
// import image06 from './images/06.jpg';
import image07 from './images/07.jpg';
import image08 from './images/08.jpg';
import image09 from './images/09.jpg';
import image10 from './images/10.jpg';
import image11 from './images/11.jpg';
import image12 from './images/12.jpg';
import image13 from './images/13.jpg';
import image14 from './images/14.jpg';
import image15 from './images/15.jpg';
import image16 from './images/16.jpg';
import image17 from './images/17.jpg';
import image18 from './images/18.jpg';
import image19 from './images/19.jpg';
import image20 from './images/20.jpg';
import image21 from './images/21.jpg';

export interface PortfolioImage {
  alt: string;
  caption: string;
  height: number;
  width: number;
  src: string;
}

export const data: PortfolioImage[] = [
  {
    alt: 'Сауна отделанная рейкой',
    caption: 'Пример отделки сауны рейкой из липы',
    height: image18.height,
    width: image18.width,
    src: image18.src
  },
  {
    alt: 'Кухня',
    caption: 'Возможная планировка рабочих площадей на кухне',
    height: image19.height,
    width: image19.width,
    src: image19.src
  },
  {
    alt: 'Санузел с отделкой из серой плитки',
    caption: 'Пример установки сантехнического оборудования над уровнем пола',
    height: image20.height,
    width: image20.width,
    src: image20.src
  },
  {
    alt: 'Открытые душевые. Деревянные полки в сауне',
    caption: 'Душевые перед входом в сауну. Пример монтажа подсветки в сауне',
    height: image21.height,
    width: image21.width,
    src: image21.src
  },
  {
    alt: 'Фартук кухни из мозаики кофейного цвета',
    caption: 'Устройство кухни в типовой малогабаритной квартире',
    height: image01.height,
    width: image01.width,
    src: image01.src
  },
  {
    alt: 'Раковина с нишей отделанная гранатовой плиткой',
    caption: 'Устройство ниши и монтаж раковины-умывальника в санузле',
    height: image02.height,
    width: image02.width,
    src: image02.src
  },
  {
    alt: 'Комната с обоями персикового цвета',
    caption: 'Оклейка фотообоев и монтаж обнижения потолка',
    height: image03.height,
    width: image03.width,
    src: image03.src
  },
  {
    alt: 'Шкаф отделанный оранжевой мозаикой',
    caption: 'Устройство ниш из гипсокартона со встроенными шкафами в санузле',
    height: image04.height,
    width: image04.width,
    src: image04.src
  },
  {
    alt: 'Красный диван и барная стойка в межкомнатном пространстве',
    caption: 'Устройство барной стойки в гостиной',
    height: image05.height,
    width: image05.width,
    src: image05.src
  },
  {
    alt: 'Выход на балкон',
    caption: 'Отделка откосов балконной двери',
    height: image07.height,
    width: image07.width,
    src: image07.src
  },
  {
    alt: 'Ванная комната персикового цвета и ванная',
    caption: 'Отделка ванной комнаты',
    height: image08.height,
    width: image08.width,
    src: image08.src
  },
  {
    alt: 'Многоуровневый белый потолок с люстрой',
    caption: 'Комбинированный потолок из гипсокартона и натяжной',
    height: image09.height,
    width: image09.width,
    src: image09.src
  },
  {
    alt: 'Ниша под душ с отделкой из фиолетовой мозаики',
    caption: 'Устройство подиума под душ из мозаики и плитки',
    height: image10.height,
    width: image10.width,
    src: image10.src
  },
  {
    alt: 'Лоджия с отделкой из дерева и часть внутреннего окна',
    caption: 'Отделка деревом лоджии',
    height: image11.height,
    width: image11.width,
    src: image11.src
  },
  {
    alt: 'Лоджия с отделкой из дерева',
    caption: 'Устройство полов лоджии',
    height: image12.height,
    width: image12.width,
    src: image12.src
  },
  {
    alt: 'Унитаз с гигиеническим душем смонтированным на стене',
    caption: 'Установка дополнительного гигиенического душа в санузле',
    height: image13.height,
    width: image13.width,
    src: image13.src
  },
  {
    alt: 'Белая раковина. Ниша под стиральную машину',
    caption: 'Устройства ниши из гипсокартона под стиральную машину с отделкой из мозаики',
    height: image14.height,
    width: image14.width,
    src: image14.src
  },
  {
    alt: 'Белый многоуровневый потолок',
    caption: 'Комбинированный потолок',
    height: image15.height,
    width: image15.width,
    src: image15.src
  },
  {
    alt: 'Раковина со встроенным шкафом',
    caption: 'Отделка санузла кафелем и установка сантехнического оборудования',
    height: image16.height,
    width: image16.width,
    src: image16.src
  },
  {
    alt: 'Дверной проем',
    caption: 'Установка дверей',
    height: image17.height,
    width: image17.width,
    src: image17.src
  }
];
