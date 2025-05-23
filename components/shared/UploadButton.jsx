// 'use client'

// import { useState } from 'react'
// import { useImageUpload } from '@/hooks/UploadImage.hook'
// import { UploadSvg, UploadedSvg } from '../svg'
// import { Text } from './Text'
// import { Loader } from 'lucide-react'
// import { cn } from '@/lib/utils'

// export const UploadButton = ({
//   handleChange,
//   label,
//   uploadBtnText = 'Click to upload',
//   topLabel,
//   id,
// }) => {
//   const { mutate: uploadFile, isPending } = useImageUpload()
//   const [isUploaded, setIsUploaded] = useState(false)

//   const handleFileOnChange = (file) => {
//     if (!file) return
//     uploadFile(file, {
//       onSuccess: ({ url }) => {
//         handleChange?.(url)
//         setIsUploaded(true)
//       },
//     })
//   }

//   return (
//     <div className='flex flex-col gap-2'>
//       {topLabel && <Text style='text-[14px] font-[500]'>{topLabel}</Text>}

//       <div className='flex flex-col gap-1'>
//         <label
//           htmlFor={`${id || label}-icon`}
//           className='cursor-pointer flex flex-col gap-1 w-fit'
//         >
//           <div
//             className={cn(
//               'w-fit h-[39px] px-6 rounded-[12px] flex items-center gap-3 bg-light-purple text-white',
//               isUploaded && 'bg_linear-purple',
//               isPending && 'bg-medium-purple'
//             )}
//           >
//             {isUploaded ? (
//               <UploadedSvg />
//             ) : isPending ? (
//               <Loader className='w-4 h-4 text-white animate-spin' />
//             ) : (
//               <UploadSvg />
//             )}
//             <span>
//               {isUploaded
//                 ? 'File Uploaded'
//                 : isPending
//                 ? 'Uploading File...'
//                 : uploadBtnText}
//             </span>
//           </div>
//         </label>
//         {label && <Text style='text-[10px] italic'>{label}</Text>}
//       </div>

//       <input
//         id={`${id || label}-icon`}
//         type='file'
//         onChange={(e) => handleFileOnChange(e.target.files?.[0])}
//         className='hidden'
//       />
//     </div>
//   )
// }
