import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native';
import MessageRoom from '../components/MessageRoom';
import messages from '../mock/messages';

function Messages({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <MessageRoom
        {...item}
        onPress={() => navigation.navigate('Chat', { thread: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={messages}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 22,
    color: '#3F3F3F',
  },
  subtitle: {
    fontSize: 12,

    color: '#A5A5A5',
  },
});

export default Messages;
