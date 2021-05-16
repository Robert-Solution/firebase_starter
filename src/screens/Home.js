/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppStyles from '../assets/styles';

import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducer';

export default function Home(props) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});
  const { email, fullname } = useSelector(state => state);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    if (user) setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello {fullname}</Text>
      <Text>Email: {email}</Text>
      {user.emailVerified ? (
        <Text>Email has been verify</Text>
      ) : (
        <Text>Please verify your email</Text>
      )}
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => dispatch(logout())}>
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
    textAlign: 'center',
  },

  spinner: {
    marginTop: 200,
  },
});
