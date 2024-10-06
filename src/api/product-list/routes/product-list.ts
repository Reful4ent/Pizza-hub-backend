export default {
  routes: [
    {
      method: "POST",
      path: "/getFilteredProductList",
      handler: 'product-list.GetFilteredProductList',
      config: {
        policies:[],
        middlewares:[],
      }
    }
  ]
}
