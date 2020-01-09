import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Slides extends React.PureComponent {

  renderLastSlide(currentIndex) {
    const { data, buttonProps, onButtonPress, buttonTitle } = this.props;
    if (currentIndex === data.length - 1) {
      return (
        <Button
          title={buttonTitle}
          onPress={() => onButtonPress()}
          large
          raised
          {...buttonProps}
        />
      );
    }
    return (
      <Button
        backgroundColor='transparent'
        icon={{
          name: 'ios-arrow-forward',
          size: 60,
          color: 'white',
          type: 'ionicon',
        }}
      />
    );
  }

  renderSlides() {
    const { data, textStyle } = this.props;
    return data.map((slide, i) => {
      return (
        <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
          <Text textBreakStrategy='highQuality' style={[textStyle, styles.defaultTextStyle]}>
            {slide.text}
          </Text>
          <View style={styles.floatingNavigationView}>
            {this.renderLastSlide(i)}
          </View>
        </View>
      );
    });
  }

  render() {
    const { data } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          pagingEnabled
        >
          {this.renderSlides(data)}
        </ScrollView>
      </View>
    );
  }
}

Slides.defaultProps = {
  data: [{ name: 'Put your data here' }],
  textStyle: { fontSize: 30 },
  buttonTitle: 'Continuar',
  buttonProps: {},
  onButtonPress: () => console.log('please define onButtonPress'),
};

const styles = {
  slide: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingNavigationView: {
    position: 'absolute',
    bottom: (DEVICE_HEIGHT / 10),
    width: DEVICE_WIDTH,
    height: (DEVICE_HEIGHT / 10),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultTextStyle: {
    paddingHorizontal: 12,
    textAlign: 'center',
  },
};

export default Slides;
