import React, { useState, useEffect } from "react";

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
// Components
import Header from "./components/Header";
import Perfiles from "./components/Perfiles";
import Inicio from "./components/Inicio";
import Programa from "./components/Programa";
import Tienda from "./components/Tienda"; 
import Show from "./components/Show";
import Edit from "./components/Edit";
import CreatePrograma from "./components/CreatePrograma";
import EditPrograma from "./components/EditPrograma";
import Create from "./components/Create";


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
  {
    path: '/create',
    element: <Create/>
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
