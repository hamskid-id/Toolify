import { cn } from '@/lib/utils'

export const MaxWidth = ({ children, className }) => {
  return <div className={cn('max-w-[1440px] m-auto', className)}>{children}</div>
}
