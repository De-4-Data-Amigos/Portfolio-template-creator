import './assets/App.css'
import GridContainer from './components/GridContainer';
import MainLayout from './layouts/MainLayout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<p>WIP</p>} />
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
          <Route path='test' element={
            <GridContainer columns={3} rows={3}>
              <div data-pos="0,1">
                <h1>title</h1>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
                <p>bla bla bla bla</p>
              </div>
              <p data-pos="1,1">component2</p>
              <p data-pos="1,2">component3</p>
              <p data-pos="0,0">component4</p>
              <p data-pos="2,2">component4</p>
            </GridContainer>
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
