import { useState } from 'react'

import { CustomTree } from '@components/ui/CustomTree/index'

export function TreeGuide() {
  const [data] = useState([
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              isLeaf: true
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
              isLeaf: true
            }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'ckckck',
              key: '0-0-1-0'
            }
          ]
        }
      ]
    },
    {
      title: 'parent 2',
      key: '1-0',
      children: [
        {
          title: 'parent 2-0',
          key: '1-0-0'
        }
      ]
    }
  ])

  return <CustomTree data={data} />
}
