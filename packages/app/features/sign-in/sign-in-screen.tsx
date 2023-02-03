import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useDSAuth } from 'app/provider/auth/ds-auth-provider';
import { styled } from 'nativewind'
import { useEffect } from 'react';
import { Pressable } from 'react-native'

const StyledPressable = styled(Pressable);

export function SignInScreen() {

  const { isAuthenticated, loginWithRedirect, signUpWithRedirect } = useDSAuth();

  useEffect(() => {
    console.log("SignInScreen re-rendered");
  },[])

  return (
    <View className="flex-1 items-center justify-center">
        <H1 className='text-center font-bold text-2xl mb-6'>Sign-in Screen</H1>
        <StyledPressable className='bg-blue-700 rounded-lg text-sm px-5 py-2.5 mb-6' onPress={loginWithRedirect}>
          <Text className='text-white'>Sign In</Text>
        </StyledPressable>
        <StyledPressable className='bg-blue-700 rounded-lg text-sm px-5 py-2.5 mb-6' onPress={signUpWithRedirect}>
          <Text className='text-white'>Sign Up</Text>
        </StyledPressable>
      <Text>{"Authenticated: " + isAuthenticated.toString()}</Text>
    </View>
  )
}


