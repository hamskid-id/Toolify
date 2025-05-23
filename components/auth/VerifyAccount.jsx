'use client'

import { Button } from '@/components/ui/button'
import { AuthLayout } from './AuthLayout'

export const VerifyAccountForm = () => {
  return (
    <AuthLayout
      title='Verification SuccessFull!'
      subTitle={`You can proceed to sign in.`}
      showOAuth={false}
    >
      <Button className='mb-4 h-[50px] rounded-sm flex items-center justify-center bg-[#1B3A4B] text-white font-medium text-lg w-full'>
        Continue
      </Button>
    </AuthLayout>
  )
}
