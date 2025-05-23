'use client'

import { CSS } from '@dnd-kit/utilities'
import { TaskCard } from '../shared/TaskCard'
import { useSortable } from '@dnd-kit/sortable'

export function SortableTaskCard(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    data: {
      status: props.status,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard {...props} />
    </div>
  )
}