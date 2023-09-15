import { createContext, useContext, useMemo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import PropTypes from '@utils/PropTypes'

const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref() {}
})

export function SortableItem({ children, id }) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  }

  SortableItem.propTypes = {
    children: PropTypes.node,
    id: PropTypes.number
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li
        className="w-full flex flex-row items-center gap-2 border-gray-200 rounded p-2 border-solid border"
        ref={setNodeRef}
        style={style}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)
  return (
    <span
      className="flex items-center cursor-grab"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <svg
        viewBox="0 0 20 20"
        width="12"
      >
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </span>
  )
}
