


export default{
  routes: [
    {
      method: 'POST',
      path: '/cartCalculate',
      handler: 'cart-calculate.cartCalculate',
      config: {
        policies: [],
        middlewares: [],
      }
    }
  ]
}
