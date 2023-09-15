import { useState } from 'react'
import { PageTab } from '@components/ui/PageTab'

export function PageTabGuide() {
  const [active, setActive] = useState('1')
  const tabList = [
    { title: '테스트1', value: '1' },
    { title: '테스트2', value: '2' },
    { title: '테스트3', value: '3' }
  ]

  return (
    <>
      <PageTab
        active={active}
        list={tabList}
        setActive={setActive}
      />
    </>
  )
}
