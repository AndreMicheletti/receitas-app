import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import SelectIngredients from './screens/SelectIngredients';
import RecipeList from './screens/RecipeList';

const RootNavigator = createStackNavigator({
  searchIngredients: { screen: SelectIngredients },
  recipeList: { screen: RecipeList }
})

export default RootNavigator;
