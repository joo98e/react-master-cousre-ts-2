import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'

import Router from './Router';

import './Assets/common.css'
import GlobalStyle from './Assets/GlobalStyle'
import theme from './Assets/Theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './routes/Atoms';

interface Props {

}

const App = (props: Props) => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <React.Fragment>
      <ThemeProvider theme={isDark ? theme.dark : theme.white}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
