'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  CheckCircle,
  Settings,
  User,
  FileText,
  GitPullRequest,
  MessageSquare,
  Edit,
  Save,
  X,
} from 'lucide-react'
import { useState } from 'react'
import DashboardLayout from '../layout'

export const ProfileComponent=()=> {
  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'task',
      title: 'Completed task',
      description: 'Finished the dashboard redesign',
      date: '2023-06-15T10:30:00',
      project: 'Website Redesign',
    },
    {
      id: '2',
      type: 'comment',
      title: 'Left a comment',
      description: 'Provided feedback on the new user flow',
      date: '2023-06-14T15:45:00',
      project: 'Mobile App',
    },
    {
      id: '3',
      type: 'pull_request',
      title: 'Opened PR',
      description: 'Implemented dark mode toggle',
      date: '2023-06-13T09:20:00',
      project: 'Design System',
    },
    {
      id: '4',
      type: 'update',
      title: 'Updated profile',
      description: 'Changed profile picture and bio',
      date: '2023-06-12T14:10:00',
    },
  ])

  // Edit state and form data
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Parker',
    email: 'john@example.com',
    bio: 'Product designer at Linear. Working on making the world a better place through design.',
    language: 'English',
    timezone: 'GMT +1 (London)'
  })

  const [tempFormData, setTempFormData] = useState({ ...formData })

  const handleEdit = () => {
    setIsEditing(true)
    setTempFormData({ ...formData })
  }

  const handleSave = () => {
    setFormData({ ...tempFormData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempFormData({ ...formData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setTempFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'comment':
        return <MessageSquare className='h-4 w-4 text-blue-500' />
      case 'pull_request':
        return <GitPullRequest className='h-4 w-4 text-purple-500' />
      case 'update':
        return <User className='h-4 w-4 text-gray-500' />
      default:
        return <FileText className='h-4 w-4' />
    }
  }

  return (
    <DashboardLayout>
      <div className='space-y-6 p-4 md:p-6 shadow-none border-none'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Profile</h1>
            <p className='text-muted-foreground'>
              Manage your account settings and personal information
            </p>
          </div>
          <Button variant='outline' className='hidden sm:flex'>
            <Settings className='mr-2 h-4 w-4' />
            Settings
          </Button>
        </div>

        <Separator />

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Profile Section */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Personal Info Card */}
            <Card className='rounded-md shadow-none'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <div className='flex gap-2'>
                    {!isEditing ? (
                      <Button onClick={handleEdit} variant='outline' size='sm'>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleCancel} variant='outline' size='sm'>
                          <X className='mr-2 h-4 w-4' />
                          Cancel
                        </Button>
                        <Button onClick={handleSave} size='sm'>
                          <Save className='mr-2 h-4 w-4' />
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <Avatar className='h-32 w-32'>
                    <AvatarImage src='/avatars/01.png' alt='Avatar' />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <Button variant='outline' size='sm' disabled={!isEditing}>
                      Change avatar
                    </Button>
                    <p className='text-sm text-muted-foreground'>
                      JPG, GIF or PNG. Max size 2MB
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First name</Label>
                    <Input 
                      id='firstName' 
                      value={isEditing ? tempFormData.firstName : formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last name</Label>
                    <Input 
                      id='lastName' 
                      value={isEditing ? tempFormData.lastName : formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={isEditing ? tempFormData.email : formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bio'>Bio</Label>
                  <Textarea
                    id='bio'
                    value={isEditing ? tempFormData.bio : formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className={`min-h-[100px] ${!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities Card */}
            <Card className='rounded-md shadow-none'>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Your recent actions across projects
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {activities.map((activity) => (
                  <div key={activity.id} className='flex items-start gap-3'>
                    <div className='mt-1 rounded-full p-2 bg-gray-100 dark:bg-gray-800'>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium'>{activity.title}</h3>
                        <span className='text-xs text-muted-foreground'>
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {activity.description}
                      </p>
                      {activity.project && (
                        <span className='inline-block mt-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-muted-foreground'>
                          {activity.project}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant='ghost' className='w-full'>
                  View all activities
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Account Card */}
            <Card className='rounded-md shadow-none'>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Configure your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='language'>Language</Label>
                  <select
                    id='language'
                    value={isEditing ? tempFormData.language : formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    disabled={!isEditing}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Spanish</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='timezone'>Timezone</Label>
                  <select
                    id='timezone'
                    value={isEditing ? tempFormData.timezone : formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    disabled={!isEditing}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                  >
                    <option>GMT +1 (London)</option>
                    <option>GMT +2 (Paris)</option>
                    <option>GMT -5 (New York)</option>
                    <option>GMT +8 (Singapore)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className='border-red-200 shadow-none rounded-md dark:border-red-900/50'>
              <CardHeader>
                <CardTitle className='text-red-600'>Danger Zone</CardTitle>
                <CardDescription>
                  These actions are irreversible
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Button variant='outline' className='w-full text-red-600'>
                  Delete account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}