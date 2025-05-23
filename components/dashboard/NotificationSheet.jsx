'use client'

import { SheetContent, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { CheckCircle, ArrowRight, BellOff, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const mockNotifications = [
  {
    id: 1,
    type: 'task_moved',
    project: 'Website Redesign',
    task: 'Update homepage hero',
    from: 'Todo',
    to: 'In Progress',
    user: 'Alex Chen',
    time: '5 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'task_moved',
    project: 'Mobile App',
    task: 'Fix login bug',
    from: 'In Progress',
    to: 'Review',
    user: 'Jamie Smith',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 3,
    type: 'task_assigned',
    project: 'Marketing',
    task: 'Create campaign assets',
    user: 'Taylor Wong',
    time: '2 hours ago',
    read: true,
  },
]

export default function NotificationsSheet() {
  return (
    <SheetContent className='w-full sm:max-w-md p-0'>
      <SheetHeader className='sr-only'>
        <SheetTitle>Notifications</SheetTitle>
      </SheetHeader>

      <div className='h-full flex flex-col'>
        {/* Header (visible) */}
        <div className='border-b px-6 py-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Notifications</h2>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <BellOff className='w-4 h-4 mr-2' />
            Mute all
          </Button>
        </div>

        {/* Notification List */}
        <div className='flex-1 overflow-y-auto'>
          {mockNotifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-muted-foreground p-6'>
              <BellOff className='w-8 h-8 mb-2' />
              <p>No notifications yet</p>
            </div>
          ) : (
            <ul className='divide-y'>
              {mockNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 ${
                    !notification.read
                      ? 'bg-blue-50/50 dark:bg-blue-900/20'
                      : ''
                  }`}
                >
                  {notification.type === 'task_moved' ? (
                    <div className='flex gap-3'>
                      <div className='flex-shrink-0 mt-1'>
                        <ChevronRight className='w-5 h-5 text-muted-foreground' />
                      </div>
                      <div className='flex-1'>
                        <div className='flex justify-between'>
                          <p className='font-medium'>{notification.project}</p>
                          <span className='text-xs text-muted-foreground'>
                            {notification.time}
                          </span>
                        </div>
                        <p className='text-sm'>{notification.task}</p>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground mt-1'>
                          <span className='text-xs px-1.5 py-0.5 rounded bg-muted'>
                            {notification.from}
                          </span>
                          <ArrowRight className='w-3 h-3' />
                          <span className='text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'>
                            {notification.to}
                          </span>
                          <span className='mx-1'>by</span>
                          <span className='font-medium'>
                            {notification.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex gap-3'>
                      <div className='flex-shrink-0 mt-1'>
                        <CheckCircle className='w-5 h-5 text-green-500' />
                      </div>
                      <div>
                        <div className='flex justify-between'>
                          <p className='font-medium'>{notification.project}</p>
                          <span className='text-xs text-muted-foreground'>
                            {notification.time}
                          </span>
                        </div>
                        <p className='text-sm'>
                          New task assigned: {notification.task}
                        </p>
                        <p className='text-sm text-muted-foreground mt-1'>
                          Assigned by {notification.user}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className='border-t px-6 py-3 text-center'>
          <Button variant='ghost' size='sm'>
            Mark all as read
          </Button>
        </div>
      </div>
    </SheetContent>
  )
}
