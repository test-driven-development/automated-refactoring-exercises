import {CHILDRENS, NEW_RELEASE, REGULAR} from './movie-codes'

let makeCustomerFrom = name => {
  let rentals = []

  return {
    get name() {
      return name
    },
    addRental(rental) {
      rentals.push(rental)
    },

    statement() {
      let ttl = 0
      let frequentRntlPts = 0
      let rpt = 'Rental Record for ' + name + '\n'

      for (let i = 0; i < rentals.length; i++) {
        let subTtl = 0
        let rental = rentals[i]

        switch (rental.movie.priceCode) {
          case REGULAR:
            subTtl += 2
            if (rental.daysRented > 2) {
              subTtl += (rental.daysRented - 2) * 1.5
            }
            break

          case NEW_RELEASE:
            subTtl += rental.daysRented * 3
            break

          case CHILDRENS:
            subTtl += 1.5
            if (rental.daysRented > 3) {
              subTtl += (rental.daysRented - 3) * 1.5
            }

            break
          default:
        }

        // add frequent renter points
        frequentRntlPts++

        // add bonus for a two day new release rental
        if (
          rental.movie.priceCode === NEW_RELEASE &&
          rental.daysRented > 1
        )
          frequentRntlPts++

        // show figures for this rental
        rpt +=
          '\t' +
          rental.movie.title +
          '\t' +
          subTtl.toString(10) +
          '\n'

        ttl += subTtl
      }

      // add footer lines
      rpt += 'Amount owed is ' + ttl.toString(10) + '\n'
      rpt +=
        'You earned ' +
        String(frequentRntlPts) +
        ' frequent renter points'

      return rpt
    },
  }
}

export {makeCustomerFrom}
