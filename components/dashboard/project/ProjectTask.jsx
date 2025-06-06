'use client'

import Link from 'next/link'
import DashboardLayout from '../layout'
import { ChevronRight, Layout, ListFilter, Users } from 'lucide-react'
import { Text } from '@/components/shared/Text'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TasksDescription } from '../shared/TaskDescription'
import {
  DndContext,
  closestCenter,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
} from '@dnd-kit/modifiers'
import { TaskCard } from '../shared/TaskCard'
import { DropZone } from '../tasks/Dropzone'
import { PRIORITY, STATUS } from '@/lib/constants'
import { SortableTaskCard } from '../tasks/SortableTaskCard'
import { ModalWrapper } from '@/components/custom-ui/Modal'
import { AddTaskForm } from '../tasks/AddTaskForm'
import { MembersTab } from './MembersTab' // Import the new MembersTab component

const viewTypes = [
  { id: 'list', label: 'List', icon: ListFilter },
  { id: 'board', label: 'Board', icon: Layout },
  { id: 'members', label: 'Members', icon: Users } // Add the new Members tab
]

const statusGroups = [
  { title: 'To do', value: STATUS.TODO },
  { title: 'In progress', value: STATUS.IN_PROGRESS },
  { title: 'Backlog', value: STATUS.BACKLOG },
  { title: 'Done', value: STATUS.DONE },
]

