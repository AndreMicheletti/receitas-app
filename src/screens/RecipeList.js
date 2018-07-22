import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchRecipes, fetchRecipesAll } from '../actions/recipesActions';
import RecipeCard from '../components/RecipeCard';

class RecipeList extends React.PureComponent {
  static navigationOptions = {
    title: 'Receitas',
  };

  componentDidMount() {
    let selectedList = this.props.ingredients.list.filter(i => i.selected);
    if (selectedList && selectedList.length > 0) {
      this.props.fetchRecipes({
        ingredients: selectedList.map(i => i.name)
      })
    } else {
      this.props.fetchRecipesAll()
    }
  }

  renderIngredientButtons(list) {
    return list.map((ingredient, i) => {
      return (
        <Button key={i} raised title={ingredient.name} />
      );
    });
  }

  renderSelectedIngredients() {
    let selectedList = this.props.ingredients.list.filter(i => i.selected);
    if (selectedList && selectedList.length > 0) {
      return (
        <View style={{ flex: 1, paddingBottom: 8 }}>
          <ScrollView
            style={styles.ingredientsView}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {this.renderIngredientButtons(selectedList)}
          </ScrollView>
        </View>
      );
    }
  }

  renderRecipes() {
    const { list, loading } = this.props.recipes;
    if (loading) {
      return (
        <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color="#000" />
        </View>
      );
    }
    return (
      <View style={{ flex: 9, paddingBottom: 10 }}>
        <ScrollView>
          {list.map((recipe, i) => {
            return (
              <RecipeCard key={i} data={recipe} />
            );
          })}
        </ScrollView>
      </View>
    );
  }

  render() {
    const { list, loading } = this.props.ingredients;
    return (
      <View style={styles.screenStyle}>
        {this.renderSelectedIngredients()}
        {this.renderRecipes()}
      </View>
    )
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  ingredientsView: {
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
  },
  recipeCardsView: {}
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    recipes: state.recipes
  }
}

export default connect(mapStateToProps, {
  fetchRecipes,
  fetchRecipesAll
})(RecipeList);
