import React from 'react';
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

function OpeningScreen() {
  const { isLoading, data, isError } = usePagesdata(518);
  const { width } = useWindowDimensions();

  const tagsStyles = {
    p: {
      textAlign: 'left',
      fontSize: 18,
    },
  };

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
