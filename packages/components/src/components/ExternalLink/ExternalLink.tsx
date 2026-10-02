import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './styles'

export type ExternalLinkProps = {
  href?: string
  onPress?: () => void
  children?: ReactNode
  icon?: ReactNode
  inline?: boolean
  style?: Parameters<typeof html.a>[0]['style']
}

export function ExternalLink({
  href,
  onPress,
  children,
  icon,
  inline = false,
  style
}: ExternalLinkProps) {
  return (
    <html.a
      href={onPress ? undefined : href}
      target={onPress ? undefined : '_blank'}
      rel={onPress ? undefined : 'noopener noreferrer'}
      onClick={onPress}
      style={[inline ? styles.inline : styles.link, style ?? null]}
    >
      {children}
      {icon && <html.span style={styles.icon}>{icon}</html.span>}
    </html.a>
  )
}
