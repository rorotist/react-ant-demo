export function objectToReversal(object) {
  return Object.keys(object).reduce((acc, k) => {
    let value = object[k]
    acc[value] = k
    return acc
  }, {})
}
