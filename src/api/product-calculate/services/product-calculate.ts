
import { factories } from '@strapi/strapi';


export default {
  getAddedIngredientsPrice: async (addedIngredients) => {
    let totalPrice = 0;
    for (const ingredient of addedIngredients) {
      const result = await strapi.entityService.findOne('api::ingredient.ingredient', ingredient.ingredient.id,{
        fields: ['price']
      })
      totalPrice += result.price * ingredient.count;
    }
    return totalPrice;
  }
}
