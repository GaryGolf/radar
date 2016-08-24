import React from 'react'

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props)

        this.state = {options:[]}

    }

    /*
    Localization
		language = ru
		region = ru

		center: {lat: 36.964 , lang: -122.015}
		zoom: 10
		mapTypeId: 'satellite'
		heading: 90,
   		tilt: 45

   	Styles: 
   		https://developers.google.com/maps/documentation/javascript/style-reference
	query
   		https://developers.google.com/places/web-service/query
            






    */
    componentWillMount() {
        const options = [
        	'trusting',
        	'tresspassing',
        	'transfering',
        	'tresspassing'
        	// 'trangladith',
        	// 'tresures',
        	// 'transitioning'
        ]

        this.setState({options})
    }

    inputHandler(event) {

    	if(event.keyCode === 13) {
    		event.target.value=''
    	}

    }
    render() {
        return (
        	<div className="autocomplete">
        		<input className="autocomlete" list="autocomlete" onKeyDown={this.inputHandler}/>
        		<datalist id="autocomplete" className="autocomplete">
        			{this.state.options.map((option, index) => {
        				return <option key={index} value={option}/>
        			})}
        		</datalist>
        	</div>
        )
    }
}
