import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomeView extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/mint">Mint Bonds</Link>
      </div>
    )
  }
}

export default HomeView
