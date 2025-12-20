/**
 * Converts cricket overs format to decimal overs
 * decimal overs = wholeOvers * 6 + balls / 6
 *
 * Example:
 *  - 19.3 = 19 overs + 3 balls
 *            = (19 * 6 + 3) / 6
 *            = 19.5
 */

export function oversToDecimal(overs: number): number {
  if (overs < 0) {
    throw new Error(`Invalid overs: ${overs}`);
  }

  const wholeOvers = Math.floor(overs);
  const balls = Number((overs - wholeOvers).toFixed(1)) * 10;

  if (balls < 0 || balls > 5) {
    throw new Error(`Invalid overs format: ${overs}`);
  }

  const decimalOvers = (wholeOvers * 6 + balls) / 6;
  return Number(decimalOvers.toFixed(3));
}
