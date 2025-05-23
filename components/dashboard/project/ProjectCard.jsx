'use client'

import { Badge } from '@/components/shared/Badge'
import { Text } from '@/components/shared/Text'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

export const ProjectCard = ({
  title,
  owner,
  status,
  startDate,
  dueDate,
  id,
  onClick,
  isSelected,
}) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const handleClickAction = () =>
    onClick && !isMobile ? onClick() : router.push(`/dashboard/projects/${id}`)
    
  return (
    <motion.div
      className={cn(
        'rounded p-4 bg-white hover:bg-[ghostWhite] gap-1 flex flex-col justify-between',
        isSelected && 'bg-[ghostWhite]',
        !isSelected && 'border'
      )}
      whileHover={{ y: -2 }}
      onClick={handleClickAction}
    >
      <div className='flex items-center justify-between text-[#8f8f8f]'>
        <Text style='text-sm'>{owner}</Text>
        <Text style='text-xs'>{id}</Text>
      </div>
      <Text style='text-lg font-[400]'>{title}</Text>
      <div className='flex items-center justify-between text-[#8f8f8f]'>
        <Text style='text-xs text-[#8f8f8f]'>{`${startDate} - ${dueDate}`}</Text>
        <Badge title={status} />
      </div>
    </motion.div>
  )
}
