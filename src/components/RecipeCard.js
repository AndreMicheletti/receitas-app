import React from 'react';
import { Text, Card, Button } from 'react-native-elements';
import colors from '../colors';

class RecipeCard extends React.PureComponent {

  renderIngredients() {
    const { data } = this.props;
    return data.ingredients.map((item) => {
      return (
        <Text key={item.name} style={{ marginBottom: 10 }}>
          {`${item.quantity} ${item.measure} de ${item.name}`}
        </Text>
      );
    });
  }

  render() {
    const { data, hidden } = this.props;

    return (
      <Card
        style={{ display: hidden ? 'none' : 'flex' }}
        title={data.name}
        image={{ uri: `http://${data.photo}` }}
      >
        {this.renderIngredients()}
        <Button
          backgroundColor={colors.pink}
          fontFamily='Roboto'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Ver Receita'
        />
      </Card>
    );
  }
}

RecipeCard.defaultProps = {
  data: {},
  hidden: false,
};

export default RecipeCard;
