import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import HomeScreenPics from '../mock/pics';
import SwipeCard from '../components/SwipeCard';
import Swiper from 'react-native-deck-swiper';

function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        cards={HomeScreenPics}
        renderCard={SwipeCard}
        infinite
        // keyExtractor={(_, index) => index.toString()}
        backgroundColor="white"
        cardHorizontalMargin={0}
        cardVerticalMargin={20}
        stackSize={2}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default Home;
