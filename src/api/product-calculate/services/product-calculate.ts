
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
  },
  getProductPrice: async (productCharacteristics) => {

    const product = await strapi.entityService.findOne(
      'api::product.product',
      productCharacteristics.productId,
      {
        fields: [],
        populate: {
          price: true
        },
      },
    );

    let totalPrice = product.price.reduce((accumulator, element) => {
      if (element.id == productCharacteristics.currentSize.id) {
        return accumulator + element.price;
      }

      return accumulator;
    }, 0);


    const priceFromAdded = await strapi.service(
      'api::product-calculate.product-calculate'
    ).getAddedIngredientsPrice(
      productCharacteristics.addedIngredients
    );

    totalPrice += priceFromAdded;

    return totalPrice;
  }
}
