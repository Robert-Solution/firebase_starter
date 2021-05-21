import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default function MessageRoom({ pic, title, message, onPress }) {
  return (
    <ListItem Component={TouchableOpacity} onPress={onPress}>
      <Avatar source={{ uri: pic }} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{message}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: '#3F3F3F',
  },
  subtitle: {
    fontSize: 12,

    color: '#A5A5A5',
  },
});
