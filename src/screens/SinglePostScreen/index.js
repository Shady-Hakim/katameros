import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  ScrollView,
  Linking,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import useSinglePost from '../../hooks/useSinglePost';
import styles from '../SinglePostScreen/styles';

function SinglePostScreen({ route }) {
  const { id } = route.params;
  const { isLoading, data, isError, error } = useSinglePost(id);
  const { width } = useWindowDimensions();
  const ref = React.useRef();

  function aRenderer({ TDefaultRenderer, ...props }) {
    const goToBottom = () => {
      props.tnode.init.domNode.attribs.name
        ? ref.current.scrollToEnd()
        : Linking.openURL(props.tnode.init.domNode.attribs.href);
    };
    return <TDefaultRenderer {...props} onPress={goToBottom} />;
  }

  const tagsStyles = {
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
  };
  const renderers = {
    a: aRenderer,
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' />
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
    <ScrollView ref={ref}>
      <View style={styles.container}>
        <RenderHTML
          contentWidth={width}
          source={{ html: data && data[0].content }}
          tagsStyles={tagsStyles}
          renderers={renderers}
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
