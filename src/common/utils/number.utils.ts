export function isPositiveNumber(value: any): boolean {
  return !isNaN(value) && Number(value) > 0
}
