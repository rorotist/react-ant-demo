import { useEffect, useMemo, useState } from 'react'

import { Input, Form } from 'antd'

import { numberBiz, numberTel } from '@utils/formatter/number'

import PropTypes from '@utils/PropTypes'

export default function MaskInput({
  formatter,
  name,
  value,
  onChange,
  ...rest
}) {
  const form = Form.useFormInstance()

  const [currentValue, setCurrentValue] = useState('')
  const [formatterValue, setFormatterValue] = useState('')

  const handleChange = val => {
    onChange?.(val)
    form?.setFieldValue(name, val)
  }

  const handleMaskInput = e => {
    let value = e.target.value

    if (formatter === 'tel') {
      value = numberTel({ value, isParse: true })
    }

    if (formatter === 'biz') {
      value = numberBiz({ value, isParse: true })
    }

    handleChange(value)
    setCurrentValue(value)
  }

  const maxLength = useMemo(() => {
    let length = undefined
    switch (formatter) {
      case 'tel':
        length = 13
        break
      case 'biz':
        length = 12
        break
    }

    return length
  }, [])

  useEffect(() => {
    let formatterVal = currentValue

    switch (formatter) {
      case 'tel':
        formatterVal = numberTel({ value: currentValue })
        break
      case 'biz':
        formatterVal = numberBiz({ value: currentValue })
        break
    }

    setFormatterValue(formatterVal)
  }, [currentValue])

  useEffect(() => {
    if (value && value !== currentValue) {
      setCurrentValue(value)
    }
  }, [value])

  return (
    <Input
      value={formatterValue}
      onChange={handleMaskInput}
      maxLength={maxLength}
      {...rest}
    />
  )
}

MaskInput.propTypes = {
  formatter: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}
