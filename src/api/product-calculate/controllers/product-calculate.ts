import productCalculate from "../routes/product-calculate";

export default{
  productCalculate: async(ctx) => {
    let totalPrice = 0;
    const productCharacteristcs = ctx.request.body;

    const product = await strapi.entityService.findOne('api::product.product',productCharacteristcs.productId, {
      fields: [],
      populate: {
        price: true
      },
    });


    for(let i = 0; i < product.price.length; i++) {
      if (product.price[i].id != productCharacteristcs.currentSize.id)
        continue;
      totalPrice += product.price[i].price;
    }


    const priceFromAdded = await strapi.service('api::product-calculate.product-calculate').getAddedIngredientsPrice(productCharacteristcs.addedIngredients);
    totalPrice += priceFromAdded;

    return totalPrice;
  }
}
