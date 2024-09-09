import type { Schema, Attribute } from '@strapi/strapi';

export interface PricePrice extends Schema.Component {
  collectionName: 'components_price_prices';
  info: {
    displayName: 'price';
  };
  attributes: {
    name: Attribute.String;
    price: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'price.price': PricePrice;
    }
  }
}
