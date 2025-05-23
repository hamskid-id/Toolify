'use client'

import { Text } from '@/components/shared/Text'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export const DateStat = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [currentDateRange, setCurrentDateRange] = useState({
    start: new Date(2023, 6, 1),
    end: new Date(2023, 6, 10),
  })
  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    setIsMounted(true)
    // Simulate loading completion percentage
    setTimeout(() => setCompletionPercentage(80), 100)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleString('default', { month: 'short', day: 'numeric' })
  }

  const navigateDates = (direction) => {
    const daysToAdd = direction === 'next' ? 10 : -10
    setCurrentDateRange({
      start: new Date(
        currentDateRange.start.setDate(
          currentDateRange.start.getDate() + daysToAdd
        )
      ),
      end: new Date(
        currentDateRange.end.setDate(currentDateRange.end.getDate() + daysToAdd)
      ),
    })
  }

  if (!isMounted) return null

  return (
    <div className='border rounded-md px-4 md:py-8 py-4 min-h-[12rem] md:w-auto w-full'>
      <div className='flex flex-col items-center justify-between h-full'>
        <div className='flex justify-between items-start w-full'>
          <button
            onClick={() => navigateDates('prev')}
            className='p-1 hover:bg-gray-100 rounded-full'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <div className='flex flex-col items-center'>
            <Text style='text-md'>
              {`${formatDate(currentDateRange.start)} - ${formatDate(
                currentDateRange.end
              )}`}
            </Text>
            <Text style='text-sm text-[#FF7850] cursor-pointer hover:underline'>
              View all
            </Text>
          </div>
          <button
            onClick={() => navigateDates('next')}
            className='p-1 hover:bg-gray-100 rounded-full'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>

        <div className='relative w-32 h-32 my-4'>
          <svg className='w-full h-full' viewBox='0 0 100 100'>
            <circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='#e0e0e0'
              strokeWidth='4'
            />
            <circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='#FF7850'
              strokeWidth='4'
              strokeLinecap='round'
              strokeDasharray={`${completionPercentage * 2.83}, 283`}
              transform='rotate(-90 50 50)'
            />
          </svg>
          <div className='absolute inset-0 flex items-center justify-center flex-col'>
            <Text style='text-2xl font-semibold'>{completionPercentage}%</Text>
            <Text style='text-xs text-[#8f8f8f]'>completed</Text>
          </div>
        </div>

        <div className='flex flex-col items-center text-center'>
          <Text style='text-md'>You're doing a good job!</Text>
          <Text style='text-md text-[#8f8f8f]'>
            You've almost reached your goal
          </Text>
        </div>
      </div>
    </div>
  )
}
