import type { PropsWithChildren } from 'react'

type GlassCardProps = PropsWithChildren<{
  className?: string
}>

export default function GlassCard({ className, children }: GlassCardProps) {
  return (
    <div className={['glass rounded-2xl', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
