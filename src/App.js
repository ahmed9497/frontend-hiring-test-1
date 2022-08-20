import { Spin } from 'antd';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { Fragment } from 'react';
import './App.css';
import AppRouter from './router/AppRouter';

function App() {
  
 

  return (
    <Fragment>
      <ErrorBoundary>
        <div id="loader-wrapper">
          <div id="skeleton">
            <Spin size="large" />
          </div>
        </div>
        <AppRouter />
      </ErrorBoundary>
    </Fragment>
  );
}



export default App;
