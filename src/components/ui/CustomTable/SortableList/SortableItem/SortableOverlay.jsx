import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'

import PropTypes from '@utils/PropTypes'

const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4'
      }
    }
  })
}

export function SortableOverlay({ children }) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  )
}

SortableOverlay.propTypes = {
  children: PropTypes.node
}
