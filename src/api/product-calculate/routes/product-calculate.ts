

export default {
  routes: [
    {
      method: 'POST',
      path: '/productCalculate',
      handler: 'product-calculate.productCalculate',
      config: {
        policies:[],
        middlewares:[],
      }
    }
  ]
}
