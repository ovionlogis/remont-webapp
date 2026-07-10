import type { Metadata } from 'next';

// Default metadata constants
export const DEFAULT_TITLE = 'Ремонт и отделка квартир в Бердске, Академгородке';
export const DEFAULT_DESCRIPTION = 'Ремонт и отделка квартир под ключ в Бердске и Академгородке. Малярные, штукатурные, сантехнические работы. Работаем с физическими и юридическими лицами.';
export const DEFAULT_OG_IMAGE = '/images/opengraph/default.png';

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  noIndex?: boolean;
  absolute?: boolean;
}

export const createMetadata = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = '/',
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  absolute = false
}: CreateMetadataOptions = {}): Metadata => {
  const metadata: Metadata = {
    title: absolute ? { absolute: title } : title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      images: [{
        url: image,
        width: 1200,
        height: 630
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    alternates: {
      canonical: url
    }
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false
    };
  }

  return metadata;
};
