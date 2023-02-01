import { View } from 'app/design/view'
import { ActivityIndicator } from 'react-native'

export function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      {/* loading spinner's color corresponds to tailwind's bg-blue-700 */}
      <ActivityIndicator size="large" color="#2b6cb0"/>
    </View>
  )
}