

import { RouterProvider } from 'react-router'
import './App.css'

import { router } from './Router'
import { Provider } from 'react-redux'
import store from './store/store'
import userReducer, { User, UserContext } from './reducer/userReducer'
import { useReducer } from 'react'



function App() {
  
const [user, Dispatch] = useReducer(userReducer, {} as User);
  return (
    <>
      <UserContext value={{ user: user, Dispatch }}>
    <Provider store={store}>
 
    <RouterProvider router={router} />
 
      </Provider>
      </UserContext>
    </>
  )
}

export default App
