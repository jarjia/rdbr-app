import Form from './Pages/AddList/Form/Form';
import StartPage from './Pages/AddList/StartPage/StartPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />}/>
        <Route path='/form' element={<Form />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
