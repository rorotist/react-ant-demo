import { Child1 } from '@pages/Guide/TabGuide/Child1'
import { Child2 } from '@pages/Guide/TabGuide/Child2'
import Parent from '@pages/Guide/TabGuide/Parent'

export const routesGuide = {
  path: 'guide',
  handle: { title: '가이드', icon: 'IconBuildingLighthouse' },
  children: [
    {
      index: true,
      path: 'table',
      handle: { title: '테이블' },
      async lazy() {
        const { TableGuide } = await import('@pages/Guide/TableGuide')
        return { Component: TableGuide }
      }
    },
    {
      path: 'form',
      handle: { title: '폼 그리드' },
      async lazy() {
        let { FormGuide } = await import('@pages/Guide/FormGuide')
        return { Component: FormGuide }
      }
    },
    {
      path: 'query',
      handle: { title: 'query' },
      async lazy() {
        const { QueryGuide } = await import('@pages/Guide/QueryGuide')
        return { Component: QueryGuide }
      }
    },
    {
      path: 'editor',
      handle: { title: '에디터' },
      async lazy() {
        const { EditorGuide } = await import('@pages/Guide/EditorGuide')
        return { Component: EditorGuide }
      }
    },
    {
      path: 'parent/:id?',
      element: <Parent />,
      handle: {
        root: true
      },
      children: [
        {
          index: true,
          path: 'child1',
          element: <Child1 />
        },
        {
          path: 'child2',
          element: <Child2 />
        }
      ]
    }
  ]
}
