import './App.css';
import {React} from 'react';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import AddQ from './pages/admin/addQ/addQ';
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/Result';
import Admin from './pages/admin/admin_panel/admin';
import UserRes from './pages/admin/user_result/user_res';
import UserList from './pages/admin/user_list/user_list';
import QuestionList from './pages/admin/question_list/question_list';
import Main from './pages/main/main';

import PrivateRoute from './util/PrivateRoute';

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<Main/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/addq' element={<AddQ/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/user_data' element={<UserRes/>}/>
        <Route path='/user_list' element={<UserList/>}/>
        <Route path='/question_list' element={<QuestionList/>}/>
      </Route>
    </Routes>
  );
}

export default App;