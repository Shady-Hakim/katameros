import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const RenderCategory = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Posts', {
          id: item.id,
          name: item.name,
        })
      }
      key={item?.id}
      style={styles.titleContainer}>
      <Text style={styles.categoryTitle}>{item?.name} &#10219;</Text>
    </TouchableOpacity>
  );
};
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
