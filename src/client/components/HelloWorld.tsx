import * as React from 'react'

interface Props {title: string}
interface State {}
export class HelloWorld extends React.Component <Props, State>{

    constructor(props: Props) {

        super(props)
    }

    render() {
        return <div>{this.props.title}</div>
    }
}