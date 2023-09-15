import { useState } from 'react'

import { isEqual } from 'lodash'

export default function useCompareEffect(form) {
  const [value, setValue] = useState(false)
  const [prev, setPrev] = useState(null)

  const onCompare = data => {
    if (isEqual(data, form.getFieldsValue(true))) {
      setValue(true)
    } else {
      setValue(false)
    }
  }

  const onPrevData = data => {
    setPrev(structuredClone(data))
    onCompare(data)
  }

  const onFieldsCompare = () => {
    onCompare(prev)
  }

  return {
    compareChecked: value,
    onComparePrevData: onPrevData,
    onCompare: onFieldsCompare
  }
}
