'use client'

import { useState } from 'react'
import {
  Users,
  Edit,
  Trash,
  Mail,
  Phone,
  UserPlus,
  Check,
  X,
} from 'lucide-react'
import { Text } from '@/components/shared/Text'
import { motion } from 'framer-motion'
import { ModalWrapper } from '@/components/custom-ui/Modal'
import UserAvatar from '@/components/shared/UserAvatar'
import InviteMemberModal from './InviteMemberModal'

const initialMembers = [
  {
    id: 1,
    name: 'Sarah Williams',
    role: 'Lead Designer',
    email: 'sarah.williams@example.com',
    phone: '+1 (555) 123-4567',
    image: '/sarah.jpg',
    lastActive: '2 hours ago',
    tasks: ['UI Redesign', 'Reports Animation', 'User Testing'],
    status: 'Online',
  },
  {
    id: 2,
    name: 'Alex Chen',
    role: 'Frontend Developer',
    email: 'alex.chen@example.com',
    phone: '+1 (555) 234-5678',
    image: '/alex.jpg',
    lastActive: '5 minutes ago',
    tasks: ['UI Redesign', 'API Integration'],
    status: 'Online',
  },
  {
    id: 3,
    name: 'Jamie Lopez',
    role: 'UX Researcher',
    email: 'jamie.lopez@example.com',
    phone: '+1 (555) 345-6789',
    image: '/jamie.jpg',
    lastActive: '1 day ago',
    tasks: ['UI Redesign', 'User Testing'],
    status: 'Away',
  },
  {
    id: 4,
    name: 'Mike Johnson',
    role: 'Backend Developer',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    image: '/mike.jpg',
    lastActive: '3 hours ago',
    tasks: ['API Integration'],
    status: 'Online',
  },
  {
    id: 5,
    name: 'John Doe',
    role: 'Project Manager',
    email: 'john.doe@example.com',
    phone: '+1 (555) 567-8901',
    image: '/john.jpg',
    lastActive: 'Just now',
    tasks: ['Reports Animation', 'UI Redesign'],
    status: 'Online',
  },
  {
    id: 6,
    name: 'Emma Watson',
    role: 'Product Owner',
    email: 'emma.watson@example.com',
    phone: '+1 (555) 678-9012',
    lastActive: '2 days ago',
    tasks: ['UI Redesign'],
    status: 'Offline',
  },
]

