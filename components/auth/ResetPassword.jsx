'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { PasswordInput } from '../custom-ui/PasswordField'
import { AuthLayout } from './AuthLayout'
import { ResetPasswordFormSchema } from '@/lib/schema/ResetPassword'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

export const ResetPasswordForm = () => {
  const [isPending, setIsPending] = useState(false)

  const form = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      pwd: '',
      cpwd: '',
    },
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <AuthLayout
      title='Reset Password'
      subTitle='Enter the new password details'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-4'
        >
          <PasswordInput
            control={form.control}
            name='pwd'
            placeholder='Create New Password'
          />
          <PasswordInput
            control={form.control}
            name='cpwd'
            placeholder='Confirm Password'
          />
          <div className='flex flex-col gap-5'>
            <Button
              disabled={isPending}
              className='mb-4 h-[50px] rounded-sm flex items-center justify-center bg-[#1B3A4B] text-white font-medium text-lg w-full'
            >
              {isPending ? (
                <Loader className='w-5 h-5 text-white animate-spin' />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
