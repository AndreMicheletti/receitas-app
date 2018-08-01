import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Slides from '../components/Slides';
import { tutorialCompleted } from '../actions/settingsActions';

const TUTORIAL_DATA = [
  { text: 'Este é o ReceitApp!', color: '#FEB658' },
  { text: 'Decida se quer uma receita doce ou salgada', color: '#3DAF7B' },
  { text: 'Insira os ingredientes que você tem em casa', color: '#C85177' },
  { text: 'Descubra uma receita fácil para fazer agora mesmo!', color: '#FE8558' },
];

class TutorialScreen extends React.PureComponent {

  componentWillMount() {
    if (this.props.tutorialDone === true) {
      this.props.navigation.navigate('recipeList');
    }
  }

  onComplete() {
    this.props.tutorialCompleted();
    this.props.navigation.navigate('selection');
  }

  render() {
    return (
      <View style={styles.screenView}>
        <Slides
          data={TUTORIAL_DATA}
          buttonTitle="Começar!"
          textStyle={{ fontSize: 35, color: 'white' }}
          onButtonPress={() => this.onComplete()}
          buttonProps={{
            buttonStyle: { backgroundColor: '#E17F5B' },
            titleStyle: { color: 'white', fontWeight: '700', fontSize: 27 },
          }}
        />
      </View>
    );
  }
}

const styles = {
  screenView: {
    flex: 1,
  },
};

const mapStateToProps = ({ settings }) => {
  return { tutorialDone: settings.tutorial };
};

export default connect(mapStateToProps, { tutorialCompleted })(TutorialScreen);
