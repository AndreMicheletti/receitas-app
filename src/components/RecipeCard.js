import React from 'react';
import { View, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import colors from '../colors';

const PHOTO_URL = 'http://brcdn.ar-cdn.com/recipes/originalxl/2eedcd52-f27a-43f0-9039-854744f4ef78.jpg'

class RecipeCard extends React.PureComponent {

  renderIngredients() {
    const { ingredients } = this.props.data;
    return ingredients.map((item, i) => {
      return (
        <Text key={i} style={{ marginBottom: 10 }}>
          {`${item.quantity} ${item.measure} de ${item.name}`}
        </Text>
      )
    });
  }

  render() {
    const { name, photo } = this.props.data;

    return (
      <Card
        title={name}
        image={{uri: `http://${photo}`}}
      >
        {this.renderIngredients()}
        <Button
          backgroundColor={colors.pink}
          fontFamily='Roboto'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Ver Receita'
        />
      </Card>
    );
  }
}

RecipeCard.defaultProps = {
  data: {}
}

export default RecipeCard;
