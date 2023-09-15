import { Children, cloneElement } from 'react'

import { Tooltip, theme } from 'antd'

import { IconQuestionMark } from '@tabler/icons-react'
import PropTypes from 'prop-types'

const FormGridColumn = ({ label, children, required = false, tooltip }) => {
  const {
    token: { controlHeight }
  } = theme.useToken()

  const renderChildren = () => {
    return Children.map(Children.toArray(children), child => {
      if (['string', 'number'].includes(typeof child)) {
        return (
          <span
            className={`inline-flex items-center`}
            style={{ minHeight: controlHeight }}
          >
            {child}
          </span>
        )
      }
      return cloneElement(child)
    })
  }

  const classNames = {
    cols: 'grid-cols-[180px_calc(100%-180px)] max-md:grid-cols-[150px_calc(100%-150px)]',
    group:
      'group-[.form-grid-group]:first-of-type:pr-2.5 max-md:group-[.form-grid-group]:first-of-type:pr-0',
    search:
      'group-[.search-form-group]:grid-cols-[160px_calc(100%-160px)] max-md:group-[.search-form-group]:grid-cols-[130px_calc(100%-130px)]'
  }

  return (
    <div
      className={`flex-1 grid align-middle items-stretch border-solid border-gray-200 border-y border-x-0 mt-[-1px] ${Object.values(
        classNames
      ).join(' ')}`}
    >
      <label
        className={`flex items-center py-1 pl-4 pr-2 text-sm font-medium bg-gray-100 break-keep`}
      >
        {label}
        {tooltip && (
          <Tooltip
            title={tooltip}
            placement="bottom"
          >
            <span className="w-3 h-3 ml-1 border border-gray-500 border-solid inline-flex items-center justify-center rounded-full text-gray-600">
              <IconQuestionMark size={10} />
            </span>
          </Tooltip>
        )}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className={
          'flex flex-wrap items-center gap-2 min-h-[36px] py-2 pl-2 leading-none'
        }
      >
        {renderChildren()}
      </div>
    </div>
  )
}

FormGridColumn.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,
  rules: PropTypes.array,
  tooltip: PropTypes.object
}

export default FormGridColumn
