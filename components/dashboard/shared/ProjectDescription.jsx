'use client'

import AvatarStack from '@/components/shared/AvatarStack'
import { Text } from '@/components/shared/Text'
import { ChevronRight, Maximize2 } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { motion } from 'framer-motion'
import { Badge } from '@/components/shared/Badge'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'

export const ProjectDescription = ({ project }) => {
  const router = useRouter()

  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    setTimeout(() => setCompletionPercentage(80), 100)
  }, [])
  return (
    <div className='md:flex hidden flex-col bg-white p-6 rounded-md min-h-fit'>
      {/* Project Header */}
      <div className='flex justify-between items-start mb-6'>
        <div>
          <Text style='text-2xl font-medium mb-1'>{project?.title}</Text>
        </div>
        <button
          onClick={() => router.push(`/dashboard/projects/${project.id}`)}
          className='p-2 hover:bg-gray-100 rounded-full'
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Project Metadata Grid */}
      <div className='grid grid-cols-1 gap-3 mb-8'>
        <div className='space-y-4'>
          <DetailItem label='Client' value={project?.owner} />
          <DetailItem label='Start Date' value={project?.startDate} />
          <DetailItem label='Target Date' value={project?.dueDate} />
          <DetailItem
            label='Status'
            value={<Badge title={project?.status} className='w-fit' />}
          />
        </div>
        <div className='space-y-4'>
          <DetailItem label='Team Lead' value={project?.teamLead} />
          <DetailItem
            label='Team Members'
            value={<AvatarStack members={project?.members} size={32} />}
          />
        </div>
      </div>

      {/* Project Description */}
      <div className='mb-8'>
        <Text style='text-lg font-medium mb-2'>Project Overview</Text>
        <Text style='text-gray-600 leading-relaxed'>
          {project?.description}
        </Text>
      </div>

      {/* Tasks Section */}
      <div className='border-t pt-6'>
        <div className='flex justify-between items-center mb-6'>
          <Text style='text-xl font-medium'>Current Tasks</Text>
          <button className='flex items-center text-[#FF7850] hover:text-[#e56a3e] transition-colors'>
            <Text
              style='text-sm font-medium'
              onClick={() => router.push(`/dashboard/project/${project.id}`)}
            >
              View all
            </Text>
            <ChevronRight size={18} className='ml-1' />
          </button>
        </div>

        <motion.div
          className='space-y-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {project?.tasks?.map((task, index) => (
            <TaskCard
              key={task.id}
              id={`${task.id}${index}`}
              title={task.title}
              description={task.description}
              startDate={task.startDate}
              dueDate={task.dueDate}
              priorities={task.priority}
              status={task.status}
              members={task.members}
              taskId={'ID-XK92M'}
            />
          ))}
        </motion.div>

        <div className='flex justify-between items-center mt-6'>
          <Text style='text-xl font-medium'>Progress</Text>
        </div>
        <div className='flex items-center gap-4 w-full'>
          <svg
            className='w-full h-[7px]'
            viewBox='0 0 100 10'
            preserveAspectRatio='none'
          >
            <rect x='0' y='0' width='100' height='100' fill='#e0e0e0' />
            <rect
              x='0'
              y='0'
              width={completionPercentage}
              height='100'
              fill='#FF7850'
            />
          </svg>
          <Text style='text-lg font-semibold'>{completionPercentage}%</Text>
        </div>
      </div>
    </div>
  )
}

const DetailItem = ({ label, value }) => (
  <div className='flex'>
    <Text style='text-sm text-gray-500 w-28'>{label}</Text>
    <div className='flex-1'>
      {typeof value === 'string' ? (
        <Text style='text-sm font-medium'>{value}</Text>
      ) : (
        value
      )}
    </div>
  </div>
)
