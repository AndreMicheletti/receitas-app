import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import RootNavigator from './src/router';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
