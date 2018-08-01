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

import IngredientTag from '../components/IngredientTag';
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

    this.props.fetchRecipes(selectedCategory, selected);
    this.props.navigation.navigate('recipeList');
  }

  onForceAddition() {
    const { textInput } = this.props.ingredients;
    this.props.ingredientInput(`${textInput},`);
  }

  renderIngredientTags() {
    const { selected } = this.props.ingredients;
    return selected.map((ingredient) => {
      return (
        <IngredientTag
          key={ingredient}
          ingredient={ingredient}
          inverse
          removable
          onPress={i => this.props.removeIngredient(i)}
        />
      );
    });
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
      <View style={styles.screenStyle}>
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
          <KeyboardAvoidingView
            style={styles.ingredientViewStyle}
            keyboardVerticalOffset={250}
            behavior="padding"
            enabled
          >
            {/* <Button
              title="sugestões"
              titleStyle={{ fontSize: 25 }}
              containerStyle={{ padding: 0, margin: 0 }}
              icon={{
                name: 'ios-help-circle-outline',
                size: 30,
                color: 'white',
                type: 'ionicon',
              }}
              buttonStyle={{ backgroundColor: 'transparent', padding: 5, margin: 0 }}
              onPress={() => this.onForceAddition()}
            /> */}
            <View style={styles.textInputViewStyle}>
              <TextInput
                textAlign='center'
                autoCapitalize='none'
                textContentType="none"
                placeholder="leite, ovos, açucar..."
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                textContentStyle={styles.textWhite}
                underlineColorAndroid="white"
                returnKeyType='search'
                style={styles.textInputStyle}
                onChangeText={text => this.props.ingredientInput(text)}
                onSubmitEditing={() => this.onForceAddition()}
                value={textInput}
              />
              <Button
                icon={{
                  name: 'md-add-circle',
                  size: 30,
                  color: 'white',
                  style: { marginRight: 0 },
                  type: 'ionicon',
                }}
                buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
                onPress={() => this.onForceAddition()}
              />
            </View>
            <View style={styles.ingredientTagsStyle}>
              {this.renderIngredientTags()}
            </View>
          </KeyboardAvoidingView>
        )}
        <View style={styles.goButtonStyle}>
          <Button
            title="Me indique receitas"
            iconRight={{
              name: 'md-color-wand',
              size: 38,
              color: 'white',
              type: 'ionicon',
            }}
            borderRadius={5}
            textStyle={{ fontSize: 23 }}
            onPress={() => this.onActionButton()}
            backgroundColor="rgba(213, 100, 140, 1)"
            large
            raised
          />
        </View>
      </View>
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
  ingredientViewStyle: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ingredientTagsStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonStyle: {
    flex: 2,
    flexDirection: 'column',
    ...centerStyle,
  },
  textInputViewStyle: {
    padding: 0,
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
