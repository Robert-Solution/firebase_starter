import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initApp } from '../store/reducer';

const Stack = createStackNavigator();

function RootNavigate() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state);

  React.useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigate;
