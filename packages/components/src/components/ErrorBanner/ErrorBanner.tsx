import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './styles'

export interface ErrorBannerProps {
  message: string | null | undefined
  action?: ReactNode
}

export function ErrorBanner({ message, action }: ErrorBannerProps) {
  if (!message) return null
  return (
    <html.div style={styles.banner}>
      <html.p style={styles.message}>{message}</html.p>
      {action ? <html.div style={styles.action}>{action}</html.div> : null}
    </html.div>
  )
}
