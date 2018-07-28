import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { removeIngredient as removeIngredientAction } from '../actions/ingredientActions';
import colors from '../colors';

const renderIngredients = (list, inverse, removeIngredient) => {
  const textColor = (inverse ? colors.pink : 'white');
  return list.map((ingredient) => {
    return (
      <Button
        key={ingredient}
        iconRight={{ name: 'remove-circle', size: 20, color: textColor }}
        raised
        title={ingredient}
        buttonStyle={{ backgroundColor: inverse ? 'white' : colors.orange }}
        textStyle={{ fontSize: 18, color: textColor }}
        onPress={() => removeIngredient(ingredient)}
      />
    );
  });
};

const IngredientList = ({
  selected,
  removeIngredient,
  style = styles.defaultStyle,
  inverse = false,
}) => {
  return (
    <View style={style}>
      <ScrollView
        style={styles.ingredientView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {renderIngredients(selected, inverse, removeIngredient)}
      </ScrollView>
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
};

const mapStateToProps = (state) => {
  return { selected: state.ingredients.selected };
};

export default connect(mapStateToProps, {
  removeIngredient: removeIngredientAction,
})(IngredientList);
