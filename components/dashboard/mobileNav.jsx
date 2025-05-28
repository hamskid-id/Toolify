'use client'

import { cn } from '@/lib/utils'
import { Calendar, Home, Inbox, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const MobileNav = () => {
  const generalItems = [
    {
      title: 'Home',
      url: '',
      icon: Home,
    },
    {
      title: 'Projects',
      url: 'projects',
      icon: Inbox,
    },
    {
      title: 'Tasks',
      url: 'tasks',
      icon: Calendar,
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: User,
    },
  ]

  const pathname = usePathname()

  const isActive = (url) => {
    if (url === '') {
      return pathname === '/dashboard'
    }
    return pathname === `/dashboard/${url}`
  }

  return (
    <div className='md:hidden block'>
      <div className='fixed bg-white z-[1000] bottom-0 left-0 right-0 p-3 flex justify-between items-center gap-2'>
        {generalItems.map((route, index) => (
          <div key={index}>
            <a
              href={`/dashboard/${route.url}`}
              className='flex flex-col items-center gap-1'
            >
              <route.icon
                className={cn(
                  'w-4 h-4',
                  isActive(route.url) && 'text-indigo-600'
                )}
              />
              <span
                className={cn('text-xs', isActive(route.url) && 'text-indigo-600')}
              >
                {route.title}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
