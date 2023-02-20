import { Pressable } from 'app/design/pressable';
import { A, H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useDSAuth } from 'app/provider/auth/ds-auth-provider';

function AuthButton({buttonText, onPress}: {buttonText: string, onPress: () => void}) {
  return (
     <Pressable className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onPress={onPress}>
      <Text className=' text-white'>{buttonText}</Text>
     </Pressable>
  )
}

export function SignInScreen() {

  const { isAuthenticated, loginWithRedirect, signUpWithRedirect } = useDSAuth();

  return (
    <View className="flex-1 items-center justify-center">
      <H1 className='text-center text-2xl mb-6'>Sign-in Screen</H1>
      <View className='flex flex-col space-y-4 mb-6'>
          <AuthButton buttonText='Sign in' onPress={loginWithRedirect}></AuthButton>
        <AuthButton buttonText='Sign up' onPress={signUpWithRedirect}></AuthButton>
      </View>
      <Text>{"Authenticated: " + isAuthenticated.toString()}</Text>
    </View>
  )
}


