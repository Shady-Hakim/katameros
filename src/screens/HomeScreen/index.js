import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator, FlatList } from 'react-native';
import styles from './styles';
import RenderCategory from '../../components/RenderCategory';
import DownloadOfflineButton from '../../components/DownloadButton';
import useCategoriesData from '../../hooks/useCategoriesData';

function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { fetchCategories, data, isLoading, isError } = useCategoriesData();

  useEffect(() => {
    fetchCategories({ parentId: 0, forceRefresh: false });
  }, [fetchCategories]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCategories({ parentId: 0, forceRefresh: true });
    setRefreshing(false);
  };

  const renderItem = useCallback(
    ({ item }) => <RenderCategory item={item} navigation={navigation} />,
    [navigation]
  );

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
        <Text>
          حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>
              دراسات في القراءات اليومية للكنيسة القبطية الارثوذكسية
            </Text>
            <Text style={styles.pageSubTitle}>
              (وباقة مختارة من عظات الآباء الاولين وعظات الآباء المعاصرين)
            </Text>
          </View>
          <DownloadOfflineButton />
        </>
      )}
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}

export default HomeScreen;
