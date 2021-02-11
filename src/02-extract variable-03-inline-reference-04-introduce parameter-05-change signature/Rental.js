let Rental = (movie, daysRented) => {
  return {
    get movie() {
      return movie
    },
    get daysRented() {
      return daysRented
    },
  }
}

export {Rental}
