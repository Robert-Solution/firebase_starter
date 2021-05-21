/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  View,
  Dimensions,
  Image,
} from 'react-native';
import AppStyles from '../assets/styles';
import { Divider, Icon, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducer';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
);

export default function Profile(props) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});
  console.log('user: ', user);
  const { email, fullname } = useSelector(state => state);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      // if (!user.emailVerified) {
      //   auth().signOut();
      // }
    }
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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/400/600' }}
          style={styles.image}
        />
      </View>
      <Text h4 style={styles.name}>
        {fullname}
      </Text>
      <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>
        I love to travel. I have a cat named pickles. If he likes you, I
        probably will too.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>Find me on Social here</Text>
      <View style={styles.socialLinks}>
        <Social name="snapchat" />
        <Social name="instagram" />
        <Social name="facebook-square" />
      </View>
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => dispatch(logout())}>
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>

    // <SafeAreaView style={styles.container}>
    //   <Text style={styles.title}>Hello {fullname}</Text>
    //   <Text>Email: {email}</Text>
    //   {user.emailVerified ? (
    //     <Text>Email has been verify</Text>
    //   ) : (
    //     <View>
    //       <Text>Please verify your email</Text>
    //       {/* <Button title="Re-send" /> */}
    //     </View>
    //   )}
    //   <TouchableOpacity
    //     style={styles.loginContainer}
    //     onPress={() => dispatch(logout())}>
    //     <Text style={styles.loginText}>Log Out</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: width - 60, // device width - some margin
    height: height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
});
