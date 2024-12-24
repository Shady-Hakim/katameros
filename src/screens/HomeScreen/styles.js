import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },

  pageTitleContainer: {
    marginVertical: 20,
  },
  pageTitle: {
    textAlign: 'center',
    color: '#4C2710',
    fontSize: 22,
    fontWeight: 'bold',
  },
  pageSubTitle: {
    textAlign: 'center',
    color: '#4C2710',
    fontSize: 20,
  },
});

export default styles;
