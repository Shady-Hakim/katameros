import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ActivityIndicator, FlatList} from 'react-native';
import styles from './styles';
import useCategoriesData from '../../hooks/useCategoriesData';
import RenderCategory from '../../components/RenderCategory';

function CategoriesScreen({navigation}) {
  const {isLoading, data, isError, error} = useCategoriesData(0);
  data?.shift();

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
    <FlatList
      data={data}
      renderItem={item => (
        <RenderCategory
          item={item.item}
          navigation={navigation}
          destination="Posts"
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}
CategoriesScreen.propTypes = {
  navigation: PropTypes.object,
};
export default CategoriesScreen;
