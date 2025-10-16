import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routes/routeTree'

import './App.css';

const router = create({ routeTree });

function App() {
  return (
    <>
      {/* <ProfilePage /> */}
      <RouterProvider router = {router}
    </>
  );
}

export default App;
