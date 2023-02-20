import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CustomHomeScreen } from 'app/features/home/custom-home-screen';
import { SignInScreen } from 'app/features/sign-in/sign-in-screen';
import { SplashScreen } from 'app/features/sign-in/splash-screen';
import { useDSAuth } from 'app/provider/auth/ds-auth-provider';

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

type RootStackParamList = {
  home: undefined;
  "user-detail": { id: string };
  "sign-in": undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function NativeNavigation() {

  const { isMobileLoading, isAuthenticated } = useDSAuth();

  const AuthenticatedNavigator = 
  (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }} />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }} />
    </Stack.Navigator>
  );

  const NotAuthenticatedNavigator =
    (
      <Stack.Navigator>
        <Stack.Screen name="sign-in"
          component={SignInScreen} options={{
            title: "Sign In"
          }} />
      </Stack.Navigator>)

  if (isMobileLoading) {
    return <SplashScreen />;
  }

  return (isAuthenticated ? AuthenticatedNavigator : NotAuthenticatedNavigator);
}
