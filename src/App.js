import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import CreateUser from './Components/CreateUser';
import UpdateUser from './Components/UpdateUser';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='Users' replace/>} />
        <Route path='/Users' element={<Main />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/update-user/:id' element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
