export function objectToArray(object, isAll = false) {
  const list = Object.entries(object).map(i => ({ label: i[0], value: i[1] }))
  return [...(isAll ? [{ label: '전체', value: '' }] : []), ...list]
}
