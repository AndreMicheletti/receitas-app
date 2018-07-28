import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import colors from '../colors';

const renderIngredients = (list) => {
  return list.map((ingredient) => {
    return (
      <Button
        key={ingredient}
        raised
        title={ingredient}
        buttonStyle={{ backgroundColor: colors.orange }}
        textStyle={{ fontSize: 18, color: 'white' }}
        onPress={() => {}}
      />
    );
  });
};

const IngredientList = ({ selected }) => {
  return (
    <View style={{ flex: 1, paddingBottom: 8 }}>
      <ScrollView
        style={styles.ingredientsView}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {renderIngredients(selected)}
      </ScrollView>
    </View>
  );
};

const styles = {
  ingredientView: {
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = (state) => {
  return { selected: state.ingredients.selected };
};

export default connect(mapStateToProps)(IngredientList);
