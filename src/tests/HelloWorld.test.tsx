/// <reference path="../../node_modules/@types/jest/index.d.ts" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactTestUtils from 'react-addons-test-utils'

import { HelloWorld } from '../client/components/HelloWorld'

//jest.dontMock('../cilent/components/HelloWorld')



describe('hello world test', () => {

  it('title', () => {

    //var mockHandler = jest.genMockFromModule('../client/components/HelloWorld')

    var div: any =  ReactTestUtils.renderIntoDocument(<HelloWorld title="Hello World"/>)

     var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(div, 'div');

    expect(h1.textContent).toEqual('Hello World');

    expect(div.props.title).toBe('Hello World')
  })
})
  

