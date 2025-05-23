'use client'

import { useDroppable } from '@dnd-kit/core'

export const DropZone = ({ status, isEmpty }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${status}`,
    data: {
      status: status,
      type: 'dropzone',
    },
  })

  return (
    <div
      ref={setNodeRef}
      data-status={status}
      className={`border-2 border-dashed ${
        isEmpty ? 'border-blue-300 min-h-[120px]' : 'border-gray-200'
      } ${isOver ? 'bg-blue-50 border-[#FF7850]' : 'bg-transparent'} 
          rounded-lg p-4 text-center transition-colors`}
    >
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <p>Drop task here</p>
          <p className='text-sm mt-1'>to move to {status}</p>
        </div>
      ) : (
        <p className='text-xs'>Drop here for {status}</p>
      )}
    </div>
  )
}