// MemberCard component for displaying individual member information
const MemberCard = ({ member, onSelect }) => {
  const statusColors = {
    Online: 'bg-green-500',
    Away: 'bg-yellow-500',
    Offline: 'bg-gray-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className='bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer'
      onClick={() => onSelect(member)}
    >
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <UserAvatar imageSrc={member.image} name={member.name} />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
              statusColors[member.status] || 'bg-gray-400'
            } border-2 border-white`}
          ></div>
        </div>

        <div className='flex-1'>
          <Text style='font-medium text-gray-800'>{member.name}</Text>
          <Text style='text-sm text-gray-500'>{member.role}</Text>
        </div>

        <div className='text-xs text-gray-400'>{member.lastActive}</div>
      </div>

      <div className='mt-3'>
        <Text style='text-xs text-gray-500'>
          Assigned tasks: {member.tasks.length}
        </Text>
        <div className='mt-1 flex flex-wrap gap-1'>
          {member.tasks.slice(0, 2).map((task, index) => (
            <span
              key={index}
              className='inline-block px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs'
            >
              {task}
            </span>
          ))}
          {member.tasks.length > 2 && (
            <span className='inline-block px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs'>
              +{member.tasks.length - 2} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const MemberDetails = ({ member, onClose, onUpdateMember }) => {
  const [isEditingRole, setIsEditingRole] = useState(false)
  const [editedRole, setEditedRole] = useState(member.role)

  // Predefined roles that admins can choose from
  const availableRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UX Designer',
    'UI Designer',
    'Product Designer',
    'Project Manager',
    'DevOps Engineer',
    'QA Engineer',
    'Data Analyst',
    'Marketing Specialist',
    'Content Writer',
  ]

  const handleEditRole = () => {
    setIsEditingRole(true)
    setEditedRole(member.role)
  }

  const handleSaveRole = () => {
    if (editedRole.trim() && editedRole !== member.role) {
      // Call the parent component's update function
      onUpdateMember({ ...member, role: editedRole.trim() })
    }
    setIsEditingRole(false)
  }

  const handleCancelEdit = () => {
    setEditedRole(member.role)
    setIsEditingRole(false)
  }

  const handleRoleChange = (e) => {
    setEditedRole(e.target.value)
  }

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-start mb-6'>
        <div className='w-full flex items-center space-x-4'>
          <UserAvatar imageSrc={member.image} name={member.name} />
          <div className="flex-grow">
            <div className='flex justify-between items-center w-full'>
              <Text as='h2' style='text-xl font-semibold text-gray-800'>
                {member.name}
              </Text>
              <div>
                <button className='p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors'>
                  <Trash className='w-5 h-5' />
                </button>
              </div>
            </div>
            {/* Editable Role Section */}
            {isEditingRole ? (
              <div className='flex items-center space-x-2 mt-1'>
                <select
                  value={editedRole}
                  onChange={handleRoleChange}
                  className='text-indigo-600 bg-white border border-indigo-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  autoFocus
                >
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSaveRole}
                  className='p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors'
                  title='Save'
                >
                  <Check className='w-4 h-4' />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className='p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors'
                  title='Cancel'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-2 group'>
                <Text style='text-indigo-600'>{member.role}</Text>
                <button
                  onClick={handleEditRole}
                  className='opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all'
                  title='Edit role'
                >
                  <Edit className='w-3 h-3' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='border-t border-b py-4 mb-4'>
        <div className='grid grid-cols-1 gap-4'>
          <div className='flex items-center space-x-2'>
            <Mail className='w-4 h-4 text-gray-400' />
            <Text style='text-gray-600'>{member.email}</Text>
          </div>
          <div className='flex items-center space-x-2'>
            <Phone className='w-4 h-4 text-gray-400' />
            <Text style='text-gray-600'>{member.phone || 'Not provided'}</Text>
          </div>
        </div>
      </div>

      <div className='mb-6'>
        <Text as='h3' style='font-medium text-gray-700 mb-2'>
          Assigned Tasks
        </Text>
        <div className='space-y-2'>
          {member.tasks.map((task, index) => (
            <div key={index} className='p-3 bg-gray-50 rounded-md'>
              <Text style='text-gray-700'>{task}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        Last active: {member.lastActive}
      </div>
    </div>
  )
}

// Search and filter component
const MemberFilters = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className='flex flex-col md:flex-row gap-4 mb-6'>
      <div className='relative flex-1'>
        <input
          type='text'
          placeholder='Search members...'
          className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      <div className='flex gap-2'>
        <select
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white'
          onChange={(e) => onFilterChange('role', e.target.value)}
          defaultValue=''
        >
          <option value=''>All Roles</option>
          <option value='Lead Designer'>Lead Designer</option>
          <option value='Frontend Developer'>Frontend Developer</option>
          <option value='UX Researcher'>UX Researcher</option>
          <option value='Backend Developer'>Backend Developer</option>
          <option value='Project Manager'>Project Manager</option>
          <option value='Product Owner'>Product Owner</option>
        </select>

        <select
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white'
          onChange={(e) => onFilterChange('status', e.target.value)}
          defaultValue=''
        >
          <option value=''>All Status</option>
          <option value='Online'>Online</option>
          <option value='Away'>Away</option>
          <option value='Offline'>Offline</option>
        </select>
      </div>
    </div>
  )
}

// Main Members tab component
export const MembersTab = () => {
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false)
  const [members, setMembers] = useState(initialMembers)
  const [filteredMembers, setFilteredMembers] = useState(initialMembers)
  const [selectedMember, setSelectedMember] = useState(null)
  const [filters, setFilters] = useState({ search: '', role: '', status: '' })

  // Handle search and filtering
  const handleSearch = (term) => {
    setFilters((prev) => ({ ...prev, search: term }))
    applyFilters({ ...filters, search: term })
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
    applyFilters({ ...filters, [filterType]: value })
  }

  const applyFilters = (currentFilters) => {
    let result = [...initialMembers]

    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase()
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower) ||
          member.email.toLowerCase().includes(searchLower)
      )
    }

    if (currentFilters.role) {
      result = result.filter((member) => member.role === currentFilters.role)
    }

    if (currentFilters.status) {
      result = result.filter(
        (member) => member.status === currentFilters.status
      )
    }

    setFilteredMembers(result)
  }

  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 gap-6'>
      <div className='lg:col-span-2 space-y-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <Users className='w-5 h-5 text-indigo-600 mr-2' />
            <Text as='h2' style='text-xl font-semibold text-gray-800'>
              Team Members
            </Text>
          </div>

          <button
            onClick={() => setOpenAddMemberModal(true)}
            className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-md'
          >
            <UserPlus className='w-4 h-4' />
            <span className='text-sm'>Add Member</span>
          </button>
        </div>

        <MemberFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <div className='grid md:grid-cols-2 gap-4'>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onSelect={setSelectedMember}
              />
            ))
          ) : (
            <div className='col-span-2 py-8 text-center'>
              <Text style='text-gray-500'>
                No members match your search criteria
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className='lg:col-span-1'>
        {selectedMember ? (
          <MemberDetails
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onUpdateMember={() => console.log('hello')}
          />
        ) : (
          <div className='bg-white rounded-lg p-8 text-center'>
            <Users className='w-12 h-12 text-gray-300 mx-auto mb-4' />
            <Text style='text-gray-500'>Select a member to view details</Text>
          </div>
        )}
      </div>
      <ModalWrapper
        title='Invite Members to collaborate'
        open={openAddMemberModal}
        setOpen={setOpenAddMemberModal}
      >
        <InviteMemberModal />
      </ModalWrapper>
    </div>
  )
}
