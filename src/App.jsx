import './App.css';
import Routes from './components/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from './components/store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
