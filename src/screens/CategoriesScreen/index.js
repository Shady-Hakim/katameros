import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import styles from './styles';
import useCategoriesData from '../../hooks/useCategoriesData';
import RenderCategory from '../../components/RenderCategory';

function CategoriesScreen({ navigation }) {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, data, isError, error, refetch } = useCategoriesData(0);
  data?.shift();

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = useCallback(
    ({ item }) => <RenderCategory item={item} navigation={navigation} />,
    [navigation],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading && page === 1) {
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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}
CategoriesScreen.propTypes = {
  navigation: PropTypes.object,
};
export default CategoriesScreen;
