'use client'

import { Text } from '@/components/shared/Text'

export const StatCard = ({ title, amount, icon }) => {
  const IconComponent = icon
  const [number, unit] = amount.split(/(?=\D)/)

  return (
    <div className='bg-white rounded-sm p-4 border'>
      <div className='flex justify-between items-end'>
        <div>
          <Text style='text-sm text-gray-500 dark:text-gray-400'>{title}</Text>
          <div className='flex items-baseline gap-1 mt-2'>
            <span className={`text-3xl font-medium text-black dark:text-white`}>
              {number}
            </span>
            {unit && <span className='text-sm text-gray-500'>{unit}</span>}
          </div>
        </div>
        <div className={`p-2 rounded-lg mb-1 text-black border`}>
          <IconComponent className='w-4 h-4' />
        </div>
      </div>
    </div>
  )
}
