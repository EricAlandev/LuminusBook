
import { createRoot } from 'react-dom/client'
import { UserProvider } from './componentes/hooks/useUser.jsx'
import './index.css'
import App from './App.jsx'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
