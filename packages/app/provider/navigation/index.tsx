import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            screens: {
              home: '',
              'user-detail': 'user/:id',
              'sign-in': 'sign-in',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
