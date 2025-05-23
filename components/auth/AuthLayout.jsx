'use client'

import Link from 'next/link'
import { Logo } from '../shared/Logo'
import { Text } from '../shared/Text'
import { GoogleSvg } from '../svg'
import { Button } from '../ui/button'

const OrSeparator = () => (
  <div className='flex items-center w-full '>
    <div className='flex-grow h-px bg-gradient-to-r from-gray-300 to-transparent'></div>
    <span className='mx-4 text-sm font-medium text-gray-500'>OR</span>
    <div className='flex-grow h-px bg-gradient-to-l from-gray-300 to-transparent'></div>
  </div>
)

const FooterText = ({ footerText, footerLink, footerLinkTitle }) => (
  <div className='text-center text-lg text-gray-600 '>
    {footerText}
    <Link
      href={footerLink}
      className=' ms-2 font-medium text-primary hover:text-primary-500 hover:underline transition-colors'
    >
      {footerLinkTitle}
    </Link>
  </div>
)

const GoogleSignIn = () => (
  <Button className='h-[50px] rounded-sm w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-grey-400 shadow-none bg-white text-gray-700 hover:bg-none'>
    <GoogleSvg />
    <span className='font-medium text-[19px] text-[#8f8f8f]'>
      Sign in with Google
    </span>
  </Button>
)

export const AuthLayout = ({
  children,
  title,
  subTitle,
  footerText,
  footerLink,
  footerLinkTitle,
  showOAuth = true,
}) => {
  return (
    <div className=' gap-4 w-full flex flex-col justify-center items-center my-auto'>
      <Logo />
      <Text
        as='h1'
        style='md:text-[35px] text-[34px] font-[400] leading-[100%]'
      >
        {title}
      </Text>
      <Text as='h1' style='text-lg text-[#8f8f8f] text-center'>
        {subTitle}
      </Text>
      {showOAuth && (
        <div className='gap-4 w-full flex flex-col justify-center items-center my-auto'>
          <GoogleSignIn />
          <OrSeparator />
        </div>
      )}
      {children}
      {footerText && (
        <div className='flex justify-center'>
          <FooterText
            footerText={footerText}
            footerLink={footerLink}
            footerLinkTitle={footerLinkTitle}
          />
        </div>
      )}
    </div>
  )
}
