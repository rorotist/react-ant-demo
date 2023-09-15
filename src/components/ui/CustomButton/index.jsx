// https://ant.design/components/button

import { cloneElement } from 'react'

import { Button, ConfigProvider, theme } from 'antd'

import { twMerge } from 'tailwind-merge'

import PropTypes from '@utils/PropTypes'

export default function CustomButton({
  children,
  color,
  label,
  icon,
  className = '',
  ...props
}) {
  const { token } = theme.useToken()

  const classMerge = twMerge(
    'inline-flex justify-center items-center',
    className || ''
  )

  const iconRender = icon && cloneElement(icon, { width: 14, height: 14 })

  return (
    <>
      {color ? (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: token?.[color] || 'blue'
            }
          }}
        >
          <Button
            type={'primary'}
            {...props}
            icon={iconRender}
            className={classMerge}
          >
            {children || label}
          </Button>
        </ConfigProvider>
      ) : (
        <Button
          {...props}
          icon={iconRender}
          className={classMerge}
        >
          {children || label}
        </Button>
      )}
    </>
  )
}

CustomButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  props: PropTypes.object,
  icon: PropTypes.node
}
