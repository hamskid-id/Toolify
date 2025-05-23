'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const Avatar = ({
  imageSrc,
  name = '',
  size = 40,
  radius = '50%',
  icon,
  className = '',
  textCount = 2,
  isOnline = false,
  bgColor = 'bg-indigo-100',
  showOnlineMarker = false,
  count,
  fit = 'contain',
}) => {
  const [validImageSrc, setValidImageSrc] = useState(imageSrc)
  const usingValidImage = useRef(true)

  // Check if image fails to load
  useEffect(() => {
    if (!imageSrc) {
      setValidImageSrc(null)
      return
    }

    // Use native browser Image API
    const img = new window.Image() // or document.createElement('img')
    img.onerror = () => {
      setValidImageSrc(null)
      usingValidImage.current = false
    }
    img.onload = () => {
      setValidImageSrc(imageSrc)
      usingValidImage.current = true
    }
    img.src = imageSrc
  }, [imageSrc])

  // Get initials from name
  const getInitials = () => {
    if (!name) return ''
    return name
      .trim()
      .split(' ')
      .slice(0, textCount)
      .map((part) => part[0]?.toUpperCase())
      .join('')
  }

  return (
    <div
      className={`
        relative flex-shrink-0 flex items-center justify-center 
        uppercase font-semibold
        ${!validImageSrc && !count ? bgColor : ''}
        ${className}
        ${!count &&'font-[poppins] text-xl '}
      `}
      style={{
        width: size,
        height: size,
        borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      }}
    >
      {/* Show image if available */}
      {validImageSrc && !count ? (
        <Image
          src={validImageSrc}
          alt={name || 'Avatar'}
          fill
          className={`object-${fit}`}
          style={{
            borderRadius: 'inherit',
          }}
          draggable={false}
          onError={() => setValidImageSrc(null)}
        />
      ) : count ? (
        // Show "+count" if count is provided
        <span className="bg-clip-text text-indigo-600">
          +{count}
        </span>
      ) : (
        // Fallback to initials
        <span className="text-lg bg-clip-text text-indigo-600">
          {getInitials()}
        </span>
      )}

      {/* Online/offline indicator */}
      {showOnlineMarker && (
        <div
          className={`
            absolute w-3 h-3 rounded-full border-2 border-white
            ${radius === '50%' ? 'bottom-0 right-0' : '-bottom-1 -right-1'}
            ${isOnline ? 'bg-green-500' : 'bg-gray-500'}
            transition-all duration-200
          `}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

export default React.memo(Avatar)