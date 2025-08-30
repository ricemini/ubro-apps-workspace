'use client';

import React from 'react';
import { TRUST } from '../../data/trust';

export default function AggregateRatingJsonLd(): React.JSX.Element {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'VendeMás',
    description:
      'Todo tu negocio, impulsado por IA. Vende más, sin complicarte.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: TRUST.rating,
      reviewCount: TRUST.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    brand: {
      '@type': 'Brand',
      name: 'VendeMás',
    },
    category: 'Business Software',
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
