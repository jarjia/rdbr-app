import React from 'react';
import Form from './Pages/AddList/Form/Form';
import StartPage from './Pages/StartPage/StartPage'
import ListFiles from './Pages/List/ListFiles/ListFiles';
import SingleListFile from './Pages/List/ListFiles/SingleListFile/SingleListFile';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<StartPage />}/>
        <Route path='/form' element={<Form />}/>
        <Route path='/list' element={<ListFiles />}/>
        <Route path='/list/:laptopId' element={<SingleListFile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
