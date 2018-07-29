import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import RecipeCard from '../components/RecipeCard';

class SavedRecipeScreen extends React.PureComponent {

  renderRecipeCard(item) {
    return <RecipeCard hidden={false} data={item} />;
  }

  render() {
    const { list } = this.props;
    return (
      <View style={styles.screenStyle}>
        <FlatList
          data={list}
          renderItem={({ item }) => this.renderRecipeCard(item)}
          keyExtractor={(recipe, i) => `${i}:${recipe.id}`}
          ListEmptyComponent={(
            <View style={styles.centerStyle}>
              <Text style={{ fontSize: 20 }}>
                {'Nenhuma receita encontrada'}
              </Text>
              <Text style={{ fontSize: 20, paddingTop: 10 }}>
                {'=('}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  centerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
};

const mapStateToProps = (state) => {
  return { list: state.saved.list };
};

export default connect(mapStateToProps)(SavedRecipeScreen);
