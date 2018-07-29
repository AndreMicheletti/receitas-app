import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import IngredientTag from './IngredientTag';
import { removeIngredient as removeIngredientAction } from '../actions/ingredientActions';

const renderIngredients = (list, inverse, removeIngredient, removable = true) => {
  return list.map((ingredient) => {
    return (
      <IngredientTag
        key={ingredient}
        inverse={inverse}
        ingredient={ingredient}
        removable={removable}
        onPress={removeIngredient}
      />
    );
  });
};

const IngredientList = ({
  selected,
  removeIngredient,
  style = styles.defaultStyle,
  inverse = false,
  removable = true,
}) => {
  if (selected && selected.length > 0) {
    return (
      <View style={style}>
        <ScrollView
          horizontal
          style={styles.ingredientView}
          contentContainerStyle={styles.ingredientContentView}
          showsHorizontalScrollIndicator={false}
        >
          {renderIngredients(selected, inverse, removeIngredient, removable)}
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={style}>
      <IngredientTag
        inverse={inverse}
        ingredient="Nenhum ingrediente selecionado"
        removable={removable}
      />
    </View>
  );
};

const styles = {
  defaultStyle: {
    flex: 1,
    padding: 10,
  },
  ingredientView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  ingredientContentView: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

const mapStateToProps = (state) => {
  return { selected: state.ingredients.selected };
};

export default connect(mapStateToProps, {
  removeIngredient: removeIngredientAction,
})(IngredientList);
