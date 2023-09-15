import { useMemo } from 'react'
import { useMatches } from 'react-router-dom'
import { IconHome2 } from '@tabler/icons-react'
import { Breadcrumb, Typography } from 'antd'
import PropTypes from 'prop-types'

export default function LayoutBody({ children }) {
  const matches = useMatches()
  const matchWithTitle = matches.filter(match => Boolean(match.handle?.title))

  const breadcrumbs = matchWithTitle.map(match => {
    const title = match.handle?.title
    return {
      title:
        title === 'Home' ? (
          <div className={'h-[22px] inline-flex justify-center items-center'}>
            <IconHome2 size={16} />
          </div>
        ) : (
          match.handle?.title
        ),
      href: match.pathname
    }
  })
  const pageTitle = useMemo(() => {
    const parentWithTabs = matches.find(match => match.handle?.tabs)
    const currentWithTabHide = matches.find(match => match.handle?.tabHide)

    if (parentWithTabs && !currentWithTabHide) {
      return parentWithTabs.handle?.title
    }

    const current = matchWithTitle[matchWithTitle.length - 1].handle
    return current.title
  }, [matches])
  return (
    <div className="flex flex-col min-h-[100%]">
      {pageTitle ? (
        <>
          <Typography.Title
            level={3}
            className={'m-0'}
          >
            {pageTitle}
          </Typography.Title>
        </>
      ) : null}
      <Breadcrumb
        separator={'/'}
        items={breadcrumbs}
        className={'mt-1 mb-4'}
      />

      <div className={'flex-1 content-body flex flex-col'}>{children}</div>

      {/*<FloatButton.BackTop className={'right-2.5 bottom-3'} />*/}
    </div>
  )
}

LayoutBody.propTypes = {
  children: PropTypes.node
}
