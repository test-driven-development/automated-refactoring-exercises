import {CHILDRENS, NEW_RELEASE, REGULAR} from './movie-codes'

let Customer = name => {
  let rentals = []

  return {
    get name() {
      return name
    },
    addRental(rental) {
      rentals.push(rental)
    },

    statement() {
      let total = 0
      let frequentRentalPoints = 0
      let report = 'Rental Record for ' + name + '\n'

      for (let i = 0; i < rentals.length; i++) {
        let subTotal = 0
        let rental = rentals[i]

        switch (rental.movie.priceCode) {
          case REGULAR:
            subTotal += 2
            if (rental.daysRented > 2) {
              subTotal += (rental.daysRented - 2) * 1.5
            }
            break

          case NEW_RELEASE:
            subTotal += rental.daysRented * 3
            break

          case CHILDRENS:
            subTotal += 1.5
            if (rental.daysRented > 3) {
              subTotal += (rental.daysRented - 3) * 1.5
            }

            break
          default:
        }

        // add frequent renter points
        frequentRentalPoints++

        // add bonus for a two day new release rental
        if (
          rental.movie.priceCode === NEW_RELEASE &&
          rental.daysRented > 1
        )
          frequentRentalPoints++

        // show figures for this rental
        report +=
          '\t' +
          rental.movie.title +
          '\t' +
          subTotal.toString(10) +
          '\n'

        total += subTotal
      }

      // add footer lines
      report += 'Amount owed is ' + total.toString(10) + '\n'
      report +=
        'You earned ' +
        String(frequentRentalPoints) +
        ' frequent renter points'

      return report
    },
  }
}

export {Customer}
