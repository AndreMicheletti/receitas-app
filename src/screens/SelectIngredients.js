import React from 'react';
import { View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchIngredients, selectIngredient } from '../actions/ingredientActions';
import SelectButton from '../components/SelectButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SelectIngredients extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  state = { loading: true }

  componentDidMount() {
    this.props.fetchIngredients()
  }

  onSelectIngredient(index) {
    this.props.selectIngredient(index)
  }

  onActionButton() {
    this.props.navigation.navigate('recipeList')
  }

  renderIngredients() {
    const { list, loading } = this.props.ingredients;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={60} color="rgb(213, 100, 140)" />
        </View>
      );
    }
    return list.map((ingredient, i) => {
      return (
        <SelectButton
          raised key={i}
          title={ingredient.name}
          selected={ingredient.selected}
          onSelect={() => this.onSelectIngredient(i)}
        />
      );
    });
  }

  render() {
    return (
      <View style={styles.screenStyle}>
        <View style={styles.headerStyle}>
          <Text h3 style={{ fontFamily: 'sans-serif', color: 'white' }}>
            Selecione os ingredientes
          </Text>
        </View>
        <View style={{ flex: 4, width: SCREEN_WIDTH }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.ingredientsStyle}
          >
            {this.renderIngredients()}
          </ScrollView>
        </View>
        <View style={styles.goButtonStyle}>
          <Button
            title="Me indique receitas >"
            borderRadius={5}
            onPress={() => this.onActionButton()}
            backgroundColor="rgba(213, 100, 140, 1)"
            large raised
          />
        </View>
      </View>
    )
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: '#FE8558'
  },
  headerStyle: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ingredientsStyle: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  goButtonStyle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps, {
  fetchIngredients,
  selectIngredient
})(SelectIngredients);
