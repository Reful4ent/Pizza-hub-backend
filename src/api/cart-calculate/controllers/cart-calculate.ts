'use strict';

import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  cartCalculate: async (ctx) => {
    let totalPrice = 0;
    if (ctx.request.body.shopCart){
      const shopCart = ctx.request.body.shopCart;
      // фор оправдан - внутри авейт все четко
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

        // форы - нахуй
        // for(let i = 0; i < product.price.length; i++) {
        //   if (product.price[i].id != cartItem.currentSize.id)
        //     continue;
        //   tempPrice += product.price[i].price;
        // }

        // редьюс - тема
        let totalPrice = product.price.reduce((accumulator, element) => {
          if (element.id == cartItem.currentSize.id) {
            return accumulator + element.price;
          }

          return 0;
        }, 0);


        // тот случай, когда фор оправдан из-за авейта
        // но фор говно, потому что нейминги говно
        // for (const ingredient of cartItem.addedIngredients) {
        const addedIngredientsId = cartItem.addedIngredients.map(
          (addedIngredient) => addedIngredient.ingredient.id
        );
        for (const ingredientId of addedIngredientsId) {
          // имена переменных:
          // temp - говно
          // ingredient - заебись
          const ingredient = await strapi.entityService.findOne(
            'api::ingredient.ingredient',
            ingredientId, {
              fields: ['price']
            }
          );
          tempPrice += ingredient.price;
        }

        totalPrice += tempPrice * cartItem.count;
      }
    }
    return totalPrice;
  }
});
