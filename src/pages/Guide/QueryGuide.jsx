import { useEffect } from 'react'
import CustomButton from '@components/ui/CustomButton'
import { Space, notification } from 'antd'

export function QueryGuide() {
  const [api, contextHolder] = notification.useNotification()
  useEffect(() => {
    api.info({
      message: `Ntest`,
      description: 'sefef'
    })
  }, [])

  return (
    <>
      <Space>
        {contextHolder}
        <CustomButton color={'b'}>b or blue</CustomButton>
        <CustomButton color={'b'}>b or blue</CustomButton>
        <CustomButton color={'b'}>b or blue</CustomButton>
        <CustomButton color={'b'}>b or blue</CustomButton>
        <CustomButton>default</CustomButton>
        <CustomButton color={'r'}>r or red</CustomButton>
        <CustomButton color={'p'}>p or purple</CustomButton>
      </Space>
    </>
  )
}
