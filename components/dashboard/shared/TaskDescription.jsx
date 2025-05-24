'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'nextjs-toploader/app'
import { Maximize2, Paperclip, X } from 'lucide-react'
import AvatarStack from '@/components/shared/AvatarStack'
import { Text } from '@/components/shared/Text'
import { Badge } from '@/components/shared/Badge'
import { CustomImage } from '@/components/shared/Image'
import UserAvatar from '@/components/shared/UserAvatar'

export const TasksDescription = ({ tasks }) => {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [attachedFiles, setAttachedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (attachedFiles.length === 0) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('taskId', tasks.id)
      attachedFiles.forEach((file) => {
        formData.append('files', file)
      })

      const response = await fetch('/api/tasks/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (response.ok) {
        setAttachedFiles([])
        // Optionally refresh the task data
      } else {
        throw new Error(result.message || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col bg-white p-6 rounded-md h-full'>
      {/* Task Header */}
      <div className='flex justify-between items-start mb-6'>
        <div>
          <Text style='text-2xl font-medium mb-1'>{tasks?.title}</Text>
        </div>
        <button
          onClick={() => router.push(`/dashboard/tasks/${tasks.id}`)}
          className='p-2 hover:bg-gray-100 rounded-full'
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Task Metadata Grid */}
      <div className='grid grid-cols-1 gap-3 mb-8'>
        <div className='space-y-4'>
          <DetailItem label='Project' value={tasks?.owner} />
          <DetailItem label='Start Date' value={tasks?.startDate} />
          <DetailItem label='Target Date' value={tasks?.dueDate} />
          <DetailItem
            label='Priority'
            value={<Badge title={tasks?.priority} className='w-fit' />}
          />
        </div>
        <div className='space-y-4'>
          <DetailItem
            label='Assignee'
            value={
              <UserAvatar
                imageSrc={tasks?.assignees[0]?.image}
                name={tasks?.assignees[0]?.name}
                size={32}
              />
            }
          />
          <DetailItem
            label='Collaborators'
            value={<AvatarStack members={tasks?.assignees} size={32} />}
          />
        </div>
      </div>

      {/* Attached Files */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mb-2'>
          <Text style='text-lg font-medium'>Attached Files</Text>
          <div className='flex gap-2'>
            <button
              onClick={() => fileInputRef.current.click()}
              className='flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800'
            >
              <Paperclip size={16} />
              Attach File
            </button>
            {attachedFiles.length > 0 && (
              <button
                onClick={uploadFiles}
                disabled={isUploading}
                className='flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-blue-300'
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </button>
            )}
          </div>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
            multiple
          />
        </div>

        <div className='flex flex-wrap gap-4'>
          {attachedFiles.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const DetailItem = ({ label, value }) => (
  <div className='flex'>
    <Text style='text-sm text-gray-500 w-28'>{label}</Text>
    <div className='flex-1'>
      {typeof value === 'string' ? (
        <Text style='text-sm font-medium'>{value}</Text>
      ) : (
        value
      )}
    </div>
  </div>
)

const FilePreview = ({ file, onRemove, onClick }) => {
  const isImage = file.type?.startsWith('image/')
  const fileIcon = (
    <div className='flex flex-col items-center justify-center h-full'>
      <Paperclip size={24} />
      <span className='text-xs mt-1 text-center line-clamp-1'>{file.name}</span>
    </div>
  )

  return (
    <div className='relative group'>
      <div
        onClick={onClick}
        className={`h-24 w-24 border rounded-md overflow-hidden cursor-pointer ${
          isImage ? '' : 'flex items-center justify-center bg-gray-50 p-2'
        }`}
      >
        {isImage ? (
          <CustomImage
            src={URL.createObjectURL(file)}
            style='h-full w-full object-cover'
            alt={file.name}
          />
        ) : (
          fileIcon
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
      >
        <X size={14} color='white' />
      </button>
      {!isImage && (
        <div className='text-xs text-gray-500 mt-1 text-center line-clamp-1'>
          {file.name}
        </div>
      )}
    </div>
  )
}
