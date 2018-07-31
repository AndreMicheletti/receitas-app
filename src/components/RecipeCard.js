import React from 'react';
import { View, Share } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import colors from '../colors';
import { APP_NAME } from '../const';

import { likeRecipe } from '../actions/savedActions';

class RecipeCard extends React.PureComponent {

  onLikeRecipe(isLifetimeLiked) {
    this.props.likeRecipe(this.props.data, isLifetimeLiked);
  }

  shareRecipe() {
    const { name, url } = this.props.data;
    const content = {
      message: `Veja a receita de ${name} que eu achei pelo ${APP_NAME}\n${url}`,
      title: `Veja essa receita do ${APP_NAME}`,
      url,
    };
    Share.share(content, {
      dialogTitle: 'Compartilhar...',
    });
  }

  renderIngredients() {
    const { data } = this.props;
    return data.ingredients.map((item) => {
      const quantity = parseInt(item.quantity, 10);
      return (
        <Text
          key={`${quantity}${item.measure}${item.name}`}
          style={{ marginBottom: 8, fontSize: 16 }}
        >
          {`${quantity} ${item.measure} de ${item.name}`}
        </Text>
      );
    });
  }

  render() {
    const { data, likedIds, likedRecipes, onOpenRecipe } = this.props;
    const isLiked = likedRecipes.indexOf(data.id) !== -1;
    const isLifetimeLiked = likedIds.indexOf(data.id) !== -1;

    return (
      <Card
        style={{ paddingTop: 0 }}
        title={data.name}
        titleStyle={{ fontSize: 20, color: '#333' }}
        image={{ uri: `http://${data.photo}` }}
      >
        {this.renderIngredients()}
        <View style={{ paddingBottom: 7, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 14, color: colors.pink }}>
            {`${data.likes || 0} pessoas gostaram`}
          </Text>
        </View>
        <View style={styles.actionButtonsViewStyle}>
          <Button
            backgroundColor='transparent'
            fontFamily='Roboto'
            textStyle={{ color: colors.blue, fontSize: 16 }}
            buttonStyle={{ margin: 0 }}
            title='Ver Receita'
            onPress={() => onOpenRecipe(data.name, data.url)}
          />
          <Button
            backgroundColor='transparent'
            icon={{
              name: 'md-share',
              size: 30,
              color: colors.blue,
              type: 'ionicon',
              style: { marginRight: 0 },
            }}
            buttonStyle={{ margin: 0, padding: 15 }}
            onPress={() => this.shareRecipe()}
          />
          <Button
            backgroundColor='transparent'
            icon={{
              name: 'ios-heart',
              size: 30,
              color: isLiked ? colors.pink : 'gray',
              type: 'ionicon',
              style: { marginRight: 0 },
            }}
            buttonStyle={{ margin: 0, padding: 15 }}
            onPress={() => this.onLikeRecipe(isLifetimeLiked)}
          />
        </View>
      </Card>
    );
  }
}

RecipeCard.defaultProps = {
  data: {},
  hidden: false,
};

const styles = {
  actionButtonsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
  },
};

const mapStateToProps = (state) => {
  return {
    likedRecipes: state.saved.list.map(recipe => recipe.id),
    likedIds: state.saved.idList,
  };
};

export default connect(mapStateToProps, { likeRecipe })(RecipeCard);
