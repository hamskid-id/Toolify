'use client'

import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import {
  Calendar,
  Home,
  Inbox,
  Settings,
  User,
  Headphones,
  Bell,
  LogOut,
  HomeIcon,
} from 'lucide-react'
import { Logo } from '../shared/Logo'
import UserAvatar from '../shared/UserAvatar'
import { truncateMiddle } from '@/lib/helpers/TruncateText'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import NotificationsSheet from './NotificationSheet'

const generalItems = [
  {
    title: 'Home',
    url: '#',
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
]

const settingsItems = [
  {
    title: 'Profile',
    url: 'profile',
    icon: User,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Support',
    url: '#',
    icon: Headphones,
  },
]

const SIDEBAR_WIDTH = '13rem'

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider
      style={{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-mobile': SIDEBAR_WIDTH,
      }}
    >
      <Sidebar>
        <SidebarHeader>
          <Logo style='w-full' />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='text-white'>
              General
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {generalItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={`/dashboard/${item.url}`}
                        className='flex items-center gap-3'
                      >
                        <item.icon className='w-4 h-4' />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className='border-t border-gray-200 my-2 mx-3' />

          <SidebarGroup>
            <SidebarGroupLabel className='text-white'>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={`/dashboard/${item.url}`} className='flex items-center gap-3'>
                        <item.icon className='w-4 h-4' />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className='flex gap-2 items-center p-3'>
            <UserAvatar name='Hamzat' />
            <div className='flex flex-col overflow-hidden'>
              <span className='text-sm font-medium truncate'>
                {truncateMiddle('Hamzat Lawal')}
              </span>
              <span className='text-xs text-gray-500 truncate'>
                {truncateMiddle('lawalhamzat27@gmail.com')}
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className='relative w-full'>
        <header className='sticky top-0 z-10 w-full bg-[ghostWhite]'>
          <div className='flex h-14 items-center justify-between px-4 w-full'>
            <SidebarTrigger className='md:hidden block' />
            <div className='flex gap-3 items-center text-[12xp] font-[500]'>
              <HomeIcon className='w-5 h-5' />
              {'Dashboard'}
            </div>
            <div className='flex items-center gap-4'>
              <Sheet>
                <SheetTrigger asChild>
                  <button className='relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'>
                    <Bell className='w-5 h-5' />
                    <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                  </button>
                </SheetTrigger>
                <NotificationsSheet />
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='flex items-center gap-2 focus:outline-none cursor-pointer'>
                    <UserAvatar name='Hamzat' size={32} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-36'>
                  <DropdownMenuItem className='flex items-center gap-2'>
                    <User className='w-4 h-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex items-center gap-2'>
                    <Settings className='w-4 h-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex items-center gap-2 text-red-600 focus:text-red-600'>
                    <LogOut className='w-4 h-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='container'>{children}</div>
      </main>
    </SidebarProvider>
  )
}
