'use client'

import Link from 'next/link'
import DashboardLayout from '../layout'
import {
  ChevronRight,
  Layers,
  Play,
  CheckCircle,
  PauseCircle,
} from 'lucide-react'
import { Text } from '@/components/shared/Text'
import { motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { ProjectDescription } from '../shared/ProjectDescription'
import { useState } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const projectStatuses = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'active', label: 'Active', icon: Play },
  { id: 'closed', label: 'Completed', icon: CheckCircle },
  { id: 'on-hold', label: 'On Hold', icon: PauseCircle },
]

const assignees = [
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
  { id: 3, name: 'Jamie Lopez', role: 'UX Researcher', image: '/jamie.jpg' },
]

const sampleProjects = {
  all: [
    {
      id: 'ID-XK92M',
      title: 'Reports Animation',
      owner: 'Luminous Group',
      status: 'To do',
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
      tasks: [
        {
          id: 'DSGN-128',
          title: 'App Wireframes',
          description:
            'Create low-fidelity wireframes for all main app screens including onboarding flow',
          startDate: 'Jul 15',
          dueDate: 'Jul 22',
          priority: 'High',
          status: 'In Review',
          members: [assignees[0], assignees[2]],
        },
        {
          id: 'DEV-045',
          title: 'Component Library',
          description:
            'Develop reusable React Native components based on finalized designs',
          startDate: 'Aug 1',
          dueDate: 'Aug 15',
          priority: 'Medium',
          status: 'In Progress',
          members: [assignees[1]],
        },
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
      status: 'In progress',
      startDate: 'July 15',
      description:
        'Complete redesign of the mobile application including new UI components, improved user flows, and dark mode implementation.',
      dueDate: 'August 5',
      members: [
        { id: 1, name: 'John Doe', image: '/john.jpg' },
        { id: 2, name: 'Emma Watson' },
      ],
      tasks: [
        {
          id: 'DSGN-128',
          title: 'App Wireframes',
          description:
            'Create low-fidelity wireframes for all main app screens including onboarding flow',
          startDate: 'Jul 15',
          dueDate: 'Jul 22',
          priority: 'High',
          status: 'In Review',
          members: [assignees[0], assignees[2]],
        },
        {
          id: 'DEV-045',
          title: 'Component Library',
          description:
            'Develop reusable React Native components based on finalized designs',
          startDate: 'Aug 1',
          dueDate: 'Aug 15',
          priority: 'Medium',
          status: 'In Progress',
          members: [assignees[1]],
        },
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
  ],
  active: [
    {
      id: 'ID-YL83N',
      title: 'UI Redesign',
      owner: 'Fashion Group',
      status: 'In progress',
      teamLead: 'Sarah Williams',
      startDate: 'July 15',
      description:
        'Complete redesign of the mobile application including new UI components, improved user flows, and dark mode implementation.',
      dueDate: 'August 5',
      members: [
        { id: 1, name: 'John Doe', image: '/john.jpg' },
        { id: 2, name: 'Emma Watson' },
      ],
      tasks: [
        {
          id: 'DSGN-128',
          title: 'App Wireframes',
          description:
            'Create low-fidelity wireframes for all main app screens including onboarding flow',
          startDate: 'Jul 15',
          dueDate: 'Jul 22',
          priority: 'High',
          status: 'In Review',
          members: [assignees[0], assignees[2]],
        },
        {
          id: 'DEV-045',
          title: 'Component Library',
          description:
            'Develop reusable React Native components based on finalized designs',
          startDate: 'Aug 1',
          dueDate: 'Aug 15',
          priority: 'Medium',
          status: 'In Progress',
          members: [assignees[1]],
        },
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
  ],
  closed: [],
  'on-hold': [],
}

export const AllProjects = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedProject, setSelectedProject] = useState(sampleProjects.all[0])

  return (
    <DashboardLayout>
      <div className='bg-[ghostWhite] py-6 px-3 md:px-8'>
        {/* Breadcrumb */}
        <div className='flex items-center text-sm text-gray-500'>
          <Link href='/dashboard' className='hover:text-gray-700'>
            Home
          </Link>
          <ChevronRight className='w-4 h-4 mx-1' />
          <Text>All Projects</Text>
        </div>

        {/* Page Header */}
        <div className='flex justify-between items-center mt-4 mb-6'>
          <Text as='h1' style='text-2xl font-semibold text-gray-800'>
            All Projects
          </Text>
        </div>

        {/* Status Tabs - Redesigned */}
        <ScrollArea className='whitespace-nowrap bg-white p-1 rounded-md inline-flex mb-6 w-full flex-nowrap'>
          {projectStatuses.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium inline-flex items-center space-x-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className='w-4 h-4' />
              <span>{tab.label}</span>
            </button>
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Projects Grid */}
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
          {/* Projects List */}
          <div className='space-y-4 bg-white p-4 rounded-md'>
            {sampleProjects[activeTab].length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='space-y-4'
              >
                {sampleProjects[activeTab].map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    isSelected={selectedProject?.id === project.id}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className='bg-white rounded-lg p-8 text-center'>
                <Text style='text-gray-500'>No projects in this category</Text>
              </div>
            )}
          </div>

          {/* Project Details Panel */}
          <div className='lg:col-span-1'>
            {selectedProject ? (
              <ProjectDescription project={selectedProject} />
            ) : (
              <div className='bg-white rounded-lg p-8 text-center'>
                <Text style='text-gray-500'>
                  Select a project to view details
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
