'use client'

import { Text } from '@/components/shared/Text'
import UserAvatar from '@/components/shared/UserAvatar'
import { FileIcon, Paperclip, Send } from 'lucide-react'
import { useState, useRef } from 'react'
import { AddTaskForm } from './AddTaskForm'

export const TaskInformationSection = ({ task }) => {
  const [subtasks, setSubtasks] = useState([
    { id: 1, title: 'Design mockups', completed: false },
    { id: 2, title: 'Frontend implementation', completed: false },
  ])

  const [activities, setActivities] = useState([
    {
      id: 1,
      user: 'Mark B',
      action: 'added a comment',
      timestamp: '2 hours ago',
      comment:
        'We need to adjust the color scheme to match the brand guidelines.',
    },
    {
      id: 2,
      user: 'Sarah W',
      action: 'updated task status',
      timestamp: '4 hours ago',
      comment: 'Moved task to In Progress',
    },
  ])

  const [showAddSubtaskForm, setShowAddSubtaskForm] = useState(false)
  const [commentText, setCommentText] = useState('')
  const addSubtaskButtonRef = useRef(null)
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 })

  const handleToggleSubtask = (id) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    )
  }

  const handleSendMessage = () => {
    if (commentText.trim()) {
      const newActivity = {
        id: activities.length + 1,
        user: 'You',
        action: 'added a comment',
        timestamp: 'Just now',
        comment: commentText,
      }
      setActivities([...activities, newActivity])
      setCommentText('')
    }
  }

  const handleAddSubtask = (newSubtask) => {
    const subtaskToAdd = {
      id: subtasks.length + 1,
      title: newSubtask.title,
      description: newSubtask.description,
      dueDate: newSubtask.dueDate,
      members: newSubtask.members,
      priority: newSubtask.priority,
      attachments: newSubtask.attachments,
      completed: false,
    }

    setSubtasks([...subtasks, subtaskToAdd])

    // Add activity for subtask creation
    const newActivity = {
      id: activities.length + 1,
      user: 'You',
      action: 'added a subtask',
      timestamp: 'Just now',
      comment: `Added subtask: ${newSubtask.title}`,
    }
    setActivities([...activities, newActivity])
  }

  const handleOpenAddSubtaskForm = () => {
    const buttonRect = addSubtaskButtonRef.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Position the form slightly below the button with enough space for dropdowns
    setFormPosition({
      x: Math.max(buttonRect.left - 50, 10), // Ensure it's not too far left
      y: buttonRect.bottom + scrollTop + 5, // Small gap between button and form
    })

    setShowAddSubtaskForm(true)
  }

  return (
    <div className='bg-white rounded-md p-4'>
      {/* Information Section */}
      <div className='relative h-full pb-[5rem]'>
        <div className='mb-8'>
          <Text style='text-md font-medium mb-2'>Task Overview</Text>
          <Text style='text-gray-600 leading-relaxed text-sm'>
            {task?.description}
          </Text>
        </div>

        {/* Subtasks Section */}
        <div className='mb-8'>
          <Text style='text-md font-medium mb-2'>SubTasks</Text>
          <div className='flex flex-col gap-2 bg-[ghostwhite] p-2 rounded-md'>
            {subtasks?.map((task, index) => (
              <div
                className='rounded border p-2 flex items-center w-full justify-between transition-all duration-200 hover:border-[#FF7850] hover:shadow-sm'
                key={index}
              >
                <Text style='text-xs font-medium'>{task?.title}</Text>
                <Text style='text-gray-600 leading-relaxed text-xs'>
                  {`${new Date()?.toLocaleDateString()}`}
                </Text>
              </div>
            ))}
            <div
              className='border-dotted border-[#FF7850] border-2 p-2 rounded-md flex items-center justify-center text-center text-sm text-[#FF7850] w-full cursor-pointer hover:bg-[#fff8f6] transition-colors duration-200'
              onClick={handleOpenAddSubtaskForm}
              ref={addSubtaskButtonRef}
            >
              <Text>+ Add new subtasks</Text>
            </div>
          </div>
        </div>

        {/* Add Subtask Form */}
        {showAddSubtaskForm && (
          <div
            className='fixed inset-0 bg-opacity-10 z-40'
            onClick={() => setShowAddSubtaskForm(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <AddTaskForm
                isSubtask={true}
                onClose={() => setShowAddSubtaskForm(false)}
                onSubmit={handleAddSubtask}
                parentTask={task}
                position={formPosition}
              />
            </div>
          </div>
        )}

        {/* Activities Section */}
        <div>
          <Text style='text-md font-medium mb-2'>Activities</Text>
          <div className='space-y-3'>
            {activities.map((activity, index) => (
              <div className='flex gap-2 items-start' key={index}>
                <div>
                  <UserAvatar name='Hamzat Lawal' />
                </div>
                <div className='bg-gray-50 p-2 rounded flex-grow'>
                  <div className='flex justify-between items-center mb-1'>
                    <div className='text-gray-800 text-sm flex gap-1 items-end'>
                      {activity.user}
                      <Text style='text-gray-600 text-xs'>
                        {activity.action}
                      </Text>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {activity.timestamp}
                    </span>
                  </div>
                  <Text style='text-gray-600 leading-relaxed text-xs'>
                    {activity.comment}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className='mt-4 flex items-center border p-2 rounded-sm absolute bottom-0 right-0 left-0'>
            <input
              type='text'
              placeholder='Add comment'
              className='flex-grow mr-0 focus:outline-none focus:ring-0 focus:ring-none'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <button
              className='rounded-md p-3 text-gray-600 bg-[#FFE8C8] hover:bg-[#FFD8A8] transition-colors duration-200'
              onClick={handleSendMessage}
            >
              <Send className='w-5 h-5 cursor-pointer' />
            </button>
            <div className='ml-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors duration-200'>
              <Paperclip
                size={16}
                className='text-gray-600 hover:text-blue-800'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
