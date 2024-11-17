import './assets/App.css'
import MainLayout from './layouts/MainLayout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useState } from 'react';
import apiFacade from './utils/apiFacade';
import Login from './pages/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (username, password) => {
    apiFacade.login(username, password)
      .then(() => setLoggedIn(true))
      .catch(err => console.error("Login failed: ", err));
  }

  const logout = () => {
    apiFacade.logout();
    setLoggedIn(false);
  }

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout loggedIn={loggedIn} login={login} logout={logout}/>}>
          <Route index element={<p>WIP</p>} />
          <Route path="*" element={<p>Page Not Found</p>} /> 
          <Route path="login" element={<Login />} />
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
