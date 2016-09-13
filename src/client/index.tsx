import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import io from 'socket.io-client'

import StaticMap from './components/StaticMap'
import Search from './components/Search'

ReactDOM.render(<StaticMap/>,document.getElementById('map'))
ReactDOM.render(<Search/>,document.getElementById('root'))