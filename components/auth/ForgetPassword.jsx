'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputField } from '../custom-ui/InputField'
import { AuthLayout } from './AuthLayout'
import { ForgetpasswordFormSchema } from '@/lib/schema/ForgetPassword'

export const ForgetPasswordForm = () => {
  const [isPending, setIsPending] = useState(false)

  const form = useForm({
    resolver: zodResolver(ForgetpasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <AuthLayout
      title='Forgot Password'
      subTitle={`Enter the email address you used to create the account to receive instructions on how to reset your password`}
      footerText={`Remember your password?`}
      footerLink='/auth/signup'
      footerLinkTitle='Sign Up'
      showOAuth={false}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-4'
        >
          <InputField
            control={form.control}
            name='email'
            placeholder='Enter your email address'
            inputCategory='input'
            inputType='email'
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
