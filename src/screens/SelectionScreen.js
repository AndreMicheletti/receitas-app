import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import { Text, Button, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';

import IngredientList from '../components/IngredientList';
import {
  fetchIngredients,
  unselectAllIngredient,
  ingredientInput,
  removeIngredient,
} from '../actions/ingredientActions';
import { fetchRecipes, selectCategoryType } from '../actions/recipesActions';
import colors from '../colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SelectionScreen extends React.PureComponent {

  componentDidUpdate() {
    LayoutAnimation.spring();
  }

  onSelectIngredient(index) {
    this.props.selectIngredient(index);
  }

  onSelectCategory(index) {
    const categoryName = (index === 0 ? 'doce' : 'salgado');
    this.props.selectCategoryType(categoryName);
    // this.props.fetchIngredients(categoryName);
  }

  onActionButton() {
    const { selected } = this.props.ingredients;
    const { selectedCategory } = this.props.recipes;

    this.props.fetchRecipes(selectedCategory, {
      ingredients: selected,
    });
    this.props.navigation.navigate('recipeList');
  }

  render() {
    const { selectedCategory } = this.props.recipes;
    const { textInput } = this.props.ingredients;

    let selectedIndex = -1;
    if (selectedCategory === 'doce') {
      selectedIndex = 0;
    } else if (selectedCategory === 'salgado') {
      selectedIndex = 1;
    }

    return (
      <KeyboardAvoidingView style={styles.screenStyle} enabled>
        <View style={[{ flex: selectedCategory ? 1 : 4 }, centerStyle]}>
          {!selectedCategory && (
            <Text h3 style={styles.textWhite}>
              O que está procurando?
            </Text>
          )}
          <ButtonGroup
            onPress={index => this.onSelectCategory(index)}
            selectedIndex={selectedIndex}
            buttons={['Doces', 'Salgados']}
            containerBorderRadius={0}
            underlayColor="transparent"
            containerStyle={{
              paddingTop: 5,
              height: 65,
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            buttonStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            selectedButtonStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            textStyle={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.5)' }}
            selectedTextStyle={{ fontSize: 30, color: 'black' }}
          />
        </View>
        {selectedCategory && (
          <View
            style={styles.ingredientViewStyle}
            behavior="padding"
            enabled
          >
            <IngredientList
              style={{ flex: 1, padding: 10 }}
              inverse
            />
            <View style={styles.textInputViewStyle}>
              <TextInput
                textAlign='center'
                autoCapitalize='none'
                textContentType="none"
                placeholder="leite, ovos, açucar..."
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                textContentStyle={styles.textWhite}
                underlineColorAndroid="white"
                style={styles.textInputStyle}
                onChangeText={text => this.props.ingredientInput(text)}
                value={textInput}
              />
            </View>
          </View>
        )}
        <View style={styles.goButtonStyle}>
          <Button
            title="Me indique receitas >"
            borderRadius={5}
            textStyle={{ fontSize: 20 }}
            onPress={() => this.onActionButton()}
            backgroundColor="rgba(213, 100, 140, 1)"
            large
            raised
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const centerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: colors.orange,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  textWhite: {
    fontFamily: 'sans-serif',
    color: 'white',
  },
  headerStyle: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    ...centerStyle,
  },
  ingredientViewStyle: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: SCREEN_WIDTH,
    paddingTop: 80,
    paddingBottom: 40,
  },
  goButtonStyle: {
    flex: 2,
    flexDirection: 'column',
    ...centerStyle,
  },
  textInputViewStyle: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  textInputStyle: {
    width: 300,
    height: 80,
    fontSize: 26,
    color: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    recipes: state.recipes,
  };
};

export default connect(mapStateToProps, {
  selectCategoryType,
  fetchIngredients,
  ingredientInput,
  removeIngredient,
  unselectAllIngredient,
  fetchRecipes,
})(SelectionScreen);
