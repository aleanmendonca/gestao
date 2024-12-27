import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App';
    import './index.css';
    import { Providers } from './providers';
    import { ClerkProvider } from '@clerk/clerk-react';
    import { Middleware } from './middleware';
    import { BrowserRouter } from 'react-router-dom';
    import { WebhookHandler } from './components/webhooks/WebhookHandler';
    import { ToastProvider } from './components/ui/use-toast';

    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error('Failed to find the root element');

    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
          <BrowserRouter>
            <Middleware>
              <Providers>
                <ToastProvider>
                  <WebhookHandler>
                    <App />
                  </WebhookHandler>
                </ToastProvider>
              </Providers>
            </Middleware>
          </BrowserRouter>
        </ClerkProvider>
      </StrictMode>
    );
