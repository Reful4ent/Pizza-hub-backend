import productCalculate from "../routes/product-calculate";

export default{
  productCalculate: async(ctx) => {
    const productCharacteristics = ctx.request.body;

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

    // не надо использовать форы без крайней необходимости - медленный кусок дерьма
    // for(let i = 0; i < product.price.length; i++) {
    //   if (product.price[i].id != productCharacteristics.currentSize.id)
    //     continue;
    //   totalPrice += product.price[i].price;
    // }

    // тип того должно быть:
    let totalPrice = product.price.reduce((accumulator, element) => {
        if (element.id == productCharacteristics.currentSize.id) {
          return accumulator + element.price;
        }

        return 0;
    }, 0);


    // следи за длиной строки, нихуя ж неудобно читать длинные строки))
    const priceFromAdded = await strapi.service(
      'api::product-calculate.product-calculate'
    ).getAddedIngredientsPrice(
      productCharacteristics.addedIngredients
    );

    totalPrice += priceFromAdded;

    return totalPrice;
  }
}
