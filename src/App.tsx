import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CompileABCpage from './pages/CompileABCpage';

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/module' element={<CompileABCpage />}></Route>
         </Routes>
      </BrowserRouter>
   )
}
