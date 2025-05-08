import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="133565988908-7so8msfaaslneo8f7fqharnjcnd5vmdu.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
