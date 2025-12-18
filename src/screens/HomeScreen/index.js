import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import ReadingSection from '../../components/ReadingSection';
import useTodayReadings from '../../hooks/useTodayReadings';
import { useFontSize } from '../../context/FontSizeContext';
import {
  formatArabicDate,
  formatCopticDate,
} from '../../helpers/dateFormatter';

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, data, isError, refetch } = useTodayReadings();
  const { fontSizes } = useFontSize();

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4C2710" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[styles.errorText, { fontSize: fontSizes.body }]}>
          حدث خطأ أثناء تحميل القراءات. يرجى المحاولة مرة أخرى لاحقًا.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#4C2710']}
        />
      }>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />

      <View style={styles.pageTitleContainer}>
        <Text style={[styles.pageTitle, { fontSize: fontSizes.pageTitle }]}>
          {data?.copticDate
            ? formatCopticDate(data.copticDate)
            : 'القراءات اليومية للكنيسة القبطية الارثوذكسية'}
        </Text>
        <Text style={[styles.copticDate, { fontSize: fontSizes.subtitle }]}>
          {formatArabicDate()}
        </Text>
      </View>

      {data?.sections?.map((section) => (
        <ReadingSection key={section.id} section={section} />
      ))}
    </ScrollView>
  );
}

export default HomeScreen;
