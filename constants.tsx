
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'RAWLINE TEE 01',
    handle: 'rawline-tee-01',
    price: 65,
    description: 'A structured silhouette built from heavy-weight cotton. Designed to hold form while maintaining a soft internal feel.',
    images: [
      'https://picsum.photos/seed/tee1/1200/1600',
      'https://picsum.photos/seed/tee2/1200/1600'
    ],
    fabric: '240gsm Organic Cotton',
    fit: 'Boxy, relaxed fit. Dropped shoulders.',
    care: 'Cold wash. Hang dry.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod_2',
    title: 'RAWLINE HOOD 01',
    handle: 'rawline-hood-01',
    price: 120,
    description: 'The definitive architectural layer. Heavy-set hood with integrated neck structure. Minimal seams, maximum impact.',
    images: [
      'https://picsum.photos/seed/hood1/1200/1600',
      'https://picsum.photos/seed/hood2/1200/1600'
    ],
    fabric: '400gsm French Terry',
    fit: 'Over-sized silhouette. Structured hood.',
    care: 'Hand wash recommended or delicate cold cycle.',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'prod_3',
    title: 'RAWLINE SHIRT 01',
    handle: 'rawline-shirt-01',
    price: 95,
    description: 'Precision cut from stiff poplin. A crisp expression of the first line. Hidden placket for a monolithic appearance.',
    images: [
      'https://picsum.photos/seed/shirt1/1200/1600',
      'https://picsum.photos/seed/shirt2/1200/1600'
    ],
    fabric: '100% Cotton Poplin',
    fit: 'Straight cut. Sharp collar.',
    care: 'Dry clean only to maintain structure.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'prod_4',
    title: 'RAWLINE CARGO 01',
    handle: 'rawline-cargo-01',
    price: 150,
    description: 'Functional form meets raw instinct. Wide-leg construction with internal pocket architecture. Built to last.',
    images: [
      'https://picsum.photos/seed/cargo1/1200/1600',
      'https://picsum.photos/seed/cargo2/1200/1600'
    ],
    fabric: 'Heavy Cotton Twill',
    fit: 'Wide leg. High waist. Adjustable hem.',
    care: 'Wash inside out.',
    sizes: ['30', '32', '34']
  }
];
