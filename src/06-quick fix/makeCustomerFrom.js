import {CHILDRENS, NEW_RELEASE, REGULAR} from './movie-codes'

let makeCustomerFrom = name => {
  let rentals = []

  function chargeFor(rental, subtotal) {
    let total = 0
    switch (rental.movie.priceCode) {
      case REGULAR:
        total += 2
        if (rental.daysRented > 2) {
          total += (rental.daysRented - 2) * 1.5
        }
        break

      case NEW_RELEASE:
        total += rental.daysRented * 3
        break

      case CHILDRENS:
        total += 1.5
        if (rental.daysRented > 3) {
          total += (rental.daysRented - 3) * 1.5
        }

        break
      default:
    }
    return total
  }

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
        let subtotal = 0
        let rental = rentals[i]
        subtotal = chargeFor(rental, subtotal)

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
          subtotal.toString(10) +
          '\n'

        total += subtotal
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

export {makeCustomerFrom}
