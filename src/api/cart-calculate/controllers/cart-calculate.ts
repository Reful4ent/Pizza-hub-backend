import cartCalculate from "../services/cart-calculate";

export default{
  cartCalculate: async (ctx) => {
    let totalPrice = 0;
    if (ctx.request.body.shopCart){
      const shopCart = ctx.request.body.shopCart;
      for (const cartItem of shopCart) {

        let tempPrice = 0;
        const product = await strapi.entityService.findOne('api::product.product', cartItem.product.id, {
          fields: [],
          populate: {
            price: true
          },
        });

        for(let i = 0; i < product.price.length; i++) {
          if (product.price[i].id != cartItem.currentSize.id)
            continue;
          tempPrice += product.price[i].price;
        }

        for(const ingredient of cartItem.addedIngredients) {
          const temp = await strapi.entityService.findOne('api::ingredient.ingredient', ingredient.ingredient.id, {
            fields: ['price']
          });
          tempPrice += temp.price;
        }

        totalPrice += tempPrice * cartItem.count;
      }
    }
    return totalPrice;
  }
}
