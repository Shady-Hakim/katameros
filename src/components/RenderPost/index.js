import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useFontSize } from '../../context/FontSizeContext';

const RenderPost = ({ item, navigation }) => {
  const { fontSizes } = useFontSize();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Single', { id: item.id, title: item.title })
      }
      key={item.id}
      style={styles.postContainer}>
      <Text style={[styles.postTitle, { fontSize: fontSizes.title }]}>
        {item.title}
      </Text>
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
