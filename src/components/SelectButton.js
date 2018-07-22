import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

class SelectButton extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.selected !== this.props.selected)
  }

  getButtonStyle() {
    return this.props.selected ? {
      backgroundColor: 'rgba(213, 100, 140, 1)',
      height: 38, minWidth: 90
    } : {
      height: 38,
      backgroundColor: 'white',
      minWidth: 90
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
        buttonStyle={this.getButtonStyle()}
        borderRadius={30}
        onPress={() => this.onClick()}
      />
    )
  }
}

SelectButton.defaultProps = {
  selected: false,
  onSelect: () => {}
}

export default SelectButton;
