import {
  createGoldAccount,
  createSilverAccount,
} from './account'

test(`guarantee lines >= 1`, () => {
  let args = [null, {}, 'string', () => {}, 0.999, -1, -100]

  args.forEach(arg => {
    ;(() => {
      createGoldAccount().monthlyChargeForLines({lines: arg})
    }).should.throw(`not guaranteed: {lines: ${arg}}`)
  })
})

describe(`monthly charges to an account with plan type`, () => {
  describe(`gold with`, () => {
    const goldAccount = createGoldAccount()

    describe(`complete phone bill for which`, () => {
      test(`minutes used: 878 - lines: 4 - charge: $83.95`, () => {
        goldAccount
          .monthlyChargeForLines({minutesUsed: 878, lines: 4})
          .should.equal(83.95)
      })

      test(`minutes used: 1123 - lines: 1 - charge: $105.30`, () => {
        goldAccount
          .monthlyChargeForLines({minutesUsed: 1123})
          .should.equal(105.3)
      })

      test(`minutes used: 1123 - lines: 4 - charge: $139.30`, () => {
        goldAccount
          .monthlyChargeForLines({
            minutesUsed: 1123,
            lines: 4,
          })
          .should.equal(139.3)
      })
    })

    describe(`number of lines -`, () => {
      test(`1: $49.95`, () => {
        goldAccount
          .monthlyChargeForLines({})
          .should.equal(49.95)
      })

      test(`2: $64.45`, () => {
        goldAccount
          .monthlyChargeForLines({lines: 2})
          .should.equal(64.45)
      })
    })

    describe(`minutes used -`, () => {
      test(`999: $49.95`, () => {
        goldAccount
          .monthlyChargeForLines({minutesUsed: 999})
          .should.equal(49.95)
      })

      test(`1000: $49.95`, () => {
        goldAccount
          .monthlyChargeForLines({minutesUsed: 1000})
          .should.equal(49.95)
      })

      test(`1001: $50.40`, () => {
        goldAccount
          .monthlyChargeForLines({minutesUsed: 1001})
          .should.equal(50.4)
      })
    })

    describe(`family plan lines -`, () => {
      test(`2: $64.45`, () => {
        goldAccount
          .monthlyChargeForLines({lines: 2})
          .should.equal(64.45)
      })

      test(`3: $78.95`, () => {
        goldAccount
          .monthlyChargeForLines({lines: 3})
          .should.equal(78.95)
      })

      test(`4: $83.95`, () => {
        goldAccount
          .monthlyChargeForLines({lines: 4})
          .should.equal(83.95)
      })
    })
  })

  describe(`silver with`, () => {
    const silverAccount = createSilverAccount()

    describe(`complete phone bill for which`, () => {
      test(`minutes used: 523 - lines: 2 - charge: $63.87`, () => {
        silverAccount
          .monthlyChargeForLines({minutesUsed: 523, lines: 2})
          .should.equal(63.87)
      })

      test(`minutes used: 44 - lines: 5 - charge: $82.95`, () => {
        silverAccount
          .monthlyChargeForLines({minutesUsed: 44, lines: 5})
          .should.equal(82.95)
      })

      test(`minutes used: 521 - lines: 5 - charge: $94.29`, () => {
        silverAccount
          .monthlyChargeForLines({minutesUsed: 521, lines: 5})
          .should.equal(94.29)
      })
    })

    describe(`number of lines -`, () => {
      test(`1: $29.95`, () => {
        silverAccount
          .monthlyChargeForLines({})
          .should.equal(29.95)
      })

      test(`3: $72.95`, () => {
        silverAccount
          .monthlyChargeForLines({lines: 3})
          .should.equal(72.95)
      })
    })

    describe(`minutes used -`, () => {
      test(`499: $29.95`, () => {
        silverAccount
          .monthlyChargeForLines({minutesUsed: 499})
          .should.equal(29.95)
      })

      test(`500: $29.95`, () => {
        silverAccount
          .monthlyChargeForLines({minutesUsed: 500})
          .should.equal(29.95)
      })

      test(`520: $40.75`, () => {
        silverAccount
          .monthlyChargeForLines({minutesUsed: 520})
          .should.equal(40.75)
      })
    })

    describe(`family plan lines -`, () => {
      it(`4: $77.95`, () => {
        silverAccount
          .monthlyChargeForLines({lines: 4})
          .should.equal(77.95)
      })
      it(`4: $77.95`, () => {
        silverAccount
          .monthlyChargeForLines({lines: 4})
          .should.equal(77.95)
      })

      it(`5: $82.95`, () => {
        silverAccount
          .monthlyChargeForLines({lines: 5})
          .should.equal(82.95)
      })
    })
  })
})
