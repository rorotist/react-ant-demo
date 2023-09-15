import { Outlet } from 'react-router-dom'
import CustomButton from '@components/ui/CustomButton'
import CustomTabs from '@components/ui/CustomTabs'
import useCreateParam from '@hooks/useCreateParam'

export default function Parent() {
  const tabData = [
    {
      key: 'child1',
      label: 'Tabtabtab1'
    },
    {
      key: 'child2',
      label: 'Tabtabtab2'
    }
  ]

  const parentData = {
    value: 'parent data blahblahblah'
  }
  const createParam = useCreateParam(tabData, 1)

  return (
    <>
      <CustomTabs tabData={tabData} />
      <CustomButton onClick={createParam}>param 생성</CustomButton>
      <Outlet context={parentData} />
    </>
  )
}
