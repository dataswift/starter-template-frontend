import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useDSAuth } from 'app/provider/auth/ds-auth-provider'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {

  const { isAuthenticated } = useDSAuth();

  const [id] = useParam('id');

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-center font-bold">{`User ID: ${id}`}</Text>
      <TextLink href="/">👈 Go Home</TextLink>
      <Text className="mt-4">{"Authenticated: " + isAuthenticated.toString()}</Text>
    </View>
  )
}
