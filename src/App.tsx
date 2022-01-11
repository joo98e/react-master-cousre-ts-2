import React from 'react'

import './Assets/common.css'
import GlobalStyle from './Assets/GlobalStyle'
import ToDoList from './ToDoList'

interface Props {

}

const App = (props: Props) => {

  return (
    <React.Fragment>
      <GlobalStyle />
      <ToDoList />
    </React.Fragment>
  )
}

export default App
