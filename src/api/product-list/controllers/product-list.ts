import category from "../../category/routes/category";

export default {
  GetFilteredProductList: async (ctx) => {
    console.log(ctx.request.body)
    const pageSize = 3;


    const filters =
      {
        categoryId: ctx.request.body.categoryId,
        searchQuery: ctx.request.body.searchQuery,
        pageNumber: ctx.request.body.pageNumber,
      };


    const products = await strapi.entityService.findMany('api::product.product', {
      populate:
        {
          category: true,
          price: true,
          ingredients: true,
          images: true,
        },
    });

    let filteredProductList;

    if (filters.categoryId === 0) {
      filteredProductList = products;
    } else {
      filteredProductList = products?.filter(
        (product) => product?.category?.id === filters.categoryId,
      );
    }


    if (filters.searchQuery.length > 0) {
      filteredProductList = filteredProductList?.filter(
        (product:
           {
             name: string;
             description: string | any[];
             ingredients: any;
           }
        ) =>
          product?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
          || product?.description?.includes(filters.searchQuery.toLowerCase())
          || strapi.service('api::product-list.product-list')
            .IsIngredientContainsFilter(filters.searchQuery.toLowerCase(), product?.ingredients)
      )

    }

    filteredProductList = filteredProductList?.sort((firstProduct, secondProduct) => firstProduct.category.id - secondProduct.category.id);

    if (strapi.service('api::product-list.product-list').IsOnlyDigits(filters.pageNumber)) {

      return {
        products: filteredProductList.slice(filters.pageNumber * pageSize, filters.pageNumber * pageSize + pageSize),
        totalPages: Math.ceil(filteredProductList?.length / pageSize),
      }

    } else {

      return {
        products: filteredProductList.slice(0, pageSize),
        totalPages: 1,
      }

    }
  }
}
