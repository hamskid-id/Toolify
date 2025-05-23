import { CustomImage } from '@/components/shared/Image'
import authBg from '../../public/authbg.avif'

export default function AuthLayout({ children }) {
  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      {/* Scrollable content area */}
      <div className='flex h-full md:w-[550px] w-full items-center justify-center overflow-y-auto lg:w-1/2'>
        <div className='w-full max-w-md px-4 py-8 my-auto'>{children}</div>
      </div>

      {/* Fixed background image (right side) */}
      <div className='fixed right-0 top-0 hidden h-full lg:block lg:w-1/2'>
        <CustomImage
          src={authBg}
          style='h-full w-full object-cover'
          alt='Authentication background'
          priority
        />
      </div>
    </div>
  )
}