const sampleTasks = [
  // Task data remains the same
  {
    id: 'ID-XK92M',
    title: 'Reports Animation',
    owner: 'Luminous Group',
    status: STATUS.TODO,
    priority: PRIORITY.URGENT,
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
  },
  {
    id: 'ID-YL83N',
    teamLead: 'Sarah Williams',
    title: 'UI Redesign',
    owner: 'Fashion Group',
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.LOW,
    startDate: 'July 15',
    description:
      'Complete redesign of the mobile application including new UI components, improved user flows, and dark mode implementation.',
    dueDate: 'August 5',
    members: [
      { id: 1, name: 'John Doe', image: '/john.jpg' },
      { id: 2, name: 'Emma Watson' },
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
  },
  {
    id: 'ID-ZM94O',
    title: 'API Integration',
    owner: 'Tech Corp',
    status: STATUS.BACKLOG,
    priority: PRIORITY.MEDIUM,
    description:
      'Integrate with third-party API services for payment processing.',
    startDate: 'August 1',
    teamLead: 'Mike Johnson',
    dueDate: 'August 20',
    members: [
      { id: 1, name: 'Alex Chen', image: '/alex.jpg' },
      { id: 2, name: 'Jamie Lopez', image: '/jamie.jpg' },
    ],
    assignees: [
      {
        id: 1,
        name: 'Mike Johnson',
        role: 'Backend Developer',
        image: '/mike.jpg',
      },
    ],
  },
  {
    id: 'ID-AN05P',
    title: 'User Testing',
    owner: 'UX Team',
    status: STATUS.DONE,
    priority: PRIORITY.MEDIUM,
    description: 'Conduct user testing sessions and compile results.',
    startDate: 'June 10',
    teamLead: 'Jamie Lopez',
    dueDate: 'June 30',
    members: [
      { id: 1, name: 'Jamie Lopez', image: '/jamie.jpg' },
      { id: 2, name: 'Sarah Williams', image: '/sarah.jpg' },
    ],
    assignees: [
      {
        id: 1,
        name: 'Jamie Lopez',
        role: 'UX Researcher',
        image: '/jamie.jpg',
      },
    ],
  },
]

export const ProjectTasks = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const [activeView, setActiveView] = useState('list')
  const [selectedTask, setSelectedTask] = useState(sampleTasks[0])
  const [tasks, setTasks] = useState(sampleTasks)
  const [activeTask, setActiveTask] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  )

  // Improved handleDragEnd function
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || !active) {
      setActiveTask(null)
      return
    }

    const activeTaskId = active.id

    if (over.data.current?.type === 'dropzone') {
      const newStatus = over.data.current.status
      console.log(`Moving task to status via dropzone: ${newStatus}`)

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === activeTaskId ? { ...task, status: newStatus } : task
        )
      )

      setActiveTask(null)
      return
    }

    let targetStatus = over.data?.current?.status

    if (!targetStatus) {
      const overElement = document.getElementById(over.id)
      targetStatus =
        overElement?.dataset?.status ||
        overElement?.closest('[data-status]')?.dataset?.status
    }

    if (targetStatus) {
      console.log(`Moving task to status via container: ${targetStatus}`)

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === activeTaskId ? { ...task, status: targetStatus } : task
        )
      )

      if (selectedTask && selectedTask.id === activeTaskId) {
        setSelectedTask((prevSelected) => ({
          ...prevSelected,
          status: targetStatus,
        }))
      }

      setActiveTask(null)
      return
    }

    // Handle task reordering within the same status column
    const overItemId = over.id
    if (activeTaskId !== overItemId) {
      const activeIndex = tasks.findIndex((task) => task.id === activeTaskId)
      const overIndex = tasks.findIndex((task) => task.id === overItemId)

      if (activeIndex !== -1 && overIndex !== -1) {
        if (tasks[activeIndex].status === tasks[overIndex].status) {
          const newTasks = arrayMove(tasks, activeIndex, overIndex)
          setTasks(newTasks)

          // Update selectedTask reference if needed
          const updatedSelectedTask = newTasks.find(
            (task) => task.id === selectedTask?.id
          )
          if (updatedSelectedTask) {
            setSelectedTask(updatedSelectedTask)
          }
        } else {
          // If dropped on another task with different status, change the status
          const newStatus = tasks[overIndex].status
          setTasks(
            tasks.map((task) =>
              task.id === activeTaskId ? { ...task, status: newStatus } : task
            )
          )

          // Update selectedTask if it was the one being dragged
          if (selectedTask && selectedTask.id === activeTaskId) {
            setSelectedTask({ ...selectedMember, status: newStatus })
          }
        }
      }
    }

    setActiveTask(null)
  }

  const tasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status)
  }

  // Render appropriate content based on the active view
  const renderViewContent = () => {
    if (activeView === 'members') {
      return <MembersTab />
    }

    if (activeView === 'list') {
      return (
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
          <div className='space-y-6 bg-white p-4 rounded-md'>
            {statusGroups.map((status) => {
              const statusTasks = tasksByStatus(status.value)
              return (
                <div key={status.value} className='space-y-3'>
                  <Text
                    as='h2'
                    style='text-md font-medium text-gray-700 mb-3'
                  >
                    {status.title}{' '}
                    <span className='text-xs text-[#8f8f8f]'>
                      ({statusTasks.length})
                    </span>
                  </Text>
                  <SortableContext
                    items={statusTasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <AnimatePresence>
                      {statusTasks.map((task) => (
                        <SortableTaskCard
                          key={task.id}
                          id={task.id}
                          taskId={task.id}
                          status={task.status}
                          {...task}
                          isSelected={selectedTask?.id === task.id}
                          onClick={() => setSelectedTask(task)}
                        />
                      ))}
                    </AnimatePresence>
                  </SortableContext>

                  <DropZone
                    status={status.value}
                    isEmpty={statusTasks.length === 0}
                  />
                </div>
              )
            })}
          </div>

          <div className='lg:col-span-1'>
            {selectedTask ? (
              <TasksDescription tasks={selectedTask} />
            ) : (
              <div className='bg-white rounded-lg p-8 text-center'>
                <Text style='text-gray-500'>
                  Select a task to view details
                </Text>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Board view
    return (
      <div className='overflow-x-auto pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {statusGroups.map((status) => {
            const statusTasks = tasksByStatus(status.value)
            return (
              <div
                key={status.value}
                className='bg-gray-50 rounded-lg p-3'
                data-status={status.value}
              >
                <Text
                  as='h2'
                  style='text-md font-medium text-gray-700 mb-3'
                >
                  {status.title}{' '}
                  <span className='text-xs text-[#8f8f8f]'>
                    ({statusTasks.length})
                  </span>
                </Text>
                <div
                  className='space-y-3 min-h-[150px]'
                  data-status={status.value}
                >
                  <SortableContext
                    items={statusTasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <AnimatePresence>
                      {statusTasks.map((task) => (
                        <SortableTaskCard
                          key={task.id}
                          id={task.id}
                          taskId={task.id}
                          status={task.status}
                          {...task}
                          isSelected={selectedTask?.id === task.id}
                          onClick={() => setSelectedTask(task)}
                        />
                      ))}
                    </AnimatePresence>

                    <DropZone
                      status={status.value}
                      isEmpty={statusTasks.length === 0}
                    />
                  </SortableContext>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!isClient) {
    return (
      <DashboardLayout>
        <div className='bg-[ghostWhite] py-6 px-4 md:px-8'>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
            <div className='space-y-6 bg-white p-4 rounded-md'>
              {statusGroups.map((status) => {
                const statusTasks = tasksByStatus(status.value)
                return statusTasks.length > 0 ? (
                  <div key={status.value} className='space-y-3'>
                    <Text
                      as='h2'
                      style='text-lg font-medium text-gray-700 mb-2'
                    >
                      {status.title}
                    </Text>
                    {statusTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        id={task.id}
                        {...task}
                        isSelected={selectedTask?.id === task.id}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                  </div>
                ) : null
              })}
            </div>
            <div className='lg:col-span-1'>
              {selectedTask ? (
                <TasksDescription tasks={selectedTask} />
              ) : (
                <div className='bg-white rounded-lg p-8 text-center'>
                  <Text style='text-gray-500'>
                    Select a task to view details
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className='bg-[ghostWhite] py-6 px-3 md:px-8 flex flex-col gap-3'>
        {/* Breadcrumb */}
        <div className='flex items-center text-sm text-gray-500'>
          <Link href='/dashboard' className='hover:text-gray-700'>
            Home
          </Link>
          <ChevronRight className='w-4 h-4 mx-1' />
          <Text>Project</Text>
          <ChevronRight className='w-4 h-4 mx-1' />
          <Text>{selectedTask?.owner}</Text>
        </div>

        {/* Page Header */}
        <div className='flex justify-between items-center mt-1 mb-6'>
          <Text as='h1' style='text-2xl font-semibold text-gray-800'>
            {selectedTask?.title}
          </Text>
        </div>

        {/* Only show Add Task button if not in Members view */}
        {activeView !== 'members' && (
          <div
            onClick={handleOpenModal}
            className='bg-indigo-600 border-indigo-600 border-2 py-2 rounded-md flex items-center justify-center text-center text-sm text-white w-fit px-4 cursor-pointer ms-auto'
          >
            <Text>+ Add new task</Text>
          </div>
        )}

        {/* View Tabs */}
        <div className='bg-white p-1 rounded-md inline-flex mb-6'>
          {viewTypes.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium inline-flex items-center space-x-2 rounded-md transition-all ${
                activeView === tab.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveView(tab.id)}
            >
              <tab.icon className='w-4 h-4' />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Render content based on active view */}
        {activeView !== 'members' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={({ active }) => {
              setActiveTask(tasks.find((task) => task.id === active.id))
            }}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveTask(null)}
            modifiers={
              activeView === 'board'
                ? [restrictToHorizontalAxis]
                : [restrictToVerticalAxis]
            }
          >
            {renderViewContent()}

            <DragOverlay>
              {activeTask ? (
                <TaskCard
                  {...activeTask}
                  style={{
                    cursor: 'grabbing',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    transform: 'scale(1.02)',
                  }}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          renderViewContent()
        )}
      </div>
      <ModalWrapper
        title='Add New Task'
        open={openModal}
        setOpen={setOpenModal}
      >
        <AddTaskForm />
      </ModalWrapper>
    </DashboardLayout>
  )}