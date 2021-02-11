let Movie = (title, somePriceCode) => {
  let priceCode = somePriceCode

  return {
    get title() {
      return title
    },
    get priceCode() {
      return priceCode
    },
    set priceCode(code) {
      priceCode = code
    },
  }
}

export {Movie}
