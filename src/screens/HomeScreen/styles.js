import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  popeContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  popeImage: {
    width: 100,
    height: 120,
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
  holandLogo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

export default styles;
