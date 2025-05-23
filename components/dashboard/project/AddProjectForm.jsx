'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, Users } from 'lucide-react'
import UserAvatar from '@/components/shared/UserAvatar'

export const AddProjectForm = ({onClose}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showMembersDropdown, setShowMembersDropdown] = useState(false)

  const formRef = useRef(null)
  const titleInputRef = useRef(null)

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

        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, showMembersDropdown])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    const newProject = {
      title,
      description,
      dueDate,
      members: selectedMembers,
      completed: false,
    }
    onClose()
  }

  const toggleMember = (member) => {
    if (selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id))
    } else {
      setSelectedMembers([...selectedMembers, member])
    }
  }

  return (
    <div className={'bg-white w-full'} ref={formRef}>
      <div className={'space-y-4'}>
        {/* Form fields */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Title input */}
          <div className='space-y-1'>
            <input
              ref={titleInputRef}
              type='text'
              placeholder={'Project Title'}
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
                Create Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
