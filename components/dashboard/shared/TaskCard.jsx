'use client'

import AvatarStack from '@/components/shared/AvatarStack'
import { Text } from '@/components/shared/Text'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'

export const TaskCard = ({
  title,
  startDate,
  dueDate,
  members,
  taskId,
  onClick,
  isSelected,
}) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const handleClickAction = () =>
    onClick && !isMobile ? onClick() : router.push(`/dashboard/tasks/${taskId}`)

  return (
    <motion.div
      className={cn(
        'rounded p-4 bg-[ghostWhite] shadow hover:shadow-sm transition-shadow gap-4 flex flex-wrap justify-between items-center cursor-pointer',
        isSelected && 'bg-[ghostWhite]',
        !isSelected && 'border border-gray-300'
      )}
      whileHover={{ y: -2 }}
      onClick={handleClickAction}
    >
      <div className='flex items-center gap-2'>
        <div className='flex flex-col'>
          <Text style='text-xs text-[#8f8f8f]'>{taskId}</Text>
          <Text style='text-md font-[400]'>{title}</Text>
        </div>
      </div>
      <div className='gap-8 items-center flex ms-auto'>
        <AvatarStack members={members} size={36} />
        <Text style='text-xs text-[#8f8f8f]'>{`${startDate} - ${dueDate}`}</Text>
        <ChevronRight className='text-[#8f8f8f] w-5 h-5' />
      </div>
    </motion.div>
  )
}
