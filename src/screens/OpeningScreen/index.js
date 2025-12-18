import React, { useMemo } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import usePagesdata from '../../hooks/usePagesData';
import RenderHTML from 'react-native-render-html';
import { useFontSize } from '../../context/FontSizeContext';

function OpeningScreen() {
  const { isLoading, data, isError } = usePagesdata(518);
  const { width } = useWindowDimensions();
  const { fontSizes } = useFontSize();

  const tagsStyles = useMemo(
    () => ({
      p: {
        textAlign: 'left',
        fontSize: fontSizes.body,
      },
      h1: {
        fontSize: fontSizes.heading,
      },
      h2: {
        fontSize: fontSizes.heading,
      },
      h3: {
        fontSize: fontSizes.title,
      },
    }),
    [fontSizes]
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
        <Text style={{ fontSize: fontSizes.body }}>
          حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.
        </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <View style={styles.popeContainer}>
            <Image
              style={styles.popeImage}
              source={require('../../assets/images/anba.png')}
            />
            <Image
              style={styles.popeImage}
              source={require('../../assets/images/pope.png')}
            />
          </View>
        </View>

        <RenderHTML
          contentWidth={width}
          source={{ html: data && data[0].content }}
          tagsStyles={tagsStyles}
          ignoredDomTags={['form']}
        />
        <Image
          style={styles.holandLogo}
          source={require('../../assets/images/holand.png')}
        />
      </View>
    </ScrollView>
  );
}

export default OpeningScreen;
