import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const RenderCategory = memo(({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('Posts', {
          id: item.id,
          name: item.name,
        })
      }
      key={item?.id}
      style={styles.item}>
      <Text style={styles.title}>{item?.name}</Text>
    </TouchableOpacity>
  );
});

RenderCategory.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
export default RenderCategory;
