import * as React from 'react'

interface Props {}
interface State {}
export class HelloWorld extends React.Component <Props, State>{

    constructor(props: Props) {

        super(props)
    }

    render() {
        return <div>Hello World</div>
    }
}