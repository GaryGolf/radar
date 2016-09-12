import React from 'react'
import ReactDOM from 'react-dom'
// import io from 'socket.io-client'

//import Autocomplete from './components/Autocomplete'
//import Gmap from './components/Gmap'
import Search from './client/components/Search'

// Style.inject()
//let Autocomplete = Style.component(Search)


//ReactDOM.render(<Gmap/>,document.getElementById('map'))
//ReactDOM.render(<Autocomplete/>,document.getElementById('root'))
// ReactDOM.render(<Autocomplete/>, document.querySelector('#root'))
ReactDOM.render(<Search/>,document.getElementById('root'))