import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import usePostsData from '../../hooks/usePostsData';
import useCategoriesData from '../../hooks/useCategoriesData';
import RenderCategory from '../../components/RenderCategory';
import RenderPost from '../../components/RenderPost';

function PostsScreen({ route, navigation }) {
  const { id } = route.params;
  const [postsPage, setPostsPage] = useState(1);
  const [catPage, setCatPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMorePosts, setIsFetchingMorePosts] = useState(false);
  const [isFetchingMoreCategories, setIsFetchingMoreCategories] =
    useState(false);

  const {
    isLoading: postsIsLoading,
    data: posts,
    isError: postsIsError,
    error: postsError,
    fetchNextPage: fetchNextPostsPage,
    hasNextPage: hasNextPostsPage,
    refetch: postsRefetch,
  } = usePostsData(id, postsPage);

  const {
    isLoading: catIsLoading,
    data: categories,
    isError: catIsError,
    error: catError,
    fetchNextPage: fetchNextCatPage,
    hasNextPage: hasNextCatPage,
    refetch: catRefetch,
  } = useCategoriesData(id, catPage);

  const isLoading = postsIsLoading || catIsLoading;
  const isError = postsIsError || catIsError;
  const error = postsError || catError;

  const handleLoadMorePosts = useCallback(() => {
    if (hasNextPostsPage && !isFetchingMorePosts) {
      setIsFetchingMorePosts(true);
      setPostsPage((prevPage) => prevPage + 1);
      fetchNextPostsPage().finally(() => setIsFetchingMorePosts(false));
    }
  }, [hasNextPostsPage, isFetchingMorePosts, fetchNextPostsPage]);

  const handleLoadMoreCategories = useCallback(() => {
    if (!hasNextPostsPage && hasNextCatPage && !isFetchingMoreCategories) {
      setIsFetchingMoreCategories(true);
      setCatPage((prevPage) => prevPage + 1);
      fetchNextCatPage().finally(() => setIsFetchingMoreCategories(false));
    }
  }, [
    hasNextPostsPage,
    hasNextCatPage,
    isFetchingMoreCategories,
    fetchNextCatPage,
  ]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await postsRefetch();
    await catRefetch();
    setRefreshing(false);
  };

  if (isLoading && postsPage === 1) {
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

  return !posts.length && !categories.length ? (
    <View style={styles.loadingContainer}>
      <Text>جاري العمل علي إضافتها</Text>
    </View>
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <RenderPost item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={handleLoadMorePosts}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListFooterComponent={() => (
        <>
          {!hasNextPostsPage && (
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <RenderCategory item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleLoadMoreCategories}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingMoreCategories && (
                  <ActivityIndicator size="small" color="#0000ff" />
                )
              }
            />
          )}
          {isFetchingMorePosts && (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
        </>
      )}
    />
  );
}

PostsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.number }),
  }),
  navigation: PropTypes.object,
};
export default PostsScreen;
