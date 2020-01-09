import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Button } from 'react-native-elements';

import colors from './colors';
import SelectionScreen from './screens/SelectionScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import SavedRecipeScreen from './screens/SavedRecipeScreen';
import RecipeWebView from './screens/RecipeWebView';
import TutorialScreen from './screens/TutorialScreen';


const MainNavigator = createStackNavigator({
  // Recipe List Screen
  recipeList: {
    screen: RecipeListScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Receitas',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.orange },
        headerLeft: (
          <Button
            icon={{ name: 'search', size: 30, style: { marginRight: 0 } }}
            onPress={() => navigation.navigate('selection')}
            buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
          />
        ),
        headerRight: (
          <Button
            icon={{ name: 'ios-heart', size: 30, style: { marginRight: 0 }, type: 'ionicon' }}
            onPress={() => navigation.navigate('saved')}
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
  // Saved Recipes Screen
  saved: {
    screen: SavedRecipeScreen,
    navigationOptions: {
      title: 'Receitas salvas',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.orange },
    },
  },
  // Recipe Web view
  recipeView: {
    screen: RecipeWebView,
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.getParam('name', 'Ver receita'),
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.orange },
      };
    },
  },
}, {
  // Options
  headerMode: 'float',
  lazy: true,
});

const Tutorial = createStackNavigator({
  tutorial: {
    screen: TutorialScreen,
    navigationOptions: {
      title: '',
      header: null,
    },
  },
});

const RootNavigator = createSwitchNavigator({
  welcome: Tutorial,
  main: MainNavigator,
}, {
  initialRouteName: 'welcome',
});

export default RootNavigator;
