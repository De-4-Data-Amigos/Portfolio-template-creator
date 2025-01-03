import './assets/App.css'
import MainLayout from './layouts/MainLayout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Frontpage from './pages/Frontpage';
import TemplateSuggestion from './pages/TemplateSuggestion';
import { useState } from 'react';
import Login from './pages/Login';
import SignUpPage from './pages/SignUp';
import EditorPage from './pages/Editorpage';
import EditorLayout from './layouts/EditorLayout';
import ContactPage from './pages/ContactPage';
import PrivateRoute from './components/PrivateRoute';
import { BackgroundProvider } from './components/BackgroundContext'; // Sørg for at stien er korrekt





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
          <Route path="template-suggestion" element={<PrivateRoute loggedIn={loggedIn}>
            <TemplateSuggestion />
            </PrivateRoute>} />
          <Route path="*" element={<p>Page Not Found</p>} /> 
          <Route path="login" element={<Login onLogin={login} />} />
          <Route path="registration" element={<SignUpPage />} />
          <Route path="contact" element={<ContactPage />} />
          

          { 
            /* Leave for now, to see how to do different routing things
            <Route path="about" element={<About/>}/>
            Remember to add links to navbar as well
            */
          }
        </Route>
        <Route
          path="/editor"element={
            <PrivateRoute loggedIn={loggedIn}>
            <EditorLayout loggedIn={loggedIn} logout={logout} />
            </PrivateRoute>
          }
        >
          <Route index element={
            <BackgroundProvider>
              <EditorPage />
            </BackgroundProvider>
                              
            } />

        </Route>
      </>
    )
  );

  return (
    <RouterProvider router={routes} />
  );
}

export default App
