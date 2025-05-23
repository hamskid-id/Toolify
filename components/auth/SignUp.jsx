'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { SignUpFormSchema } from '@/lib/schema/SignUp'
import { InputField } from '../custom-ui/InputField'
import { PasswordInput } from '../custom-ui/PasswordField'
import { AuthLayout } from './AuthLayout'
import { useRouter } from 'nextjs-toploader/app'

export const SignUpForm = () => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      pwd: '',
      cpwd: '',
      email: '',
    },
  })

  const onSubmit = (values) => {
    console.log(values)
    router.push("/dashboard")
  }

  return (
    <AuthLayout
      title='Sign Up'
      subTitle='Create an account to get started with us.'
      footerText={`Already have an account?`}
      footerLink='/auth/signin'
      footerLinkTitle='Sign In'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-4'
        >
          <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
            <InputField
              control={form.control}
              name='first_name'
              placeholder='Enter your first name'
              inputCategory='input'
              inputType='text'
            />
            <InputField
              control={form.control}
              name='last_name'
              placeholder='Enter your last name'
              inputCategory='input'
              inputType='text'
            />
          </div>
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
                'Create Account'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
