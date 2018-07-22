import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import { Text, Button, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  fetchIngredients,
  selectIngredient,
  unselectAllIngredient
} from '../actions/ingredientActions';
import { selectCategoryType } from '../actions/recipesActions';
import SelectButton from '../components/SelectButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SelectionScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  state = { loading: true }

  componentDidMount() {
    this.props.unselectAllIngredient()
  }

  componentDidUpdate() {
    LayoutAnimation.spring()
  }

  onSelectIngredient(index) {
    this.props.selectIngredient(index)
  }

  onSelectCategory(index) {
    const categoryName = (index === 0 ? "doce" : "salgado");
    this.props.selectCategoryType(categoryName);
    this.props.fetchIngredients(categoryName);
  }

  onActionButton() {
    this.props.navigation.navigate('recipeList')
  }

  renderIngredient({ item, index }) {
    return (
      <SelectButton
        raised
        title={item.name}
        selected={item.selected}
        onSelect={() => this.onSelectIngredient(index)}
      />
    );
  }

  renderIngredientsList() {
    const { list, loading } = this.props.ingredients;
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={60} color="rgb(213, 100, 140)" />
        </View>
      );
    }
    return (
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={styles.ingredientsStyle}
        data={list}
        renderItem={this.renderIngredient.bind(this)}
        keyExtractor={(item, index) => item.name}
      />
    );
  }

  render() {
    const { selectedCategory } = this.props.recipes;
    const selectedIndex = (selectedCategory === "doce") ? 0 : (selectedCategory === "salgado" ? 1 : -1);

    return (
      <View style={styles.screenStyle}>
        <View style={[{ flex: selectedCategory ? 1 : 4 }, centerStyle]}>
          {!selectedCategory &&
            <Text h3 style={styles.textWhite}>O que está procurando?</Text>
          }
          <ButtonGroup
            onPress={this.onSelectCategory.bind(this)}
            selectedIndex={selectedIndex}
            buttons={["Doces", "Salgados"]}
            containerBorderRadius={0}
            underlayColor="transparent"
            containerStyle={{
              paddingTop: 5,
              height: 65,
              backgroundColor: 'transparent',
              borderWidth: 0
            }}
            buttonStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            selectedButtonStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            textStyle={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.5)'}}
            selectedTextStyle={{ fontSize: 30, color: 'black'}}
          />
        </View>
        {selectedCategory &&
          (<View style={styles.ingredientViewStyle}>
            <Text h3 style={[styles.textWhite, {paddingBottom: 8}]}>
              O que tens em casa?
            </Text>
            <View style={{ flex: 1, width: SCREEN_WIDTH }}>
              {this.renderIngredientsList()}
            </View>
          </View>)}
        <View style={styles.goButtonStyle}>
          <Button
            title="Me indique receitas >"
            borderRadius={5}
            textStyle={{ fontSize: 20 }}
            onPress={() => this.onActionButton()}
            backgroundColor="rgba(213, 100, 140, 1)"
            large raised
          />
        </View>
      </View>
    )
  }
}

const centerStyle = {
  justifyContent: 'center',
  alignItems: 'center'
}

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: '#FE8558',
    paddingTop: 25
  },
  textWhite: {
    fontFamily: 'sans-serif',
    color: 'white'
  },
  headerStyle: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    ...centerStyle
  },
  ingredientViewStyle: {
    flex: 2,
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 8
  },
  ingredientsStyle: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  goButtonStyle: {
    flex: 1,
    flexDirection: 'column',
    ...centerStyle
  }
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    recipes: state.recipes
  };
};

export default connect(mapStateToProps, {
  selectCategoryType,
  fetchIngredients,
  selectIngredient,
  unselectAllIngredient
})(SelectionScreen);
