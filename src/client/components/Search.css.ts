import * as FreeStyle from 'react-free-style'


export const Style = FreeStyle.create()

export const menuStyle = Style.registerStyle({
    backgroundColor: 'white',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: '90%',
    width: '560px',
    boxShadow: '3px 3px 10px #AAAAAA',
    padding: '6px'
})

export const inputStyle = Style.registerStyle({
    position: 'relative',
    left: '1px',
    width: '95%',
    margin: '5px',
    border: 'none',
    color: 'black'
})

export const menuItemStyle = Style.registerStyle({
    width: 'calc(100%-3px)',
    padding: '4px',
    color: '#333333',
    whiteSpace: 'pre',
    overflow: 'hidden'
})

export const selectedStyle = Style.registerStyle({
    backgroundColor: 'silver',
    width: 'calc(100%-3px)',
    padding: '4px',
    color: '#333333',
    whiteSpace: 'pre',
    overflow: 'hidden'
})

export const normalStyle = Style.registerStyle({
    backgroundColor: 'white'
})