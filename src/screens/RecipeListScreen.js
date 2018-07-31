import React from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchRecipes, fetchRecipesAll, openRecipeUrl } from '../actions/recipesActions';
import RecipeCard from '../components/RecipeCard';
import IngredientList from '../components/IngredientList';
import colors from '../colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RecipeListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { showingMore: false };
  }

  componentDidMount() {
    const { selectedCategory } = this.props.recipes;
    const { selected } = this.props.ingredients;

    if (selected && selected.length > 0) {
      this.props.fetchRecipes(selectedCategory, selected);
    } else {
      this.props.fetchRecipesAll(selectedCategory);
    }
  }

  onShowMore() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ showingMore: true });
  }

  onOpenRecipe(name, url) {
    // this.props.openRecipeUrl(url);
    this.props.navigation.navigate('recipeView', { name, url });
  }

  renderRecipeCard(item, index) {
    if (index > 0 && !this.state.showingMore) return null;
    return (
      <RecipeCard
        hidden={false}
        data={item}
        onOpenRecipe={(name, url) => this.onOpenRecipe(name, url)}
      />
    );
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
        renderItem={({ item, index }) => this.renderRecipeCard(item, index)}
        keyExtractor={(recipe, i) => `${i}:${recipe.id}`}
        ListEmptyComponent={(
          <View style={styles.centerStyle}>
            <Text style={{ fontSize: 20 }}>
              {'Nenhuma receita encontrada'}
            </Text>
            <Text style={{ fontSize: 20, paddingTop: 10 }}>
              {'=('}
            </Text>
          </View>
        )}
      />
    );
  }

  render() {
    const { list, loading } = this.props.recipes;
    const { showingMore } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.screenStyle}>
          <View style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
            <IngredientList style={{ height: 70 }} removable={false} />
          </View>
          <View style={{ flex: 9, paddingBottom: 10 }}>
            {this.renderRecipesView()}
          </View>
        </View>
        {!loading && !showingMore && list.length > 0 && (
          <View style={styles.showingMoreStyle}>
            <Button
              title="Ver mais"
              containerStyle={{ width: SCREEN_WIDTH, padding: 0, margin: 0 }}
              buttonStyle={{ width: SCREEN_WIDTH, backgroundColor: colors.pink, padding: 12 }}
              textStyle={{ fontSize: 18 }}
              onPress={() => this.onShowMore()}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  showingMoreStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    padding: 0,
    margin: 0,
    bottom: 0,
    left: -15,
  },
  centerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    recipes: state.recipes,
  };
};

export default connect(mapStateToProps, {
  fetchRecipes,
  fetchRecipesAll,
  openRecipeUrl,
})(RecipeListScreen);
