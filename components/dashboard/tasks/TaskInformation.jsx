'use client'

import Link from 'next/link'
import DashboardLayout from '../layout'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Text } from '@/components/shared/Text'
import { TasksDescription } from '../shared/TaskDescription'
import { PRIORITY, STATUS } from '@/lib/constants'
import { TaskInformationSection } from './TaskInformationSection'
import { useState, useRef, useEffect } from 'react'

export const TaskInformation = () => {
  const [status, setStatus] = useState(STATUS.TODO)
  const [priority, setPriority] = useState(PRIORITY.URGENT)

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false)

  const statusRef = useRef(null)
  const priorityRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusDropdownOpen(false)
      }
      if (priorityRef.current && !priorityRef.current.contains(event.target)) {
        setPriorityDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Status color mapping
  const statusColors = {
    [STATUS.TODO]: 'bg-gray-400',
    [STATUS.IN_PROGRESS]: 'bg-blue-400',
    [STATUS.REVIEW]: 'bg-yellow-400',
    [STATUS.DONE]: 'bg-green-400',
  }

  // Priority color mapping
  const priorityColors = {
    [PRIORITY.LOW]: 'bg-blue-400',
    [PRIORITY.MEDIUM]: 'bg-yellow-400',
    [PRIORITY.HIGH]: 'bg-orange-500',
    [PRIORITY.URGENT]: 'bg-red-500',
  }

  // Status display mapping
  const statusDisplay = {
    [STATUS.TODO]: 'To Do',
    [STATUS.IN_PROGRESS]: 'In Progress',
    [STATUS.REVIEW]: 'Review',
    [STATUS.DONE]: 'Done',
  }

  // Priority display mapping
  const priorityDisplay = {
    [PRIORITY.LOW]: 'Low',
    [PRIORITY.MEDIUM]: 'Medium',
    [PRIORITY.HIGH]: 'High',
    [PRIORITY.URGENT]: 'Urgent',
  }

  return (
    <DashboardLayout>
      <div className='bg-[ghostWhite] py-6 px-4 md:px-8'>
        {/* Breadcrumb */}
        <div className='flex items-center text-sm text-gray-500'>
          <Link href='/dashboard' className='hover:text-gray-700'>
            Home
          </Link>
          <ChevronRight className='w-4 h-4 mx-1' />
          <Text>Task</Text>
          <ChevronRight className='w-4 h-4 mx-1' />
          <Text>Task name</Text>
        </div>

        {/* Page Header */}
        <div className='flex justify-between items-center mt-4 mb-6 flex-wrap gap-4'>
          <Text as='h1' style='text-2xl font-semibold text-gray-800'>
            Luminou gruop
          </Text>
          <div className='flex gap-4 ms-auto'>
            {/* Status Dropdown */}
            <div className='relative'>
              <button
                className='flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs w-[110px] justify-between'
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                <div className='flex items-center gap-2'>
                  <div
                    className={`w-2 h-2 rounded-full ${statusColors[status]}`}
                  ></div>
                  <span>{statusDisplay[status]}</span>
                </div>
                <ChevronDown className='w-4 h-4' />
              </button>

              {statusDropdownOpen && (
                <div className='absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-[110px]'>
                  {Object.keys(STATUS).map((key) => (
                    <button
                      key={key}
                      className='flex items-center gap-2 w-full text-left px-3 py-2 text-xs hover:bg-gray-100'
                      onClick={() => {
                        setStatus(STATUS[key])
                        setStatusDropdownOpen(false)
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          statusColors[STATUS[key]]
                        }`}
                      ></div>
                      <span>{statusDisplay[STATUS[key]]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Priority Dropdown */}

            <div className='relative'>
              <button
                className='flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs w-[110px] justify-between'
                onClick={() => setPriorityDropdownOpen(!priorityDropdownOpen)}
              >
                <div className='flex items-center gap-2'>
                  <div
                    className={`w-2 h-2 rounded-full ${priorityColors[priority]}`}
                  ></div>
                  <span>{priorityDisplay[priority]}</span>
                </div>
                <ChevronDown className='w-4 h-4' />
              </button>

              {priorityDropdownOpen && (
                <div className='absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-[110px]'>
                  {Object.keys(PRIORITY).map((key) => (
                    <button
                      key={key}
                      className='flex items-center gap-2 w-full text-left px-3 py-2 text-xs hover:bg-gray-100'
                      onClick={() => {
                        setPriority(PRIORITY[key])
                        setPriorityDropdownOpen(false)
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          priorityColors[PRIORITY[key]]
                        }`}
                      ></div>
                      <span>{priorityDisplay[PRIORITY[key]]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
          <div>
            {/* Information Section */}
            <TaskInformationSection
              task={{
                id: 'ID-XK92M',
                title: 'Reports Animation',
                owner: 'Luminous Group',
                status: status,
                priority: priority,
                description:
                  'Complete redesign of the mobile application including new UI components, improved user flows, and dark mode implementation.',
                startDate: 'July 1',
                teamLead: 'Sarah Williams',
                dueDate: 'August 12',
                members: [
                  { id: 1, name: 'John Doe', image: '/john.jpg' },
                  { id: 2, name: 'Jane Smith', image: '/jane.jpg' },
                  { id: 3, name: 'Mike Johnson' },
                  { id: 4, name: 'Sarah Williams', image: '/sarah.jpg' },
                  { id: 5, name: 'Alex Chen' },
                ],
                assignees: [
                  {
                    id: 1,
                    name: 'Sarah Williams',
                    role: 'Lead Designer',
                    image: '/sarah.jpg',
                  },
                  {
                    id: 2,
                    name: 'Alex Chen',
                    role: 'Frontend Developer',
                    image: '/alex.jpg',
                  },
                  {
                    id: 3,
                    name: 'Jamie Lopez',
                    role: 'UX Researcher',
                    image: '/jamie.jpg',
                  },
                ],
              }}
            />
          </div>

          {/* Task Details Panel */}
          <div className='lg:col-span-1'>
            <TasksDescription
              tasks={{
                id: 'ID-XK92M',
                title: 'Reports Animation',
                owner: 'Luminous Group',
                status: status,
                priority: priority,
                description:
                  'Complete redesign of the mobile application including new UI components, improved user flows, and dark mode implementation.',
                startDate: 'July 1',
                teamLead: 'Sarah Williams',
                dueDate: 'August 12',
                members: [
                  { id: 1, name: 'John Doe', image: '/john.jpg' },
                  { id: 2, name: 'Jane Smith', image: '/jane.jpg' },
                  { id: 3, name: 'Mike Johnson' },
                  { id: 4, name: 'Sarah Williams', image: '/sarah.jpg' },
                  { id: 5, name: 'Alex Chen' },
                ],
                assignees: [
                  {
                    id: 1,
                    name: 'Sarah Williams',
                    role: 'Lead Designer',
                    image: '/sarah.jpg',
                  },
                  {
                    id: 2,
                    name: 'Alex Chen',
                    role: 'Frontend Developer',
                    image: '/alex.jpg',
                  },
                  {
                    id: 3,
                    name: 'Jamie Lopez',
                    role: 'UX Researcher',
                    image: '/jamie.jpg',
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
