'use client'

import { ChevronDown, Maximize2 } from 'lucide-react'
import { Text } from '@/components/shared/Text'
import { Badge } from '@/components/shared/Badge'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AvatarStack from '@/components/shared/AvatarStack'
import { useRouter } from 'nextjs-toploader/app'

export const TaskCard = ({
  id,
  title,
  description,
  startDate,
  dueDate,
  priorities,
  members,
  taskId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleNavigate = (e) => {
    e.stopPropagation()
    router.push(`/dashboard/tasks/${taskId}`)
  }

  return (
    <motion.div
      className='rounded-md border mb-3 overflow-hidden'
      initial={false}
      animate={{
        backgroundColor: isExpanded ? '#000000' : 'ghostWhite',
        color: isExpanded ? 'white' : 'inherit',
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      {/* Header - Clickable area */}
      <div
        className='p-4 cursor-pointer'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className='flex justify-between items-start'>
          <div>
            <Text
              style={`text-xs ${
                isExpanded ? 'text-gray-400' : 'text-[#8f8f8f]'
              }`}
            >
              {id}
            </Text>
            <Text
              style={`text-md font-[400] mt-1 ${
                isExpanded ? 'text-white' : ''
              }`}
            >
              {title}
            </Text>
          </div>
          <Badge
            title={priorities}
            className={isExpanded ? 'bg-gray-800 text-white' : ''}
          />
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: 'easeOut' },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: 'easeIn' },
                opacity: { duration: 0.1 },
              },
            }}
            className='overflow-hidden'
          >
            <div className='px-4 pb-4'>
              <Text style='text-sm text-gray-300 mb-3'>{description}</Text>

              <div className='flex justify-between items-center mt-4'>
                <AvatarStack members={members} size={36} />

                <div className='flex items-center gap-3'>
                  <Text style='text-xs text-gray-400'>
                    {`${startDate} - ${dueDate}`}
                  </Text>

                  <motion.button
                    onClick={handleNavigate}
                    className='p-1 text-gray-400 hover:text-white transition-colors'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Maximize2 size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse button - Only visible when expanded */}
      {isExpanded && (
        <div className='flex justify-end px-4 pb-2'>
          <motion.button
            onClick={() => setIsExpanded(false)}
            className='p-1 text-gray-400 hover:text-white transition-colors'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown size={18} />
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}
