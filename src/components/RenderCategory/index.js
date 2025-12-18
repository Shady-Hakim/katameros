import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useFontSize } from '../../context/FontSizeContext';

const RenderCategory = memo(({ item, navigation }) => {
  const { fontSizes } = useFontSize();

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
      <Text style={[styles.title, { fontSize: fontSizes.title }]}>
        {item?.name}
      </Text>
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
