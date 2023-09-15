import * as antd from 'antd'

import CustomDatePicker from '@components/ui/CustomDatePicker'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const FormGridItem = ({
  component,
  children,
  name,
  rules,
  shouldUpdate,
  disabled,
  className,
  style,
  valuePropName,
  ...args
}) => {
  const FormItem = antd['Form'].Item
  let Component =
    component === 'DatePicker'
      ? CustomDatePicker
      : component?.split('.').reduce((acc, key) => acc[key], antd)
  const classMerge = twMerge('mb-0', className)

  const itemProps = {}
  if (shouldUpdate) {
    itemProps.noStyle = true
    itemProps.shouldUpdate = shouldUpdate
  }
  if (valuePropName) itemProps.valuePropName = valuePropName

  return (
    <FormItem
      name={name}
      rules={rules}
      className={classMerge}
      style={style}
      {...itemProps}
    >
      {Component ? (
        <Component
          disabled={disabled}
          {...args}
          {...(component === 'InputNumber' ? { className } : {})}
        >
          {children}
        </Component>
      ) : (
        children
      )}
    </FormItem>
  )
}

FormGridItem.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  rules: PropTypes.array,
  style: PropTypes.object,
  className: PropTypes.string,
  shouldUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  valuePropName: PropTypes.string
}

export default FormGridItem
