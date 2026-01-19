import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize performance monitoring
try {
  injectSpeedInsights();
} catch (e) {
  console.warn("Speed Insights failed to initialize", e);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Root element '#root' not found in document.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Rendering failed:", err);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #ef4444;">Application Failed to Load</h1>
        <p style="color: #64748b;">A critical error occurred during initialization. Please check the console for details.</p>
        <button onclick="window.location.reload()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
          Reload Application
        </button>
      </div>
    `;
  }
}