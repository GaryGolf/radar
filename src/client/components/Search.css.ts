import * as FreeStyle from 'react-free-style'


export const Style = FreeStyle.create()

export const menuStyle = Style.registerStyle({
    position: 'absolute',
    top: '6px',
    left: '6px',
    backgroundColor: 'white',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: '.9em',
    width: '90%',
    boxShadow: '3px 3px 10px #AAAAAA',
    padding: '6px',
    '@media only screen and (min-width: 1024px)': {
        width:'500px',
    }
})

export const inputStyle = Style.registerStyle({
    position: 'relative',
    left: '1px',
    width: '95%',
    margin: '5px',
    border: 'none',
    color: 'black',
    '&:focus': {
        outline: 'none'
    } 
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