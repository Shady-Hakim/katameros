import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import usePagesData from '../../hooks/usePagesData';
import styles from '../PageScreen/styles';

function PageScreen({ route }) {
  const { pageId } = route.params;
  const { isLoading, data, isError, refetch } = usePagesData(pageId);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const tagsStyles = useMemo(
    () => ({
      p: {
        textAlign: 'left',
        fontSize: 18,
      },
    }),
    [],
  );

  if (isLoading && !refreshing) {
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <RenderHTML
          contentWidth={width}
          source={{ html: data && data[0].content }}
          tagsStyles={tagsStyles}
          ignoredDomTags={['form']}
        />
      </View>
    </ScrollView>
  );
}

PageScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ pageId: PropTypes.number }),
  }),
  navigation: PropTypes.object,
};

export default PageScreen;
