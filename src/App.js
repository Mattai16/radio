import React, { useState, useEffect } from "react";

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
// Components
import Header from "./components/Header";
import Perfiles from "./vistas/Perfiles";
import Inicio from "./vistas/Inicio";
import Programa from "./vistas/Programa";
import Tienda from "./vistas/Tienda"; 
import Show from "./components/Show";
import Edit from "./components/Edit";
import CreatePrograma from "./components/CreatePrograma";
import EditPrograma from "./components/EditPrograma";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />,
  },
  {
    path: '/programa',
    element: <Programa />,
  },
  {
    path: '/perfiles',
    element: <Perfiles />,
  },
  {
    path: '/tienda',
    element: <Tienda/>,
  },
  {
    path: '/edit/:id',
    element: <Edit/>
  },

  {
    path: '/createprograma',
    element: <CreatePrograma/>
  },
  {
    path: '/editprograma/:id',
    element: <EditPrograma/>
  },
])


function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
