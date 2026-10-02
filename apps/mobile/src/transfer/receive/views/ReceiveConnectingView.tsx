import React, { PropsWithChildren } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { ExternalLink, useTheme } from '@altersend/components'
import { getConnectingStatusCopy, useSubscriptionStore, useTransferStore } from '@altersend/domain'
import { Trans, useTranslation } from '@altersend/locales'
import { IllustrationLayout } from '@/src/components'
import ConnectingSvg from '../../../../../../assets/connecting.svg'
import { Text } from '@/src/components/ThemedText'

interface ReceiveConnectingViewProps {
  title: string
  description: string
  footer?: React.ReactElement
  onMenuPress?: () => void
}

export function ReceiveConnectingView({
  title,
  description,
  footer,
  onMenuPress,
  children
}: PropsWithChildren<ReceiveConnectingViewProps>) {
  const { t } = useTranslation(['receive'])
  const { theme } = useTheme()
  const router = useRouter()
  const relayBusy = useTransferStore((s) => s.relayBusy)
  const isPro = useSubscriptionStore((s) => s.active)
  const status = getConnectingStatusCopy(t, relayBusy)

  return (
    <IllustrationLayout
      title={title}
      description={description}
      footer={footer}
      onMenuPress={onMenuPress}
      illustration={<ConnectingSvg width='100%' height='100%' />}
      aspectRatio={960 / 418.531}
    >
      <View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.colorBackgroundSubtle,
            borderColor: theme.colors.colorBorderPrimary
          }
        ]}
      >
        <View style={styles.content}>
          <ActivityIndicator color={theme.colors.colorAccent} size='small' />
          <View style={styles.textWrap}>
            <Text style={[styles.title, { color: theme.colors.colorTextPrimary }]}>
              {status.title}
            </Text>
            <Text style={[styles.description, { color: theme.colors.colorTextSecondary }]}>
              {status.description}
            </Text>
            {relayBusy && !isPro ? (
              <Text
                style={[
                  styles.description,
                  styles.proOffer,
                  { color: theme.colors.colorTextSecondary }
                ]}
              >
                <Trans
                  ns='receive'
                  i18nKey='page.relayBusy.proOffer'
                  components={{
                    pro: <ExternalLink inline onPress={() => router.push('/account')} />
                  }}
                />
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      {children}
    </IllustrationLayout>
  )
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  textWrap: {
    flex: 1,
    gap: 4
  },
  title: {
    fontSize: 15,
    fontWeight: '600'
  },
  description: {
    fontSize: 14,
    lineHeight: 20
  },
  proOffer: {
    marginTop: 6
  }
})
