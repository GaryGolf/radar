/// <reference path="../../node_modules/@types/jest/index.d.ts" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as TestUtils from 'react-addons-test-utils'

import { HelloWorld } from '../client/components/HelloWorld'

//jest.dontMock('../cilent/components/HelloWorld')



describe('hello world test', () => {

//  const mockHandler = jest.genMockFromModule('../client/components/HelloWorld')
  it('title', () =>{
    const d =  TestUtils.renderIntoDocument(<HelloWorld/>)
 //   const div = TestUtils.findRenderedDOMComponentWithTag(d,'div')
    expect(new Object()).toEqual({})
  })
})
  

