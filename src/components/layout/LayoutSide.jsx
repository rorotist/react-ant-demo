import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '@components/ui/Logo'
import * as allIcons from '@tabler/icons-react'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import routesData from '@/routes/menu'

const iconRoot = icon => {
  const IconToBeUsed = allIcons[icon]
  return <IconToBeUsed size="1rem" />
}
const menuFilter = menus => {
  return menus.filter(
    match =>
      match?.handle && Boolean(match.handle?.title) && !match.handle?.menuHide
  )
}

function LayoutSide({ logoHeight, collapsed = false }) {
  const navigate = useNavigate()
  let { pathname: currentPath } = useLocation()

  const [openKeys, setOpenKeys] = useState([])

  const renderMenuTreeView = (tree, parentPath = '', step, selectKeys = []) => {
    return tree.map((item, idx) => {
      const { children, handle, path } = item
      const subMenu = children && menuFilter(children)
      const fullPath = `${parentPath}/${path}`
      const isParent = subMenu?.length > 0

      const key = isParent
        ? `${step}-${idx}`
        : `${fullPath}${isParent ? `/${subMenu[0].path}` : ''}`

      if (!isParent && currentPath.includes(fullPath)) {
        setOpenKeys([...selectKeys, key])
      }

      return {
        key,
        label: handle && handle.title,
        icon: handle && handle.icon && iconRoot(handle.icon),
        children: isParent
          ? renderMenuTreeView(subMenu, fullPath, step + 1, [
              ...selectKeys,
              key
            ])
          : null
      }
    })
  }

  const items = useMemo(() => {
    return renderMenuTreeView(menuFilter(routesData), '', 1, [])
  }, [currentPath])

  const onClick = data => {
    setOpenKeys(data.keyPath)
    navigate(data.key)
  }

  return (
    <>
      <div
        className={'flex justify-center items-center z-10'}
        style={{ height: logoHeight }}
      >
        <Logo
          isShort={collapsed}
          fill={'white'}
        />
      </div>
      <Menu
        theme="dark"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={openKeys}
        onClick={onClick}
        mode="inline"
        items={items}
      />
    </>
  )
}

LayoutSide.propTypes = {
  logoHeight: PropTypes.number,
  collapsed: PropTypes.bool
}

export default LayoutSide
