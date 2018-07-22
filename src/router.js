import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import SelectionScreen from './screens/SelectionScreen';
import RecipeListScreen from './screens/RecipeListScreen';

const RootNavigator = createStackNavigator({
  selection: { screen: SelectionScreen },
  recipeList: { screen: RecipeListScreen }
})

export default RootNavigator;
