import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Shim process for environments where it isn't defined to prevent crashes
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

// Help debug crashes that happen before React mounts
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Critical Runtime Error:", { message, error });
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
     root.innerHTML = `
      <div style="padding: 40px; color: #ef4444; font-family: sans-serif; text-align: center;">
        <h2 style="margin-bottom: 8px;">Initialization Failed</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">${message}</p>
        <button onclick="window.location.reload()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
          Retry Load
        </button>
      </div>`;
  }
};

try {
  injectSpeedInsights();
} catch (e) {
  console.warn("Speed Insights failed to initialize", e);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element '#root' not found.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Render Error:", err);
  }
}