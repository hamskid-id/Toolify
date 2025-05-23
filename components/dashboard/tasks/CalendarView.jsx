'use client'

import { useState, useEffect, useMemo } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Text } from '@/components/shared/Text'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Calendar as CalendarIcon,
} from 'lucide-react'
import { PRIORITY, STATUS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { parseISO } from 'date-fns'

// This would typically be imported from a CSS file, but we're including it inline for this example
// In your project, add this to your styles and import 'react-big-calendar/lib/css/react-big-calendar.css'
const calendarStyles = `
  .rbc-calendar {
    height: 700px;
    font-family: inherit;
  }
  
  .rbc-toolbar {
    padding: 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .rbc-toolbar button {
    color: #6b7280;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 13px;
    font-weight: 500;
  }
  
  .rbc-toolbar button:hover {
    background-color: #f9fafb;
  }
  
  .rbc-toolbar button.rbc-active {
    background-color: #eff6ff;
    color: #4f46e5;
  }
  
  .rbc-toolbar-label {
    font-weight: 600;
    font-size: 16px;
    margin: 0 10px;
  }
  
  .rbc-header {
    padding: 8px 4px;
    font-weight: 500;
    font-size: 13px;
    color: #4b5563;
    background-color: #f9fafb;
  }
  
  .rbc-date-cell {
    padding: 4px;
    text-align: right;
    font-size: 12px;
    color: #6b7280;
  }
  
  .rbc-today {
    background-color: #f0f9ff;
  }
  
  .rbc-event {
    border-radius: 4px;
    font-size: 12px;
    padding: 2px 5px;
    margin: 1px 2px;
  }
  
  .rbc-event-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .rbc-event.urgent {
    background-color: rgba(239, 68, 68, 0.9);
    border: 1px solid rgb(239, 68, 68);
  }
  
  .rbc-event.high {
    background-color: rgba(249, 115, 22, 0.9);
    border: 1px solid rgb(249, 115, 22);
  }
  
  .rbc-event.medium {
    background-color: rgba(234, 179, 8, 0.9);
    border: 1px solid rgb(234, 179, 8);
  }
  
  .rbc-event.low {
    background-color: rgba(34, 197, 94, 0.9);
    border: 1px solid rgb(34, 197, 94);
  }
  
  .rbc-show-more {
    font-size: 11px;
    color: #4f46e5;
    padding: 2px 5px;
  }
  
  .rbc-day-slot .rbc-event {
    border: none;
  }
`

// Set up localizer for the calendar
const localizer = momentLocalizer(moment)

export const CalendarView = ({ tasks, onTaskSelect, selectedTask }) => {
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Format tasks for react-big-calendar
  const events = useMemo(() => {
    return tasks.map((task) => {
      const startDate = parseISO(task.startDate)
      const endDate = parseISO(task.dueDate)

      // Determine the event's class based on priority
      let priorityClass = 'medium'
      switch (task.priority) {
        case PRIORITY.URGENT:
          priorityClass = 'urgent'
          break
        case PRIORITY.HIGH:
          priorityClass = 'high'
          break
        case PRIORITY.MEDIUM:
          priorityClass = 'medium'
          break
        case PRIORITY.LOW:
          priorityClass = 'low'
          break
      }

      // For a real status indicator in the event title
      const statusEmoji = {
        [STATUS.TODO]: '⭕',
        [STATUS.IN_PROGRESS]: '🔄',
        [STATUS.BACKLOG]: '📋',
        [STATUS.DONE]: '✅',
      }

      return {
        id: task.id,
        title: task.title,
        start: startDate,
        end: endDate,
        allDay: true,
        resource: task,
        priorityClass,
        statusEmoji: statusEmoji[task.status],
      }
    })
  }, [tasks])

  // Custom components and configurations for the calendar
  const components = {
    // Customize event rendering
    event: ({ event }) => (
      <div
        className={`text-white text-xs font-medium flex items-center ${
          event.selected ? 'ring-2 ring-white' : ''
        }`}
      >
        <span className='mr-1'>{event.statusEmoji}</span>
        {event.title}
      </div>
    ),

    // Customize the toolbar
    toolbar: ({ label, onNavigate, onView, views }) => (
      <div className='flex justify-between items-center p-2 border-b'>
        <div className='flex items-center space-x-2'>
          <button
            onClick={() => onNavigate('PREV')}
            className='p-1 rounded-full hover:bg-gray-100'
          >
            <ChevronLeft className='w-5 h-5 text-gray-600' />
          </button>

          <span className='text-lg font-medium'>{label}</span>

          <button
            onClick={() => onNavigate('NEXT')}
            className='p-1 rounded-full hover:bg-gray-100'
          >
            <ChevronRight className='w-5 h-5 text-gray-600' />
          </button>

          <button
            onClick={() => onNavigate('TODAY')}
            className='ml-2 px-3 py-1 text-sm bg-white border rounded-md hover:bg-gray-50'
          >
            Today
          </button>
        </div>

        <div className='flex items-center space-x-2'>
          <div className='flex border rounded-md bg-gray-50 p-1'>
            {views.map((name) => (
              <button
                key={name}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  view === name
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setView(name)
                  onView(name)
                }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>

          <div className='relative inline-block'>
            <button className='flex items-center border rounded-md px-3 py-1 text-sm bg-white hover:bg-gray-50'>
              <CalendarIcon className='w-4 h-4 mr-1' />
              <span>More Options</span>
              <ChevronsUpDown className='w-3 h-3 ml-1' />
            </button>
          </div>
        </div>
      </div>
    ),

    // Custom day cell - can add more functionality here
    dateCellWrapper: ({ children, value }) => {
      const isToday = moment(value).isSame(new Date(), 'day')

      return <div className={`${isToday ? 'bg-blue-50' : ''}`}>{children}</div>
    },
  }

  // Apply custom styling to events based on priority
  const eventPropGetter = (event) => {
    return {
      className: event.priorityClass,
      style: {
        cursor: 'pointer',
      },
    }
  }

  if (!isClient) {
    return (
      <div className='bg-white rounded-lg p-8 flex items-center justify-center'>
        <Text style='text-gray-500'>Loading calendar...</Text>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-sm pb-4'>
      <style>{calendarStyles}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        defaultView='month'
        views={['month', 'week', 'day', 'agenda']}
        view={view}
        date={date}
        onNavigate={(date) => setDate(date)}
        onView={(view) => setView(view)}
        onSelectEvent={(event) => onTaskSelect(event.resource)}
        eventPropGetter={eventPropGetter}
        components={components}
        selectable
        popup
        showMultiDayTimes
      />
    </div>
  )
}
