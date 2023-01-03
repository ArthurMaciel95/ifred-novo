import { useState } from 'react'
import { SectionGoogleMaps } from './components/Sections/Map/googleMaps'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from './context/useContext'
import Cookies from 'js-cookie';
function App() {
  const { setStart, start } = useAppContext()


  return (
    <div className="App">
      <ToastContainer />
      <div className={` absolute h-full flex flex-col gap-12 w-full bg-black ${start ? 'opacity-0 hidden transition-opacity duration-500' : 'transition-opacity opacity-100 flex justify-center items-center'}`}>
        <img src="/img/logo_ifred.png" alt="" />
        <button className='bg-yellow-400 border-2 border-yellow-600 px-6 py-2 text-white font-bold rounded-sm hover:-translate-y-1 hover:bg-yellow-600 transition-all' onClick={() => {
          setStart(true)
          Cookies.set('expire', new Date().getHours())
        }}>Iniciar Rastreamento</button>

        <small className='text-white'>Versão: 1.0</small>

      </div>
      {start && <SectionGoogleMaps />}
    </div>
  )
}

export default App
