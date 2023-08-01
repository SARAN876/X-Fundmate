import React from 'react';
import Themebar from './pages/themeBar';
import Provider from 'react-redux/es/components/Provider';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Themebar />
      </Provider>
    </>
  );
}

export default App;
