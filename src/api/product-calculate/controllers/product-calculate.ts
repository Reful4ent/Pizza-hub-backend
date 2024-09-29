import productCalculate from "../routes/product-calculate";


export default{
  productCalculate: async(ctx) => {
    const productCharacteristics = ctx.request.body;

    const totalPrice = await strapi.service(
      'api::product-calculate.product-calculate'
    ).getProductPrice(
      productCharacteristics
    );


    return totalPrice;
  },
  productFromCartCalculate: async(ctx) => {
    const productCharacteristics = ctx.request.body;


    const totalPrice = await strapi.service(
      'api::product-calculate.product-calculate'
    ).getProductPrice(
      productCharacteristics
    );


    return totalPrice * productCharacteristics.count;
  }
}
