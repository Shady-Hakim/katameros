import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import styles from './styles';
import useCategoriesData from '../../hooks/useCategoriesData';
import RenderCategory from '../../components/RenderCategory';

function CategoriesScreen({ navigation }) {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchCategories, data, isLoading, isError } = useCategoriesData();

  useEffect(() => {
    fetchCategories({ parentId: 0, forceRefresh: false });
  }, [fetchCategories]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = useCallback(
    ({ item }) => <RenderCategory item={item} navigation={navigation} />,
    [navigation]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCategories({ parentId: 0, forceRefresh: true });
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
        <Text>
          حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.
        </Text>
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
      contentContainerStyle={styles.container}
    />
  );
}

CategoriesScreen.propTypes = {
  navigation: PropTypes.object,
};

export default CategoriesScreen;
