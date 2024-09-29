

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
    },
    {
      method: 'POST',
      path: '/productFromCartCalculate',
      handler: 'product-calculate.productFromCartCalculate',
      config: {
        policies:[],
        middlewares:[],
      }
    }
  ]
}
