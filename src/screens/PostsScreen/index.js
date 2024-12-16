import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import usePostsData from '../../hooks/usePostsData';
import useCategoriesData from '../../hooks/useCategoriesData';
import RenderCategory from '../../components/RenderCategory';
import RenderPost from '../../components/RenderPost';

function PostsScreen({ route, navigation }) {
  const { id } = route.params;

  const {
    isLoading: postsIsLoading,
    data: postsData,
    isError: postsIsError,
    error: postsError,
    fetchNextPage: fetchNextPostsPage,
    hasNextPage: hasNextPostsPage,
    refetch: postsRefetch,
  } = usePostsData(id);

  const {
    isLoading: catIsLoading,
    data: categoriesData,
    isError: catIsError,
    error: catError,
    fetchNextPage: fetchNextCatPage,
    hasNextPage: hasNextCatPage,
    refetch: catRefetch,
  } = useCategoriesData(id);

  const isLoading = postsIsLoading || catIsLoading;
  const isError = postsIsError || catIsError;
  const error = postsError || catError;

  const posts = postsData?.pages.flatMap((page) => page.posts) || [];
  const categories = categoriesData || [];

  const handleLoadMorePosts = useCallback(() => {
    if (hasNextPostsPage) {
      fetchNextPostsPage();
    }
  }, [hasNextPostsPage, fetchNextPostsPage]);

  const handleLoadMoreCategories = useCallback(() => {
    if (!hasNextPostsPage && hasNextCatPage) {
      fetchNextCatPage();
    }
  }, [hasNextPostsPage, hasNextCatPage, fetchNextCatPage]);

  const handleRefresh = async () => {
    await postsRefetch();
    await catRefetch();
  };

  if (isLoading && posts.length === 0) {
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
      data={posts}
      renderItem={({ item }) => (
        <RenderPost item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={handleLoadMorePosts}
      onEndReachedThreshold={0.5}
      refreshing={false}
      onRefresh={handleRefresh}
      contentContainerStyle={styles.container}
      ListFooterComponent={() => (
        <>
          {hasNextPostsPage ? (
            <ActivityIndicator size="small" />
          ) : (
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <RenderCategory item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleLoadMoreCategories}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() =>
                hasNextCatPage && <ActivityIndicator size="small" />
              }
            />
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
