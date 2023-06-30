import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  postContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#7a7a7a',
  },
  titleContainer: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#7a7a7a',
  },
  postTitle: {
    textAlign: 'left',
    paddingHorizontal: 10,
    color: '#4C2710',
    fontSize: 16,
  },
  categoryTitle: {
    textAlign: 'left',
    paddingHorizontal: 10,
    color: '#4C2710',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
