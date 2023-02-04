import { StyleSheet } from 'react-native';
import store from './store';
import AppNavigation from './navigations/AppNavigation';
import { Provider } from 'react-redux';
// import "./ignoreWarning";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});