import React from 'react';
import { WebView } from 'react-native';

const RecipeWebView = (props) => {
  const { navigation } = props;
  const url = navigation.getParam('url', null);

  return (
    <WebView
      source={{ uri: url }}
      style={{ marginTop: 0 }}
    />
  );
};

export default RecipeWebView;
