import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchRecipes, fetchRecipesAll } from '../actions/recipesActions';
import RecipeCard from '../components/RecipeCard';
import colors from '../colors';


const SCREEN_WIDTH = Dimensions.get('window').width;


class RecipeListScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Receitas',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: colors.orange}
  }

  componentDidMount() {
    setTimeout(() => {
      const { selectedCategory } = this.props.recipes;
      let selectedList = this.props.ingredients.list.filter(i => i.selected);

      if (selectedList && selectedList.length > 0) {
        this.props.fetchRecipes(selectedCategory, {
          ingredients: selectedList.map(i => i.name)
        })
      } else {
        this.props.fetchRecipesAll(selectedCategory);
      }
    }, 200);
  }

  renderIngredientButtons(list) {
    return list.map((ingredient, i) => {
      return (
        <Button
          key={i} raised
          title={ingredient.name}
          buttonStyle={{ backgroundColor: colors.orange }}
          textStyle={{ fontSize: 18, color: 'white' }}
        />
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

  renderRecipesView() {
    const { list, loading } = this.props.recipes;
    if (loading) {
      return (
        <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color="#000" />
        </View>
      );
    }
    return (
      <FlatList
        data={list}
        renderItem={({item}) => <RecipeCard data={item} />}
        keyExtractor={(recipe, index) => `${recipe._id.$oid}`}
        ListEmptyComponent={(
          <View style={{ flex: 9, top: (SCREEN_WIDTH / 2.0) }}>
            <Text style={{ fontSize: 24 }}>
              {"Nenhuma receita encontrada"}
            </Text>
          </View>
        )}
      />
    );
  }

  render() {
    const { list, loading } = this.props.ingredients;
    return (
      <View style={styles.screenStyle}>
        {this.renderSelectedIngredients()}
        <View style={{ flex: 9, paddingBottom: 10 }}>
          {this.renderRecipesView()}
        </View>
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  ingredientsView: {
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
  }
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
})(RecipeListScreen);
