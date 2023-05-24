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
import SolicitudCancion from "./components/SolicitudCancion";
import Create from "./components/Create";
import EditProducto from "./components/EditProducto";
import ShowPerilAdmin from "./components/ShowPerfilAdmin";
import ShowPrograma from "./components/ShowPrograma";
import ShowProgramaAdmin from "./components/ShowProgramaAdmin";
import ShowProductoAdmin from "./components/ShowProductoAdmin";
import CreateProducto from "./components/CreateProducto";


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
    path: '/perfilesAdmin',
    element: <ShowPerilAdmin/>
  },

  {
    path: '/tiendaAdmin',
    element: <ShowProductoAdmin/>
  },

  {
    path: '/programaAdmin',
    element: <ShowProgramaAdmin/>
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
    path: '/editproducto/:id',
    element: <EditProducto/>
  },
  {
    path: '/SolicitudCancion',
    element: <SolicitudCancion/>
  },
  {
    path: '/create',
    element: <Create/>
  },
  {
    path: '/createproducto',
    element: <CreateProducto/>
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
