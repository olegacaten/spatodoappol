import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Projects from '../pages/projects/Projects'
import Layout from '../layouts/Layout';
function Routing() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={""} element={<Layout />}>
              <Route index element={<Projects/>}/>
              <Route path={'/todos'} element={<div>todos</div>}/>
              <Route path='*' element={<div>404</div>}/>          
          </Route>   
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default Routing;
  