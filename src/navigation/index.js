import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from './RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { initApp } from '../store/reducer';
import { Icon } from 'react-native-elements';
import AppStyles from '../assets/styles';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Messages from '../screens/Messages';
import Chat from '../screens/Chat';
import Register from '../screens/Register';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MessagesStack = createStackNavigator();

function HomeNavigate() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen component={Home} name="Home" />
    </HomeStack.Navigator>
  );
}
function ProfileNavigate() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen component={Profile} name="Profile" />
    </ProfileStack.Navigator>
  );
}
function MessagesNavigate() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        component={Messages}
        name="Messages"
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        component={Chat}
        name="Chat"
        options={({ route }) => ({
          title: route.params.thread.title,
        })}
      />
    </MessagesStack.Navigator>
  );
}

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ showLabel: false }}
      lazy>
      <Tab.Screen
        component={ProfileNavigate}
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              type="feather"
              color={
                focused ? AppStyles.color.tint : AppStyles.color.placeholder
              }
            />
          ),
        }}
      />
      <Tab.Screen
        component={HomeNavigate}
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="droplet"
              type="feather"
              color={
                focused ? AppStyles.color.tint : AppStyles.color.placeholder
              }
            />
          ),
        }}
      />
      <Tab.Screen
        component={MessagesNavigate}
        name="Messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="message-circle"
              type="feather"
              color={
                focused ? AppStyles.color.tint : AppStyles.color.placeholder
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigate() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state);

  React.useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <RootStack.Screen name="MainTab" component={MainTab} />
        ) : (
          <>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="Register" component={Register} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigate;
