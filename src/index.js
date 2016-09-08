import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

//import Autocomplete from './components/Autocomplete'
//import Gmap from './components/Gmap'
import Search from './client/components/Search'



//ReactDOM.render(<Gmap/>,document.getElementById('map'))
//ReactDOM.render(<Autocomplete/>,document.getElementById('root'))
ReactDOM.render(<Search/>, document.querySelector('#root'))