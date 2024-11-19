import './assets/App.css'
import MainLayout from './layouts/MainLayout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Frontpage from './pages/Frontpage';
import TemplateSuggestion from './pages/TemplateSuggestion';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout/>}>
          <Route index element= {<Frontpage/>} />
          <Route path="test" element={<TemplateSuggestion/>} /> 

          <Route path="*" element={<p>Page Not Found</p>} /> 
          { 
            /* Leave for now, to see how to do different routing things
            <Route path="about" element={<About/>}/>


            Remember to add links to navbar as well
            */
          }
        </Route>
        <Route path='/editor' >
          <Route index element={<p>editor</p>} />
        </Route>
      </>
    )
  );

  return (
    <RouterProvider router={routes} />
  );
}

export default App
