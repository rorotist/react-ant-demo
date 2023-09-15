import { Children, cloneElement } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconGripVertical } from '@tabler/icons-react'

import PropTypes from '@utils/PropTypes'

export default function SortableRow({ children, ...props }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    // eslint-disable-next-line react/prop-types
    id: props['data-row-key']
  })

  const style = {
    // eslint-disable-next-line react/prop-types
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999
        }
      : {})
  }

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {Children.map(children, child => {
        if (child.key === 'sort') {
          return cloneElement(child, {
            children: (
              <span
                {...listeners}
                ref={setActivatorNodeRef}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  touchAction: 'none',
                  cursor: 'move'
                }}
              >
                <IconGripVertical
                  width={16}
                  height={16}
                  className="relative top-1"
                />
              </span>
            )
          })
        }
        return child
      })}
    </tr>
  )
}

SortableRow.propTypes = {
  children: PropTypes.node
}
