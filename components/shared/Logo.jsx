'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'nextjs-toploader/app'
import { LogoSvg } from '../svg'

export const Logo = ({ style }) => {
  const router = useRouter()
  const navigateToHome = () => router.push('/')
  return (
    <div className={cn('w-[270px]', style)} onClick={navigateToHome}>
      <LogoSvg />
    </div>
  )
}
