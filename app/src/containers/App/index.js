import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider as RimbleThemeProvider } from 'styled-components'
import { theme as rimbleTheme }  from 'rimble-ui'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import theme from 'configs/theme/config-theme'
import HomeView from 'containers/HomeView'
import MintBondsView from 'containers/MintBondsView'
import Header from './components/Header'
import Footer from './components/Footer'

import './styles.scss' // global styles

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <RimbleThemeProvider theme={rimbleTheme}>
          <HashRouter>
            <div>
              <Header />
              <Footer />
              <div className="app-shell">
                <Switch>
                  <Route path="/home" component={HomeView} />
                  <Route path="/mint" component={MintBondsView} />
                  <Redirect from="/" to="/home" />
                </Switch>
              </div>
            </div>
          </HashRouter>
        </RimbleThemeProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
