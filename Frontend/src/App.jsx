import './assets/App.css'
import MainLayout from './layouts/MainLayout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Frontpage from './pages/Frontpage';
import { useState } from 'react';
import Login from './pages/Login';  // Antag, at du har en LoginPage
import SignPage from './pages/SignUp';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    setLoggedIn(false);  // Sætter loggedIn til false
  }

  const login = () => {
    setLoggedIn(true);  // Sætter loggedIn til true efter succesfuldt login
  }

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
         <Route path="/" element={<MainLayout loggedIn={loggedIn} logout={logout} />}>
          <Route index element= {<Frontpage/>} />
          <Route path="*" element={<p>Page Not Found</p>} /> 
          <Route path="login" element={<Login onLogin={login} />} />
          <Route path="sign" element={<SignPage />} />
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
