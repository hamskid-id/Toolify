'use client'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { EyeClosed, EyeIcon } from 'lucide-react'
export const PasswordInput = ({
  defaultValue,
  name,
  control,
  placeholder,
  inputStyle,
  labelStyle,
  label,
}) => {
  const [passwordType, setPasswordType] = useState('password')
  const handleChange = () =>
    setPasswordType((prevState) =>
      prevState === 'password' ? 'text' : 'password'
    )
  const inputCnStyle = cn(
    `md:text-md text-md font-[400] border border-grey-400 h-[50px] rounded-sm flex items-center shadow-none`,
    inputStyle
  )

  const inputLabelStyle = cn(`text-[14px] font-[500]`, labelStyle)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className={inputLabelStyle}>{label}</FormLabel>}
          <div className='relative'>
            <span>
              <FormControl>
                <Input
                  className={inputCnStyle}
                  placeholder={placeholder}
                  {...field}
                  type={passwordType}
                  defaultValue={defaultValue}
                />
              </FormControl>
            </span>
            <span
              onClick={handleChange}
              className='w-[40px]  text-[11.04px] font-[400] text-white rounded-[9.46px] absolute top-[4px] bottom-[4px] right-[4px] cursor-pointer flex justify-center items-center'
            >
              {passwordType === 'password' ? (
                <EyeIcon className='text-[#8f8f8f]' />
              ) : (
                <EyeClosed className='text-[#8f8f8f]' />
              )}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
