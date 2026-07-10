'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';

import type { PortfolioImage } from '@/content/portfolio/data';
import { data } from '@/content/portfolio/data';

import styles from './Portfolio.module.scss';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/styles.css';

const slides = data.map((image) => ({
  src: image.src,
  width: image.width,
  height: image.height,
  alt: image.alt,
  description: image.caption
}));

interface ItemProps {
  image: PortfolioImage;
  itemIndex: number;
  onOpen: (index: number) => void;
}

const Item = ({ image, itemIndex, onOpen }: ItemProps) => {
  const handleClick = useCallback(() => onOpen(itemIndex), [itemIndex, onOpen]);

  return (
    <button
      type="button"
      className={styles.figure}
      onClick={handleClick}
    >
      <div className={styles.image}>
        <Image
          alt={image.alt}
          height={image.height}
          loading="lazy"
          src={image.src}
          width={image.width}
        />
      </div>

      <figcaption>
        <span className={styles.number}>
          {itemIndex + 1}.
        </span>

        {image.caption}
      </figcaption>
    </button>
  );
};

const Portfolio = () => {
  const [index, setIndex] = useState(-1);

  const handleOpen = useCallback((i: number) => setIndex(i), []);
  const handleClose = useCallback(() => setIndex(-1), []);

  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>
        Портфолио выполненных работ
      </h1>

      <div className={styles.grid}>
        {data.map((image, i) => (
          <Item
            key={image.src}
            image={image}
            itemIndex={i}
            onOpen={handleOpen}
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={handleClose}
        slides={slides}
        plugins={[Captions]}
      />
    </div>
  );
};

export default Portfolio;
