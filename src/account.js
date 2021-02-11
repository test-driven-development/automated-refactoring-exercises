export function createGoldAccount() {
  return createAccount(4995, 1450, 1000, 45)
}

export function createSilverAccount() {
  return createAccount(2995, 2150, 500, 54)
}

function createAccount(
  basicMonthlyRate,
  ratePerAdditionalLine,
  includedMinutes = 0,
  ratePerExcessMinute = 0,
) {
  function monthlyChargeForLines({
    lines = 1,
    minutesUsed = 0,
  }) {
    if (typeof lines !== `number` || lines < 1)
      throw new Error(`not guaranteed: {lines: ${lines}}`)

    const familyPlanRate = 500

    return (
      (basicMonthlyRate +
        ratePerAdditionalLine * additionalLines(lines) +
        familyPlanRate * familyPlanLines(lines) +
        ratePerExcessMinute *
          excessMinutes(minutesUsed, includedMinutes)) /
      100
    )

    function additionalLines(lines) {
      return Math.min(lines - 1, 2)
    }

    function familyPlanLines(lines) {
      const familyPlanLinesThreshold = 3
      return Math.max(0, lines - familyPlanLinesThreshold)
    }

    function excessMinutes(minutesUsed, includedMinutes) {
      return Math.max(0, minutesUsed - includedMinutes)
    }
  }

  return {
    monthlyChargeForLines,
  }
}
