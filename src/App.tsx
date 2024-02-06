import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from 'src/pages/Login/Login'
import { Signup } from 'src/pages/Signup/Signup'
import { UserData } from 'src/pages/UserData/UserData';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/userdata' element={<UserData />} />

      </Routes>

    </Router>


  )


}

export default App
