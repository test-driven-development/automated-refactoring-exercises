import orders from '../orders.json'
import {Customer} from './Customer'
import {Movie} from './Movie'
import {Rental} from './Rental'
import {CHILDRENS, NEW_RELEASE, REGULAR} from './movie-codes'

function retailPricesFor({performances}) {
  return performances.map(order => {
    return (
      order.tickets * order.price -
      Math.max(0, order.tickets - 25) * order.price * 0.05 +
      Math.min(order.tickets * order.price * 0.1, 100)
    )
  })
}

describe(`retail price for order`, () => {
  const order = orders[0]
  retailPricesFor(order).should.deepEqual([
    2774.465,
    759.62,
    1277.1074999999998,
  ])
})

describe("martin fowler's movie refactoring example", () => {
  const DAYS_RENTED_IS_1 = 1
  const DAYS_RENTED_IS_2 = 2
  const DAYS_RENTED_IS_3 = 3

  let customer

  let childrens1
  let childrens2
  let childrens3

  let newRelease1
  let newRelease2
  let newRelease3

  let regular1
  let regular2
  let regular3

  beforeEach(() => {
    customer = Customer('Dummy Customer, Jr.')

    childrens1 = Movie('Childrens1', CHILDRENS)
    childrens2 = Movie('Childrens2', CHILDRENS)
    childrens3 = Movie('Childrens3', CHILDRENS)

    newRelease1 = Movie('New Release1', NEW_RELEASE)
    newRelease2 = Movie('New Release2', NEW_RELEASE)
    newRelease3 = Movie('New Release3', NEW_RELEASE)

    regular1 = Movie('Regular1', REGULAR)
    regular2 = Movie('Regular2', REGULAR)
    regular3 = Movie('Regular3', REGULAR)
  })

  test('childrens1', () => {
    childrens1.title.should.equal('Childrens1')
    childrens1.priceCode.should.equal(CHILDRENS)
  })

  test('childrens2', () => {
    childrens2.title.should.equal('Childrens2')
    childrens2.priceCode.should.equal(CHILDRENS)
  })

  test('childrens3', () => {
    childrens3.title.should.equal('Childrens3')
    childrens3.priceCode.should.equal(CHILDRENS)
  })

  test('newRelease1', () => {
    newRelease1.title.should.equal('New Release1')
    newRelease1.priceCode.should.equal(NEW_RELEASE)
  })

  test('newRelease2', () => {
    newRelease2.title.should.equal('New Release2')
    newRelease2.priceCode.should.equal(NEW_RELEASE)
  })

  test('newRelease3', () => {
    newRelease3.title.should.equal('New Release3')
    newRelease3.priceCode.should.equal(NEW_RELEASE)
  })

  test('regular1', () => {
    regular1.title.should.equal('Regular1')
    regular1.priceCode.should.equal(REGULAR)
  })

  test('regular2', () => {
    regular2.title.should.equal('Regular2')
    regular2.priceCode.should.equal(REGULAR)
  })

  test('regular3', () => {
    regular3.title.should.equal('Regular3')
    regular3.priceCode.should.equal(REGULAR)
  })

  function buildStaticStatement() {
    return (
      'Rental Record for Dummy Customer, Jr.\n' +
      '\tChildrens1\t1.5\n' +
      '\tChildrens2\t1.5\n' +
      '\tChildrens3\t1.5\n' +
      '\tRegular1\t2\n' +
      '\tRegular2\t2\n' +
      '\tRegular3\t3.5\n' +
      '\tNew Release1\t3\n' +
      '\tNew Release2\t6\n' +
      '\tNew Release3\t9\n' +
      'Amount owed is 30\n' +
      'You earned 11 frequent renter points'
    )
  }

  function buildCustomer() {
    customer.addRental(Rental(childrens1, DAYS_RENTED_IS_1))
    customer.addRental(Rental(childrens2, DAYS_RENTED_IS_2))
    customer.addRental(Rental(childrens3, DAYS_RENTED_IS_3))

    customer.addRental(Rental(regular1, DAYS_RENTED_IS_1))
    customer.addRental(Rental(regular2, DAYS_RENTED_IS_2))
    customer.addRental(Rental(regular3, DAYS_RENTED_IS_3))

    customer.addRental(Rental(newRelease1, DAYS_RENTED_IS_1))
    customer.addRental(Rental(newRelease2, DAYS_RENTED_IS_2))
    customer.addRental(Rental(newRelease3, DAYS_RENTED_IS_3))
  }

  test('is protected from regressions', () => {
    let expected = buildStaticStatement()
    buildCustomer()
    expected.should.equal(customer.statement())
  })
})
