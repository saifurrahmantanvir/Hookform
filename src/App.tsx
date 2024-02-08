import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from 'src/pages/Login/Login'
import { Signup } from 'src/pages/Signup/Signup'
import { UserData } from 'src/pages/UserData/UserData';
import { UserSocial } from 'src/pages/UserSocial/UserSocial';
import { ZodForm } from 'src/pages/ZodForm/ZodForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/userdata' element={<UserData />} />

        <Route path='/zodform' element={<ZodForm />} />
        <Route path='/usersocial' element={<UserSocial />} />


      </Routes>


    </Router>


  )


}

export default App
