import { cn } from '@/lib/utils'

export const Badge = ({ title, className }) => (
  <div
    className={cn(
      'p-2 rounded text-xs text-[#8f8f8f] bg-[#FFE8C8] min-w-[3rem] text-center',
      className
    )}
  >
    {title}
  </div>
)
