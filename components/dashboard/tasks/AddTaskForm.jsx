'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Calendar, Users, Paperclip, Flag, ChevronDown } from 'lucide-react'
import { Text } from '@/components/shared/Text'
import UserAvatar from '@/components/shared/UserAvatar'
import { cn } from '@/lib/utils'

const PriorityOptions = [
  { label: 'No Priority', value: 0, color: 'bg-gray-300' },
  { label: 'Low', value: 1, color: 'bg-blue-400' },
  { label: 'Medium', value: 2, color: 'bg-yellow-400' },
  { label: 'High', value: 3, color: 'bg-orange-500' },
  { label: 'Urgent', value: 4, color: 'bg-red-500' },
]

export const AddTaskForm = ({
  isSubtask = false,
  onClose,
  onSubmit,
  parentTask = null,
  position = null,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [selectedPriority, setSelectedPriority] = useState(0)
  const [attachments, setAttachments] = useState([])
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showMembersDropdown, setShowMembersDropdown] = useState(false)

  const formRef = useRef(null)
  const titleInputRef = useRef(null)
  const fileInputRef = useRef(null)

  // Sample team members (replace with your actual data)
  const teamMembers = [
    { id: 1, name: 'Mark B', avatar: null },
    { id: 2, name: 'Sarah W', avatar: null },
    { id: 3, name: 'Alex K', avatar: null },
    { id: 4, name: 'Taylor R', avatar: null },
  ]

  useEffect(() => {
    // Focus on title input when form opens
    if (titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current.focus()
      }, 100)
    }

    // Add click outside handler
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Close dropdowns first if they're open
        if (showPriorityDropdown) {
          setShowPriorityDropdown(false)
          return
        }

        if (showMembersDropdown) {
          setShowMembersDropdown(false)
          return
        }

        // Otherwise close the form
        if(onClose) onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, showPriorityDropdown, showMembersDropdown])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    const newTask = {
      title,
      description,
      dueDate,
      members: selectedMembers,
      priority: selectedPriority,
      attachments,
      parentTaskId: isSubtask && parentTask ? parentTask.id : null,
      completed: false,
    }

    onSubmit(newTask)
    onClose()
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments([...attachments, ...files])
  }

  const toggleMember = (member) => {
    if (selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id))
    } else {
      setSelectedMembers([...selectedMembers, member])
    }
  }

  const getPriorityFlag = () => {
    const priority = PriorityOptions[selectedPriority]
    return (
      <div className='flex items-center gap-1'>
        <div className={`h-3 w-3 rounded-full ${priority.color}`}></div>
        <span className='text-xs'>{priority.label}</span>
      </div>
    )
  }

  const renderPositionedForm = () => {
    if (!position) return {}

    const style = {
      position: 'absolute',
      top: `${position.y}px`,
      left: `${position.x}px`,
      width: '450px',
      zIndex: 50,
      maxHeight: '80vh',
      overflowY: 'auto',
    }

    return style
  }

  return (
    <div
      className={cn(
        'bg-white',
        position ? '' : 'w-full',
        isSubtask && 'rounded-md shadow-lg border border-gray-200'
      )}
      style={renderPositionedForm()}
      ref={formRef}
    >
      <div className={cn('space-y-4', isSubtask && 'p-4')}>
        {/* Form fields */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Title input */}
          <div className='space-y-1'>
            <input
              ref={titleInputRef}
              type='text'
              placeholder={isSubtask ? 'Subtask title' : 'Task title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-2 py-2 text-sm border-none focus:outline-none focus:ring-0'
            />
          </div>

          {/* Description */}
          <div className='space-y-1'>
            <textarea
              placeholder='Add description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-2 py-2 text-sm border-none focus:outline-none focus:ring-0 min-h-24 resize-none bg-gray-50 rounded-md'
            />
          </div>

          {/* Buttons and actions footer */}
          <div className='flex justify-between items-center pt-2 border-t'>
            <div className='flex items-center space-x-2'>
              {/* Assignees dropdown */}
              <div className='relative'>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-700 flex items-center gap-1 p-1 rounded hover:bg-gray-100'
                  onClick={() => setShowMembersDropdown(!showMembersDropdown)}
                >
                  <Users size={16} />
                  {selectedMembers.length > 0 && (
                    <span className='text-xs'>{selectedMembers.length}</span>
                  )}
                </button>

                {showMembersDropdown && (
                  <div className='absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md z-50 py-1 border border-gray-200'>
                    <div className='px-3 py-2 text-xs text-gray-500 border-b'>
                      Assign members
                    </div>
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className='px-3 py-2 hover:bg-gray-100 flex items-center justify-between cursor-pointer'
                        onClick={() => toggleMember(member)}
                      >
                        <div className='flex items-center gap-2'>
                          <UserAvatar name={member.name} />
                          <span className='text-sm'>{member.name}</span>
                        </div>
                        {selectedMembers.some((m) => m.id === member.id) && (
                          <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Due date selector */}
              <div className='relative'>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-700 flex items-center gap-1 p-1 rounded hover:bg-gray-100'
                >
                  <Calendar size={16} />
                  <input
                    type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className='absolute inset-0 opacity-0 cursor-pointer w-full h-full'
                  />
                  {dueDate && (
                    <span className='text-xs'>
                      {new Date(dueDate).toLocaleDateString()}
                    </span>
                  )}
                </button>
              </div>

              {/* Priority dropdown */}
              <div className='relative'>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-700 flex items-center gap-1 p-1 rounded hover:bg-gray-100'
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                >
                  <Flag size={16} />
                  {selectedPriority > 0 && getPriorityFlag()}
                </button>

                {showPriorityDropdown && (
                  <div className='absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md z-50 py-1 border border-gray-200'>
                    <div className='px-3 py-2 text-xs text-gray-500 border-b'>
                      Set priority
                    </div>
                    {PriorityOptions.map((priority, index) => (
                      <div
                        key={index}
                        className='px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'
                        onClick={() => {
                          setSelectedPriority(index)
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <div
                          className={`h-3 w-3 rounded-full ${priority.color}`}
                        ></div>
                        <span className='text-sm'>{priority.label}</span>
                        {selectedPriority === index && (
                          <div className='ml-auto h-2 w-2 rounded-full bg-blue-500'></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* File attachment */}
              <div>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100'
                  onClick={() => fileInputRef.current.click()}
                >
                  <Paperclip size={16} />
                  <input
                    ref={fileInputRef}
                    type='file'
                    multiple
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </button>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {/* Cancel button */}
              <button
                type='button'
                className='px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded'
                onClick={onClose}
              >
                Cancel
              </button>

              {/* Create button */}
              <button
                type='submit'
                className={`px-3 py-1 text-sm text-white rounded ${
                  title.trim()
                    ? 'bg-[#FF7850] hover:bg-[#e66a45]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!title.trim()}
              >
                {isSubtask ? 'Add Subtask' : 'Create Task'}
              </button>
            </div>
          </div>

          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className='pt-2 space-y-2'>
              <Text style='text-xs text-gray-500'>Attachments</Text>
              <div className='flex flex-wrap gap-2'>
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs'
                  >
                    <Paperclip size={12} />
                    <span className='truncate max-w-32'>{file.name}</span>
                    <button
                      type='button'
                      className='text-gray-500 hover:text-gray-700'
                      onClick={() =>
                        setAttachments(
                          attachments.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
