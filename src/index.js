import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import Autocomplete from './components/Autocomplete'
import Gmap from './components/Gmap'



//ReactDOM.render(<Autocomplete/>,document.getElementById('root'))
ReactDOM.render(<Gmap/>,document.getElementById('map'))