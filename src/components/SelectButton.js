import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../colors';

class SelectButton extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.selected !== this.props.selected)
  }

  getButtonStyle() {
    return {
      backgroundColor: this.props.selected ? colors.pink : colors.white,
    };
  }

  onClick() {
    this.props.onSelect(!this.props.selected);
  }

  render() {
    const { selected } = this.props;

    return (
      <Button
        {...this.props}
        Component={TouchableWithoutFeedback}
        titleStyle={{ fontSize: 15, fontFamily: 'regular' }}
        color={selected ? 'white' : '#000'}
        containerViewStyle={{ marginBottom: 4, backgroundColor: 'transparent' }}
        buttonStyle={[this.getButtonStyle(), styles.defaultButtonStyle]}
        borderRadius={30}
        onPress={() => this.onClick()}
      />
    )
  }
}

SelectButton.defaultProps = {
  selected: false,
  onSelect: () => {}
};

const styles = {
  defaultButtonStyle: {
    height: 38,
    minWidth: 90
  }
}

export default SelectButton;
