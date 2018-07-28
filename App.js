import React from 'react';
import { UIManager } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import RootNavigator from './src/router';

export default class App extends React.PureComponent {

  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
