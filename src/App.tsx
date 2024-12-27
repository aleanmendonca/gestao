import React from 'react';
import { AppRoutes } from './routes';
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
  return (
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
  );
}

export default App;
