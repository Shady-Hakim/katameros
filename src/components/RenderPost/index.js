import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const RenderPost = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Single', { id: item.id, title: item.title })
      }
      key={item.id}
      style={styles.postContainer}
    >
      <Text style={styles.postTitle}>&#10232; {item.title}</Text>
    </TouchableOpacity>
  );
};
RenderPost.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
export default memo(RenderPost);
