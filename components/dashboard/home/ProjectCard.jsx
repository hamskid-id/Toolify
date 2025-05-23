'use client'

import AvatarStack from '@/components/shared/AvatarStack'
import { Text } from '@/components/shared/Text'
import UserAvatar from '@/components/shared/UserAvatar'
import { truncateMiddle } from '@/lib/helpers/TruncateText'
import { motion} from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

export const ProjectCard = ({ title, tasks, startDate, dueDate, members,id }) => {
  const router = useRouter()
  return (
    <motion.div
      className='rounded p-4 bg-[ghostWhite] hover:shadow-sm transition-shadow gap-4 flex flex-wrap justify-between items-center cursor-pointer'
      whileHover={{ y: -2 }}
      onClick={()=>router.push(`/dashboard/projects/${id}`)}
    >
      <div className='flex items-center gap-2'>
        <UserAvatar name={title} size={42} />
        <div className='flex flex-col'>
          <Text style='text-md font-[400]'>{truncateMiddle(title)}</Text>
          <Text style='text-xs text-[#8f8f8f]'>{`${tasks?.length} tasks . 4 overdue`}</Text>
        </div>
      </div>
      <div className='gap-8 items-center flex ms-auto'>
        <AvatarStack members={members} size={36} />
        <Text style='text-xs text-[#8f8f8f]'>{`${startDate} - ${dueDate}`}</Text>
      </div>
    </motion.div>
  )
}
