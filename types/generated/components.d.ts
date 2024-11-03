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

export interface OrderIngredientsOrderIngredient extends Schema.Component {
  collectionName: 'components_order_ingredients_order_ingredients';
  info: {
    displayName: 'Order-ingredient';
  };
  attributes: {
    ingredient: Attribute.Relation<
      'order-ingredients.order-ingredient',
      'oneToOne',
      'api::ingredient.ingredient'
    >;
    quantity: Attribute.Integer;
  };
}

export interface OrderOrder extends Schema.Component {
  collectionName: 'components_order_orders';
  info: {
    displayName: 'Order';
    description: '';
  };
  attributes: {
    product: Attribute.Relation<
      'order.order',
      'oneToOne',
      'api::product.product'
    >;
    quantity: Attribute.Integer;
    OrderIngredient: Attribute.Component<
      'order-ingredients.order-ingredient',
      true
    >;
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
      'order-ingredients.order-ingredient': OrderIngredientsOrderIngredient;
      'order.order': OrderOrder;
      'images-url.images-url': ImagesUrlImagesUrl;
    }
  }
}
