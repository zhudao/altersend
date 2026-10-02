import { describe, expect, it } from 'vitest'
import { getConnectingStatusCopy, getReceiveStep } from './pageUi'

const receiving = {
  hasIncomingFiles: true,
  allDownloadsCompleted: false,
  role: 'receiver' as const,
  peerCount: 0
}

describe('getReceiveStep after the peer drops', () => {
  it('retries first, then settles by cause', () => {
    expect(getReceiveStep(receiving)).toBe('reconnecting')
    expect(getReceiveStep({ ...receiving, reconnectExhausted: true })).toBe('interrupted')
    expect(getReceiveStep({ ...receiving, sessionEndedByPeer: true })).toBe('session_ended')
    expect(getReceiveStep({ ...receiving, allDownloadsCompleted: true })).toBe('completed')
  })
})

describe('getConnectingStatusCopy', () => {
  const t = (key: string) => key

  it('shows the handshake while the relay is fine', () => {
    expect(getConnectingStatusCopy(t, false).title).toBe('receive:page.handshake.title')
  })

  it('says it is still trying while the relay is busy', () => {
    expect(getConnectingStatusCopy(t, true)).toEqual({
      title: 'receive:page.relayBusy.title',
      description: 'receive:page.relayBusy.description'
    })
  })
})
