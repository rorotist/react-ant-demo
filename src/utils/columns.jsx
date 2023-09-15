import { Link } from 'react-router-dom'

import { dateStandardTime, numberFormat } from '@utils/formatter'

export const cellKeyPath = (field, path) => {
  return `${path || ''}${path ? '.' : ''}${field}`
}

export const cellFormatter = {
  boolean: (value, displayText = ['사용', '미사용']) => {
    return value ? displayText[0] : displayText[1]
  },
  number: (value, unit) => {
    return `${numberFormat(value)}${unit ?? ''}` ?? '-'
  },
  date: value => {
    return dateStandardTime(value) ?? '-'
  },
  link: ({ text, href, target = '_self' }) => {
    return (
      <Link
        className="block"
        to={href}
        target={target}
      >
        {text}
      </Link>
    )
  }
}
