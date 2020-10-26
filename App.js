import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/Navigation';
import { NavigationContainer } from "@react-navigation/native";

const reducer = (state={menu:"closeMenu",log:""},action) =>{
   switch (action.type) {
     case 'OPEMENU':
    return {...state, menu : 'openMenu'}  
     case 'CLOSEMENU':
    return {...state, menu : 'closeMenu'} 
    case 'LOG':
          return {...state, log : action.email} 
    case 'OPENLOGIN':
      return { ...state,menu : 'openLogin'}
      case 'CLOSELOGIN':
        return {...state, menu : 'closeLogin'} 
     default:
      return state
   }
}

const database = createStore(reducer);

function App() {
  return (
    <NavigationContainer>
    <Provider store={database}>
     <AppNavigator />
    </Provider>
    </NavigationContainer>
  )
}

export default App
