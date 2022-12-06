import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./store/store";
import { Provider } from "react-redux";
import { usePromiseTracker } from "react-promise-tracker";
import {ProgressBar} from 'react-loader-spinner';


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
 return (
  promiseInProgress &&
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div><h2>Your Letter is being processed</h2></div>
        <ProgressBar
  height="75"
  width="75"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#000000'
  barColor = '#1E90FF'
/>
      </div>
 );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <LoadingIndicator/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
