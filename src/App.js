import './App.css';
import {React} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import AddQ from './pages/addQ/addQ'
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/Result';

import PrivateRoute from './util/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/addq' element={<AddQ/>} />
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/result' element={<Result/>}/>
      </Route>
    </Routes>
  );
}

export default App;