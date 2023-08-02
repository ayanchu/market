import './App.css'
import { AuthProvider } from './context/CheckAuth';
import MainRoutes from './components/MainRouts';


function App() {

  return (
    <>
      <AuthProvider>
        <MainRoutes/>
      </AuthProvider>
    </>
  )
}

export default App
