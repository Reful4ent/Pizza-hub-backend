import productCalculate from "../routes/product-calculate";

//ToDo: сделать поиск по айди сущности а не через фронт))000
export default{
  productCalculate: async(ctx) => {
    console.log(ctx.request.body);
    const productCharacteristcs = ctx.request.body;
    let price = productCharacteristcs.currentPrice.price
      + productCharacteristcs.ingredient.price;
    for (let i = 0; i < productCharacteristcs.addedIngredients.length; i++) {
      price += productCharacteristcs.addedIngredients[i].ingredient.price * productCharacteristcs.addedIngredients[i].count;
    }
    console.log(price);
    return price;
  }
}
