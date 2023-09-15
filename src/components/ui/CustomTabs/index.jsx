import { useEffect } from 'react'
import {
  useLocation,
  useMatches,
  useNavigate,
  useParams
} from 'react-router-dom'

import { Tabs, ConfigProvider } from 'antd'

import PropTypes from '@utils/PropTypes'

export default function CustomTabs({ tabData, onTabData, paramsKey = 'id' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isParams = !!useParams()?.[paramsKey]

  function getLastPart(url) {
    const parts = url.split('/')
    return parts.at(-1)
  }

  const mutateTabData = tabData.map(item => {
    return {
      ...item,
      disabled: item.key !== tabData[0].key && !isParams
    }
  })

  const currentPath = getLastPart(location.pathname)

  const onChange = key => {
    navigate(key)
  }

  useEffect(() => {
    onTabData?.({
      currentPath,
      idx: tabData.findIndex(item => item.key === currentPath),
      isFirst: tabData[0].key === currentPath,
      isLast: tabData[tabData.length - 1].key === currentPath
    })
  }, [currentPath])

  /* redirect */
  const root = useMatches().at(-1).handle

  useEffect(() => {
    if (root) {
      if (
        (!root?.paramsKey && !tabData.find(item => item.key === currentPath)) ||
        root?.paramsKey === paramsKey
      ) {
        navigate(`${location.pathname}/${tabData[0].key}`, { replace: true })
      }
    }
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          // lineType: 'none'
          colorBorderSecondary: '#e2e8f0'
        },
        components: {
          Tabs: {
            cardGutter: 7
          }
        }
      }}
    >
      <Tabs
        type="card"
        activeKey={currentPath}
        items={mutateTabData}
        onChange={onChange}
      />
    </ConfigProvider>
  )
}

CustomTabs.propTypes = {
  tabData: PropTypes.array,
  onTabData: PropTypes.func,
  paramsKey: PropTypes.string
}
