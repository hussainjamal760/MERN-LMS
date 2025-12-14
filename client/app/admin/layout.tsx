// client/app/admin/layout.tsx
import { ReactNode } from 'react'

// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  return <>{children}</>
}