import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Root from './Pages/Root';
import ColorView from './Components/ColorView';
import ListView from './Pages/ListView';
import DetailView from './Pages/DetailView';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ColorView />,
        children: [
          {
            path: "/",
            element: <ListView />,
          },
          {
            path: "/list",
            element: <ListView />,
          },
          {
            path: "/detail",
            element: <DetailView />,
          }
        ]
      }
    ]
  },
]);

function App() {
  return (
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
  );
}

export default App;
