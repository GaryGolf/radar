/// <reference path="../../node_modules/@types/jest/index.d.ts" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactTestUtils from 'react-addons-test-utils'
import * as io from 'socket.io-client'

import Search from '../client/components/Search'




describe('Search autocomplete sring input component', () => {

    beforeEach(() => {
        
        window.socket = io.connect('/')
        this.component = ReactTestUtils.renderIntoDocument(<Search/>)
        this.renderedDOM = ReactTestUtils.findRenderedDOMComponentWithTag(this.component,'div')

    })

    it('render empty search component', () => {

         expect(this.renderedDOM.children.length).toEqual(2)
       
    })

    it(' wraps into div element ', () => {

        expect(this.renderedDOM.tagName).toBe('DIV')
    })


    // input.value = 'Звезд'
    // ReactTestUtils.Simulate.change(input)
    // ReactTestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});

})
  

