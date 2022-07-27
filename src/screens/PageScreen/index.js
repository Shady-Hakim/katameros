import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import usePagesData from '../../hooks/usePagesData';
import styles from '../PageScreen/styles';

function PageScreen({route}) {
  const {pageId} = route.params;
  const {isLoading, data, isError, error} = usePagesData(pageId);
  const {width} = useWindowDimensions();

  const tagsStyles = {
    p: {
      textAlign: 'left',
      fontSize: 18,
    },
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <RenderHTML
          contentWidth={width}
          source={{html: data && data[0].content}}
          tagsStyles={tagsStyles}
        />
      </View>
    </ScrollView>
  );
}
PageScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({pageId: PropTypes.number}),
  }),
  navigation: PropTypes.object,
};
export default PageScreen;
