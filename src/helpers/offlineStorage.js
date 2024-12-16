import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPosts from '../controllers/fetchPosts';
import fetchSinglePost from '../controllers/fetchSinglePost';

// Save categories to AsyncStorage
export const saveCategories = async (categories) => {
  if (categories && categories.length > 0) {
    await AsyncStorage.setItem('categories', JSON.stringify(categories));
    console.log('Categories saved to AsyncStorage');
  }
};

// Save posts to AsyncStorage for a specific category
export const saveCategoryPosts = async (categoryId) => {
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const posts = await fetchPosts(categoryId, page);

    if (posts) {
      await AsyncStorage.setItem(
        `posts-${categoryId}-${page}`,
        JSON.stringify(posts),
      );
      console.log(
        `Page ${page} of posts for category ${categoryId} saved to AsyncStorage.`,
      );
      //   console.log(posts.posts);
      const postsArray = posts.posts;
      for (let i = 0; i < postsArray.length; i++) {
        const element = postsArray[i];
        const storageKey = `single-post-${element.id}`;
        await AsyncStorage.setItem(storageKey, JSON.stringify(element));
        console.log(`Post ${element.id} saved to AsyncStorage.`);
      }

      hasNextPage = posts.hasNextPage || false;
      page++;
    } else {
      hasNextPage = false;
    }
  }
};

// Clear AsyncStorage
export const handleDelete = async () => {
  await AsyncStorage.clear();
  console.log('AsyncStorage cleared');
};
