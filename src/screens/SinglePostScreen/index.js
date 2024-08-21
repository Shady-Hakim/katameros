import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Linking,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import useSinglePost from '../../hooks/useSinglePost';
import styles from '../SinglePostScreen/styles';

function SinglePostScreen({ route }) {
  const { id } = route.params;
  const { isLoading, data, isError, error, refetch } = useSinglePost(id);
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const ref = React.useRef();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const aRenderer = useCallback(({ TDefaultRenderer, ...props }) => {
    const goToBottom = () => {
      props.tnode.init.domNode.attribs.name
        ? ref.current.scrollToEnd()
        : Linking.openURL(props.tnode.init.domNode.attribs.href);
    };
    return <TDefaultRenderer {...props} onPress={goToBottom} />;
  }, []);

  const tagsStyles = useMemo(
    () => ({
      p: {
        textAlign: 'left',
        fontSize: 18,
      },
      body: {
        textAlign: 'left',
      },
      td: {
        borderBottomWidth: 1,
      },
    }),
    []
  );

  const renderers = useMemo(
    () => ({
      a: aRenderer,
    }),
    [aRenderer]
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
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      ref={ref}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <RenderHTML
          contentWidth={width}
          source={{ html: data && data[0].content }}
          tagsStyles={tagsStyles}
          renderers={renderers}
          ignoredDomTags={['form']}
        />
      </View>
    </ScrollView>
  );
}

SinglePostScreen.propTypes = {
  route: PropTypes.object,
  tnode: PropTypes.shape({
    init: PropTypes.shape({
      domNode: PropTypes.shape({
        attribs: PropTypes.shape({
          name: PropTypes.string,
          href: PropTypes.string,
        }),
      }),
    }),
  }),
};

export default SinglePostScreen;
