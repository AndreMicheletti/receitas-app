import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import colors from '../colors';

const IngredientTag = ({ ingredient, removable, onPress, inverse }) => {
  const textColor = (inverse ? colors.pink : 'white');
  return (
    <View style={{ margin: 4 }}>
      <Button
        iconRight={removable ? { name: 'remove-circle', size: 20, color: textColor } : undefined}
        raised
        title={ingredient}
        buttonStyle={{ backgroundColor: inverse ? 'white' : colors.orange }}
        textStyle={{ fontSize: 18, color: textColor }}
        onPress={() => onPress && onPress(ingredient)}
        containerStyle={{ height: 60 }}
      />
    </View>
  );
};

export default IngredientTag;
