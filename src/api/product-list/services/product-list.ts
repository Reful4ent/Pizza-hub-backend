export default {
  IsIngredientContainsFilter: (searchFilter: string, ingredients: any) => {
    if(ingredients === null) {
      return false;
    }

    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i]?.name?.toLowerCase().includes(searchFilter) ||
        ingredients[i]?.description?.toLowerCase().includes(searchFilter)) {
        return true;
      }
    }
    return false;
  },
  IsOnlyDigits: (str: string) => {
    return /^\d+$/.test(str);
  }
}
