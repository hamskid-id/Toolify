'use client'

import { Text } from '@/components/shared/Text'
import { Line } from 'react-chartjs-2'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const Statistics = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [currentDateRange, setCurrentDateRange] = useState({
    start: new Date(new Date().getFullYear(), 6, 1), // July 1
    end: new Date(new Date().getFullYear(), 6, 10), // July 10
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const generateDayLabels = () => {
    const labels = []
    const currentDate = new Date(currentDateRange.start)

    while (currentDate <= currentDateRange.end) {
      labels.push(
        currentDate.toLocaleString('default', {
          month: 'short',
          day: 'numeric',
        })
      )
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return labels
  }

  const navigateDays = (direction) => {
    const daysToAdd = direction === 'next' ? 10 : -10
    const newStart = new Date(currentDateRange.start)
    newStart.setDate(newStart.getDate() + daysToAdd)

    const newEnd = new Date(currentDateRange.end)
    newEnd.setDate(newEnd.getDate() + daysToAdd)

    setCurrentDateRange({
      start: newStart,
      end: newEnd,
    })
  }

  const data = {
    labels: generateDayLabels(),
    datasets: [
      {
        label: 'Created',
        data: [12, 19, 15, 27, 22, 18, 25, 20, 30, 28],
        fill: {
          target: 'origin',
          above: 'rgba(75, 192, 192, 0.2)',
        },
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Completed',
        data: [8, 15, 10, 20, 18, 12, 22, 15, 25, 20],
        fill: false,
        borderColor: 'rgb(143, 143, 143)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        cubicInterpolationMode: 'monotone',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }

  if (!isMounted) return null

  return (
    <div className='h-full flex-grow'>
      <div className='flex justify-between items-end mb-4'>
        <div>
          <Text as='h1' style='text-lg font-medium'>
            Statistics
          </Text>
          <Text as='h3' style='text-sm text-[#8f8f8f]'>
            tasks created vs tasks completed
          </Text>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => navigateDays('prev')}
            className='p-1 hover:bg-gray-100 rounded-full'
          >
            <ChevronLeft className='w-4 h-4' />
          </button>
          <button
            onClick={() => navigateDays('next')}
            className='p-1 hover:bg-gray-100 rounded-full'
          >
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>
      </div>
      <div className='relative h-[250px]'>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
