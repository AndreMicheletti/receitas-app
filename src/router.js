import React from 'react';
import {
  // createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Button } from 'react-native-elements';

import colors from './colors';
import SelectionScreen from './screens/SelectionScreen';
import RecipeListScreen from './screens/RecipeListScreen';

const RootNavigator = createStackNavigator({
  // Recipe List Screen
  recipeList: {
    screen: RecipeListScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Receitas',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.orange },
        headerRight: (
          <Button
            icon={{ name: 'search', size: 30, style: { marginRight: 0 } }}
            onPress={() => navigation.navigate('selection')}
            buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
          />
        ),
      };
    },
  },
  // Selection Screen
  selection: {
    screen: SelectionScreen,
    navigationOptions: {
      title: '',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.orange },
    },
  },
}, {
  // Options
  headerMode: 'float',
  lazy: true,
});

export default RootNavigator;
