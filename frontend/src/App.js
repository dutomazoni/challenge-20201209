import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Header from './common/templates/header'
import Content from './common/templates/content'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scss/App.scss'


export default props => (
    <div>
      <Header />
      <div className={'wrapper'}>
        <BrowserRouter>
          <Content/>
        </BrowserRouter>
      </div>

    </div>
)
