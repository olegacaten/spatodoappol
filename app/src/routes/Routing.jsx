import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
function Routing() {
    const isAuth = true;
    return (
      <BrowserRouter>
        <Routes>

                  <Route path={""} element={<Layout />}>
                      <Route index element={<div>layout</div>}/>
                      <Route path={'/todos'} element={<div>todos</div>}/>
                      <Route path='*' element={<div>404</div>}/>          
                  </Route>

            
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default Routing;
  