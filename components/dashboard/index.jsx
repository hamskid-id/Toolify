'use client'

import {
  Clock,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Ellipsis,
} from 'lucide-react'
import DasboardLayout from './layout'
import { Text } from '../shared/Text'
import { motion } from 'framer-motion'
import { TaskCard } from './home/Taskcard'
import { StatCard } from './home/StatCard'
import { Statistics } from './home/Statistics'
import { DateStat } from './home/DateStat'
import { ProjectCard } from './home/ProjectCard'
import { ModalWrapper } from '../custom-ui/Modal'
import { useState } from 'react'
import { AddProjectForm } from './project/AddProjectForm'

export const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  return (
    <DasboardLayout>
      <div className='space-y-6 bg-[ghostWhite] py-6 px-4'>
        <div className='flex flex-wrap justify-between items-start mb-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <Text style='font-[600] text-[18px] leading-[24px]'>
              Hi Nazeer, what would you like to do today?
            </Text>
            <Text style='text-[12px] font-[500] leading-[100%]'>
              Last login:
              <span className='font-[400] ms-2'>26/11/2024 14:39:58</span>
            </Text>
          </div>
          <div
            onClick={handleOpenModal}
            className='bg-white md:hidden block fixed bottom-8 right-4 border-dotted border-[#FF7850] border-2 py-2 rounded-md flex items-center justify-center text-center text-sm text-[#FF7850] w-fit px-4 cursor-pointer ms-auto'
          >
            <Text>+ Create Project</Text>
          </div>
          <div
            onClick={handleOpenModal}
            className='bg-white md:block hidden border-dotted border-[#FF7850] border-2 py-2 rounded-md flex items-center justify-center text-center text-sm text-[#FF7850] w-fit px-4 cursor-pointer ms-auto'
          >
            <Text>+ Create Project</Text>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          <StatCard title='Hours this week' amount='32/hrs' icon={Clock} />
          <StatCard title='Project Completed' amount='78%' icon={CheckCircle} />
          <StatCard title='Tasks overdue' amount='3%' icon={AlertTriangle} />
          <StatCard title='New Assigned' amount='4 tasks' icon={PlusCircle} />
        </div>
      </div>

      <div className='grid md:grid-cols-3 grid-cols-1 gap-6 p-4'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <Text style='text-lg font-medium'>My Tasks</Text>
            <div className='flex items-center gap-2'>
              <Text style='text-sm text-[#FF7850] cursor-pointer hover:underline'>
                View all
              </Text>
              <button className='p-1 text-gray-500 hover:text-gray-700'>
                <Ellipsis size={18} />
              </button>
            </div>
          </div>

          <motion.div
            className='space-y-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TaskCard
              id='ID-ZI14B'
              taskId='ID-YL83N'
              title='Reports Animation'
              description='Create a report animations to demonstrate the quarterly results with interactive charts and transitions that highlight key metrics.'
              startDate='July 1'
              dueDate='August 12'
              priorities='urgent'
              members={[
                { id: 1, name: 'John Doe', image: '/john.jpg' },
                { id: 2, name: 'Jane Smith', image: '/jane.jpg' },
                { id: 3, name: 'Mike Johnson' },
                { id: 4, name: 'Sarah Williams', image: '/sarah.jpg' },
                { id: 5, name: 'Alex Chen' },
              ]}
            />
            <TaskCard
              id='ID-XK92M'
              taskId='ID-XK92M'
              title='UI Redesign'
              description='Redesign the user interface for the dashboard to improve usability and incorporate the new design system components.'
              startDate='July 15'
              dueDate='August 5'
              priorities='high'
              members={[
                { id: 1, name: 'John Doe', image: '/john.jpg' },
                { id: 2, name: 'Emma Watson' },
              ]}
            />
          </motion.div>
        </div>
        <div className='md:col-span-2'>
          <div className='flex flex-wrap gap-4 w-full justify-between'>
            <Statistics />
            <DateStat />
          </div>
          <div className='space-y-4 mt-4'>
            <div className='flex justify-between items-center'>
              <Text style='text-lg font-medium'>My Projects</Text>
              <div className='flex items-center gap-2'>
                <Text style='text-sm text-[#FF7850] cursor-pointer hover:underline'>
                  View all
                </Text>
                <button className='p-1 text-gray-500 hover:text-gray-700'>
                  <Ellipsis size={18} />
                </button>
              </div>
            </div>

            <motion.div
              className='space-y-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ProjectCard
                title='Reports Animation'
                startDate='July 1'
                dueDate='August 12'
                tasks={['task1', 'task2', 'task3']}
                id={1}
                members={[
                  { id: 1, name: 'John Doe', image: '/john.jpg' },
                  { id: 2, name: 'Jane Smith', image: '/jane.jpg' },
                  { id: 3, name: 'Mike Johnson' },
                  { id: 4, name: 'Sarah Williams', image: '/sarah.jpg' },
                  { id: 5, name: 'Alex Chen' },
                ]}
              />
              <ProjectCard
                title='UI Redesign'
                startDate='July 15'
                id={2}
                dueDate='August 5'
                tasks={['task1', 'task2', 'task3']}
                members={[
                  { id: 1, name: 'John Doe', image: '/john.jpg' },
                  { id: 2, name: 'Emma Watson' },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <ModalWrapper
        title='Create New Project'
        open={openModal}
        setOpen={setOpenModal}
      >
        <AddProjectForm onClose={() => setOpenModal(false)} />
      </ModalWrapper>
    </DasboardLayout>
  )
}
