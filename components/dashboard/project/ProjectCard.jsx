'use client'

import AvatarStack from '@/components/shared/AvatarStack'
import { Text } from '@/components/shared/Text'
import { useIsMobile } from '@/hooks/use-mobile'
import { truncateMiddle } from '@/lib/helpers/TruncateText'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

export const ProjectCard = ({
  owner,
  tasks,
  startDate,
  dueDate,
  id,
  members,
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
        'rounded-md p-4 bg-white hover:bg-[ghostWhite] gap-1 flex items-center justify-between',
        isSelected && 'bg-[ghostWhite]',
        !isSelected && 'border'
      )}
      whileHover={{ y: -2 }}
      onClick={handleClickAction}
    >
      <div className='flex items-center gap-2'>
        <div className='flex flex-col'>
          <Text style='text-md font-[400]'>{owner}</Text>
          <Text style='text-xs text-[#8f8f8f]'>{`${tasks?.length} tasks . 4 overdue`}</Text>
        </div>
      </div>
      <div className='gap-8 items-center flex ms-auto'>
        <div className='md:block hidden'>
          <AvatarStack members={members} size={36} />
        </div>
        <Text style='text-xs text-[#8f8f8f]'>{`${startDate} - ${dueDate}`}</Text>
      </div>
    </motion.div>
  )
}
