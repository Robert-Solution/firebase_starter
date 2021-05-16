/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import RootNavigate from './navigation';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <RootNavigate />
    </Provider>
  );
}

export default App;
