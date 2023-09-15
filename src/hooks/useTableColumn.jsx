export const useTableColumn = sortedInfo => {
  const orderKey = key => {
    const idx = sortedInfo.findIndex(item => item.columnKey === key)
    const target = sortedInfo[idx]

    if (idx >= 0) {
      return {
        sorter: { multiple: idx + 1 },
        sortOrder: target.order
      }
    }

    return {}
  }

  return {
    orderKey
  }
}
