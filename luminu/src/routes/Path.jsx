
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LayPadrao from '../layers/LayPadrao';
import FormCada from '../componentes/SignIn/SignUp/FormCada';
import FormLogin from '../componentes/SignIn/FormLogin'
import LaySettings from '../layers/LaySettings';
import Settings from '../componentes/userPage/Settings';
import Profile from '../componentes/userPage/Profile';
import HeroHome from '../componentes/hero/HeroHome';
import LivroEsqueleto from '../componentes/esqueletos/pages/LivroEsqueleto';
import CategoriaPage from '../componentes/esqueletos/pages/CategoriaEsque';
import PesquisaEsque from '../componentes/esqueletos/pages/PesquisaEsque';
import LaySignInOut from '../layers/LaySignInOut';
import CodigoLogin from '../componentes/SignIn/CodigoLogin';

const Path = () => {

    return(
      <BrowserRouter>
       <Routes>

          <Route path='/' element={<LayPadrao/>}>
             <Route index element={<HeroHome/>} />
          </Route>

          <Route path='/cadastro' element={<LaySignInOut/>}>
             <Route index element={<FormCada/>} />
          </Route>

          <Route path='/login' element={<LaySignInOut/>}>
             <Route index element={<FormLogin/>} />
          </Route>

          <Route path='/login/codigo' element={<LaySignInOut/>}>
             <Route index element={<CodigoLogin/>} />
          </Route>

          <Route path='/userPage' element={<LaySettings/>}>
             <Route path='/userPage/estatos' element={<Profile/>} />
             <Route path='/userPage/dados' element={<Settings/>} />
          </Route>

          <Route path='/livro/:id' element={<LayPadrao/>}>
             <Route index element={<LivroEsqueleto/>} />
          </Route>

          <Route path='/categoria/:categoria' element={<LayPadrao/>}>
             <Route index element={<CategoriaPage/>} />
          </Route>

          <Route path='/resultadoPesquisa' element={<LayPadrao/>}>
             <Route index element={<PesquisaEsque/>} />
          </Route>

          <Route path='*' element={<LayPadrao/>} >
            <Route index element={<PesquisaEsque/>} />
          </Route>
       </Routes>
      </BrowserRouter>
    )
}

export default Path;