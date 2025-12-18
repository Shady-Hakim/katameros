import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  container: {
    paddingTop: 10,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
  },
  pageTitleContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  pageTitle: {
    textAlign: 'center',
    color: '#4C2710',
    fontWeight: '900',
    marginBottom: 8,
  },
  copticDate: {
    textAlign: 'center',
    color: '#B8875A',
    fontWeight: '900',
  },
  errorText: {
    textAlign: 'center',
    color: '#4C2710',
    paddingHorizontal: 20,
  },
});

export default styles;
