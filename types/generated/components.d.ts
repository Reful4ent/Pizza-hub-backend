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

export interface ImagesUrlImagesUrl extends Schema.Component {
  collectionName: 'components_images_url_images_urls';
  info: {
    displayName: 'imagesURL';
  };
  attributes: {
    URL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'price.price': PricePrice;
      'images-url.images-url': ImagesUrlImagesUrl;
    }
  }
}
