import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import PropTypes from 'prop-types'

import { SortableOverlay } from './SortableList/SortableItem'

export default function Sortable({ children, data, setData, rowKey = 'id' }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setData(items => {
        const oldIndex = items.findIndex(item => item[rowKey] === active.id)
        const newIndex = items.findIndex(item => item[rowKey] === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={data.map(i => i[rowKey])}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
      <SortableOverlay />
    </DndContext>
  )
}

Sortable.propTypes = {
  children: PropTypes.node,
  rowKey: PropTypes.string,
  data: PropTypes.array,
  setData: PropTypes.func
}
