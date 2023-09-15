export const numberFormat = value => {
  if (!isNaN(value)) {
    return Number(value).toLocaleString()
  }
  return null
}

export const numberPad = (num, width = 2) => {
  if (num || num === 0) {
    const number = num.toString()
    return number.length >= width
      ? number
      : new Array(width - number.length + 1).join('0') + number
  }
  return null
}

export const numberBiz = ({ value, isParse = false }) => {
  if (isParse) {
    return value.replace(/[^0-9]/g, '')
  }

  if (value || value === 0) {
    const val = value.replace(/[^0-9]/g, '')
    const bizRegx = /([0-9]{0,3})([0-9]{0,2})([0-9]{0,5})/
    const replaceType =
      val.length > 5 ? '$1-$2-$3' : val.length > 3 ? `$1-$2$3` : '$1$2$3'
    return val.replace(bizRegx, replaceType)
  }

  return ''
}

export const numberTel = ({ value, isParse }) => {
  if (isParse) {
    return value.replace(/[^0-9]/g, '')
  }

  if (value) {
    let val = value.replace(/[^0-9]/g, '')
    if (val.indexOf('1') === 0 && val.length <= 8) {
      return val.replace(/(^1\d{3})(\d{4})$/, '$1-$2')
    }

    const replaceType =
      val.length > 7 ? '$1-$2-$3' : val.length > 3 ? `$1-$2$3` : '$1$2$3'
    return val.replace(/(^02|\d{3})(\d{0,4})?(\d{4})$/, replaceType)
  }

  return ''
}
