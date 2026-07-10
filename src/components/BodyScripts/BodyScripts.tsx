import Script from 'next/script';

import config from '@/config';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  url: config.APP_URL,
  name: 'Ремонт и отделка квартир',
  description: 'Ремонт и отделка квартир под ключ в Бердске и Академгородке. Малярные, штукатурные, сантехнические работы.',
  areaServed: [
    { '@type': 'City', name: 'Бердск' },
    { '@type': 'Place', name: 'Академгородок' },
    { '@type': 'Place', name: 'Советский район' }
  ],
  telephone: '+7-913-955-12-49',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+7-913-955-12-49',
      contactType: 'Customer service'
    },
    {
      '@type': 'ContactPoint',
      telephone: '+7-951-371-94-11',
      contactType: 'Customer service'
    }
  ]
};

const BodyScripts = () => (
  <>
    {!!config.METRIKA_ID && (
      <Script
        id="metrika-script"
        strategy="afterInteractive"
      >
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${config.METRIKA_ID}, "init", {
            ssr:true,
            webvisor:true,
            clickmap:true,
            ecommerce:"dataLayer",
            accurateTrackBounce:true,
            trackLinks:true,
            referrer: document.referrer,
            url: location.href
          });
        `}
      </Script>
    )}

    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  </>
);

export default BodyScripts;
