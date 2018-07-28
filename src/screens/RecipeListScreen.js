import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchRecipes, fetchRecipesAll } from '../actions/recipesActions';
import RecipeCard from '../components/RecipeCard';
import colors from '../colors';


const SCREEN_WIDTH = Dimensions.get('window').width;


class RecipeListScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { showingMore: false };
  }

  componentDidMount() {
    setTimeout(() => {
      const { selectedCategory } = this.props.recipes;
      const selectedList = this.props.ingredients.list.filter(i => i.selected);

      if (selectedList && selectedList.length > 0) {
        this.props.fetchRecipes(selectedCategory, {
          ingredients: selectedList.map(i => i.name),
        });
      } else {
        this.props.fetchRecipesAll(selectedCategory);
      }
    }, 200);
  }

  onShowMore() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ showingMore: true });
  }

  renderIngredientButtons(list) {
    return list.map((ingredient) => {
      return (
        <Button
          key={ingredient.name}
          raised
          title={ingredient.name}
          buttonStyle={{ backgroundColor: colors.orange }}
          textStyle={{ fontSize: 18, color: 'white' }}
        />
      );
    });
  }

  renderSelectedIngredients() {
    const selectedList = this.props.ingredients.list.filter(i => i.selected);
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
    return null;
  }

  renderRecipeCard(item, index) {
    const { showingMore } = this.state;

    if (index > 0 && !showingMore) {
      return null;
    }
    return (
      <RecipeCard
        hidden={false}
        data={item}
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
        keyExtractor={recipe => `${recipe._id.$oid}`}
        ListEmptyComponent={(
          <View style={{ flex: 9, top: (SCREEN_WIDTH / 2.0) }}>
            <Text style={{ fontSize: 24 }}>
              {'Nenhuma receita encontrada'}
            </Text>
          </View>
        )}
      />
    );
  }

  render() {
    const { loading } = this.props.recipes;
    const { showingMore } = this.state;
    return (
      <View style={styles.screenStyle}>
        {this.renderSelectedIngredients()}
        <View style={{ flex: 9, paddingBottom: 10 }}>
          {this.renderRecipesView()}
        </View>
        {!loading && !showingMore && (
          <View style={{ width: SCREEN_WIDTH, bottom: 0 }}>
            <Button
              title="Ver mais"
              containerStyle={{ flex: 1, padding: 0 }}
              buttonStyle={{ backgroundColor: colors.pink }}
              onPress={() => this.onShowMore()}
            />
          </View>
        )}
      </View>
    );
  }
}

RecipeListScreen.navigationOptions = {
  title: 'Receitas',
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.orange },
};

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  ingredientsView: {
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
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
})(RecipeListScreen);
