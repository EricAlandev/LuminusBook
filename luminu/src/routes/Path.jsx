
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LayPadrao from '../layers/LayPadrao';
import FormCada from '../componentes/SignIn/SignUp/FormCada';
import FormLogin from '../componentes/SignIn/FormLogin'

const Path = () => {

    return(
      <BrowserRouter>
       <Routes>
          <Route path='/cadastro' element={<LayPadrao/>}>
             <Route index element={<FormCada/>} />
          </Route>

          <Route path='/login' element={<LayPadrao/>}>
             <Route index element={<FormLogin/>} />
          </Route>
       </Routes>
      </BrowserRouter>
    )
}

export default Path;