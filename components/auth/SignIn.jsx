'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputField } from '../custom-ui/InputField'
import { PasswordInput } from '../custom-ui/PasswordField'
import { AuthLayout } from './AuthLayout'
import { SignInFormSchema } from '@/lib/schema/SignIn'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'

export const SignInForm = () => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      pwd: '',
      email: '',
    },
  })

  const onSubmit = (values) => {
    console.log(values)
    router.push("/dashboard")
  }

  return (
    <AuthLayout
      title='Sign In'
      subTitle={`Welcome back, you've been missed!`}
      footerText={`Don't have an account?`}
      footerLink='/auth/signup'
      footerLinkTitle='Sign Up'
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
          <PasswordInput
            control={form.control}
            name='pwd'
            placeholder='Create Password'
          />
          <Link
            href={'/auth/forget-password'}
            className='font-medium text-primary hover:text-primary-500 hover:underline transition-colors'
          >
            Forgot Password ?
          </Link>
          <div className='flex flex-col gap-5'>
            <Button
              disabled={isPending}
              className='mb-4 h-[50px] rounded-sm flex items-center justify-center bg-[#1B3A4B] text-white font-medium text-lg w-full'
            >
              {isPending ? (
                <Loader className='w-5 h-5 text-white animate-spin' />
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
