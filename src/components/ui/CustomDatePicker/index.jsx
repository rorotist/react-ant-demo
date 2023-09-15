// https://ant.design/components/date-picker#common-api

import { useEffect, useState } from 'react'
import { DatePicker, Form } from 'antd'
import locale from 'antd/es/date-picker/locale/ko_KR'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import PropTypes from '@/utils/PropTypes'
dayjs.extend(utc)
dayjs.extend(timezone)

const tz = 'Asia/Seoul'

export default function CustomDatePicker({
  value,
  onChange,
  isRange,
  rangeKeys,
  showTime = false,
  ...props
}) {
  const form = Form.useFormInstance()

  const { RangePicker } = DatePicker

  const format = showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'

  const [currentValue, setCurrentValue] = useState(null)

  const rangeEndDate = isRange ? form.getFieldValue(rangeKeys[1]) : null

  const timeFormat = v => {
    if (showTime) {
      return v?.utc().tz(tz).format('YYYY-MM-DDTHH:mm:00') //.000[Z]
    }
    return v?.utc().tz(tz).format(format)
  }

  const triggerChange = value => {
    onChange?.(value)
  }

  const handleChange = date => {
    if (isRange) {
      const start = date ? timeFormat(date[0]) : null
      const end = date ? timeFormat(date[1]) : null

      form.setFieldValue(rangeKeys[0], start)
      form.setFieldValue(rangeKeys[1], end)

      pickerValue()
      if (
        value !== start ||
        (rangeEndDate !== undefined && rangeEndDate !== end)
      ) {
        triggerChange(start ? start : null)
      }
    } else {
      const value = date ? timeFormat(date) : null

      pickerValue(value)
      if (value !== currentValue) triggerChange(value)
    }
  }

  const pickerValue = pick => {
    if (isRange) {
      const start = form.getFieldValue(rangeKeys[0])
      const end = form.getFieldValue(rangeKeys[1])

      if (start || end) {
        setCurrentValue([
          start ? dayjs(start, format) : null,
          end ? dayjs(end, format) : null
        ])
      } else {
        setCurrentValue(null)
      }
    } else {
      const val = pick || value || null
      setCurrentValue(val ? dayjs(val, format) : null)
    }
  }

  useEffect(
    () => {
      if (value && isRange) {
        const start = value
        const end = form.getFieldValue(rangeKeys[1])
        handleChange(
          [start && dayjs(start, format), end && dayjs(end, format)],
          [start, end]
        )
      } else if (value && !isRange) {
        handleChange(dayjs(value, format), value)
      } else {
        handleChange(null, '')
      }
    },
    isRange ? [value, rangeEndDate] : [value]
  )

  useEffect(() => {
    pickerValue()
  }, [])

  const PickerComponent = isRange ? RangePicker : DatePicker

  return (
    <PickerComponent
      value={currentValue}
      locale={locale}
      minuteStep={5}
      format={format}
      className={
        'border-gray-4 rounded h-9 hover:border-gray-4 focus-within:shadow-none'
      }
      showTime={showTime}
      onChange={handleChange}
      {...props}
    />
  )
}

CustomDatePicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  isRange: PropTypes.bool,
  showTime: PropTypes.bool,
  format: PropTypes.string,
  rangeKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func
}
