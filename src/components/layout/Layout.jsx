import { Suspense, useContext, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Layout, Spin, theme, Drawer } from 'antd'

import LayoutBody from '@components/layout/LayoutBody'
import LayoutSide from '@components/layout/LayoutSide'
import LayoutTop from '@components/layout/LayoutTop'
import { LayoutContext } from '@components/layout/context/LayoutContext'
import PropTypes from 'prop-types'

import ErrorPage from '@pages/Error'

const wrapStyle = {
  width: 225,
  collapsedWidth: 80,
  height: 64,
  transition: 'all 0.2s'
}

const LayoutWrap = ({ children }) => {
  const { mobileSideOpen, setMobileSideOpen, sideCollapsed, setSideCollapsed } =
    useContext(LayoutContext)

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const [isBreak, setIsBreak] = useState(false)

  const space = useMemo(() => {
    if (isBreak) {
      return 0
    }
    return sideCollapsed ? wrapStyle.collapsedWidth : wrapStyle.width
  }, [isBreak, sideCollapsed])

  return (
    <Layout
      className={'min-h-[100vh]'}
      hasSider
    >
      <Layout.Sider
        breakpoint="sm"
        onBreakpoint={setIsBreak}
        trigger={null}
        width={isBreak ? 0 : wrapStyle.width}
        collapsedWidth={isBreak ? 0 : wrapStyle.collapsedWidth}
        collapsible
        collapsed={sideCollapsed}
        onCollapse={value => {
          setMobileSideOpen(false)
          setSideCollapsed(value)
        }}
        className={'left-0 top-0 bottom-0 h-[100vh] overflow-auto'}
        style={{ position: 'fixed' }}
      >
        <LayoutSide
          collapsed={sideCollapsed}
          logoHeight={wrapStyle.height}
        />
      </Layout.Sider>
      <Layout
        className="site-layout pt-16"
        style={{
          marginLeft: space,
          transition: wrapStyle.transition
        }}
      >
        <Layout.Header
          className="fixed top-0 left-[200px] right-0 p-0 z-10 shadow-sm shadow-gray-100"
          style={{
            left: space,
            background: colorBgContainer,
            transition: wrapStyle.transition,
            height: wrapStyle.height
          }}
        >
          <LayoutTop isBreak={isBreak} />
        </Layout.Header>
        <Layout.Content className="relative p-6 w-[100%]">
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense
              fallback={
                <Spin
                  spinning={true}
                  className="flex justify-center items-center h-[100%]"
                />
              }
            >
              <LayoutBody>{children}</LayoutBody>
            </Suspense>
          </ErrorBoundary>
        </Layout.Content>
      </Layout>

      <Drawer
        width={wrapStyle.width}
        closeIcon={false}
        placement={'left'}
        open={mobileSideOpen && isBreak}
        onClose={() => setMobileSideOpen(false)}
        bodyStyle={{ background: '#001529', padding: 0 }}
      >
        <LayoutSide logoHeight={wrapStyle.height} />
      </Drawer>
    </Layout>
  )
}

LayoutWrap.propTypes = {
  children: PropTypes.node
}
export default LayoutWrap
