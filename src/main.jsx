import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // 对应你创建的 src/App.jsx
import './index.css' // 如果你有全局样式的话，没有可以去掉这行

// 注册 Service Worker (PWA 必须)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)