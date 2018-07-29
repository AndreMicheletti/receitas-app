import React from 'react';
import { View, UIManager, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import colors from './src/colors';
import reduxConfig from './src/store';
import RootNavigator from './src/router';

export default class App extends React.PureComponent {

  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={reduxConfig.store}>
        <PersistGate
          persistor={reduxConfig.persistor}
          loading={(
            <View style={styles.loadingScreenStyle}>
              <ActivityIndicator color='white' size={30} />
            </View>
          )}
        >
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = {
  loadingScreenStyle: {
    flex: 1,
    backgroundColor: colors.orage,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
