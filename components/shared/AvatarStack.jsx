'use client'
import React from 'react'
import UserAvatar from './UserAvatar'

const AvatarStack = ({ members = [], maxDisplay = 1, size = 40 }) => {
  // Ensure we don't exceed maxDisplay + 1 (for the count)
  const visibleMembers = members.slice(0, maxDisplay)
  const hiddenCount = members.length - maxDisplay

  return (
    <div className='flex items-center'>
      <div className='flex -space-x-3'>
        {' '}
        {/* Negative margin for overlap */}
        {visibleMembers.map((member, index) => (
          <div
            key={member.id || index}
            className='relative transition-all hover:-translate-y-1'
            style={{
              zIndex: visibleMembers.length + index, // Ensure proper stacking order
            }}
          >
            <UserAvatar
              imageSrc={member.image}
              name={member.name}
              size={size}
              showOnlineMarker={member.isOnline}
            />
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className='relative transition-all hover:-translate-y-1'
            style={{
              zIndex: 100, // Place behind other avatars
            }}
          >
            <UserAvatar
              count={hiddenCount}
              size={size}
              className='bg-gray-100 border-2 border-white'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AvatarStack
