'use strict';

import {Strapi} from '@strapi/strapi';

export default ({strapi}: { strapi: Strapi }) => ({
  cartCalculate: async (ctx) => {
    let totalPrice = 0;
    if (ctx.request.body.shopCart) {
      const shopCart = ctx.request.body.shopCart;

      for (const cartItem of shopCart) {

        let tempPrice = 0;
        const product = await strapi.entityService.findOne(
          'api::product.product',
          cartItem.product.id, {
            fields: [],
            populate: {
              price: true
            },
          }
        );

        tempPrice += product.price.reduce((accumulator, element) => {
          if (element.id == cartItem.currentSize.id) {
            return accumulator + element.price;
          }

          return accumulator;
        }, 0);


        const addedIngredientsIdAndCount = cartItem.addedIngredients.map(
          (addedIngredient) => ({
            id: addedIngredient.ingredient.id,
            count: addedIngredient.count
          })
        );


        for (const ingredientIdAndCount of addedIngredientsIdAndCount) {
          const ingredient = await strapi.entityService.findOne(
            'api::ingredient.ingredient',
            ingredientIdAndCount.id, {
              fields: ['price']
            }
          );
          tempPrice += ingredient.price * ingredientIdAndCount.count;
        }

        totalPrice += tempPrice * cartItem.count;
      }
    }
    return totalPrice;
  }
});
