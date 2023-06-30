import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import usePostsData from '../../hooks/usePostsData';
import useCategoriesData from '../../hooks/useCategoriesData';
import RenderCategory from '../../components/RenderCategory';
import RenderPost from '../../components/RenderPost';

function PostsScreen({route, navigation}) {
  const {id} = route.params;
  const {
    isLoading: postsIsLoading,
    data: posts,
    isError: postsIsError,
    error: postsError,
  } = usePostsData(id);
  const {
    isLoading: catIsLoading,
    data: categories,
    isError: catIsError,
    error: catError,
  } = useCategoriesData(id);
  const isLoading = postsIsLoading || catIsLoading;
  const isError = postsIsError || catIsError;
  const error = postsError || catError;

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
  return !posts.length && !categories.length ? (
    <View style={styles.loadingContainer}>
      <Text>جاري العمل علي إضافتها</Text>
    </View>
  ) : (
    <FlatList
      data={posts}
      renderItem={item => (
        <RenderPost item={item.item} navigation={navigation} />
      )}
      keyExtractor={item => item.id}
      ListFooterComponent={() =>
        categories?.map(cat => (
          <RenderCategory
            key={cat.id}
            item={cat}
            navigation={navigation}
            destination="SubPosts"
          />
        ))
      }
    />
  );
}

PostsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({id: PropTypes.number}),
  }),
  navigation: PropTypes.object,
};
export default PostsScreen;
