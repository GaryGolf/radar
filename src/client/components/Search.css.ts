import * as FreeStyle from 'free-style'


export const Style = FreeStyle.create()

export const css = {

    input: Style.registerStyle({
        position: 'relative',
        left: '1px',
        width: '95%',
        margin: '5px',
        border: 'none',
        color: 'black',
        '&:focus': {
            outline: 'none'
        } 
    }),

    menu: Style.registerStyle({
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
    }),

    menuItem: Style.registerStyle({
        width: 'calc(100%-3px)',
        padding: '4px',
        color: '#333333',
        whiteSpace: 'pre',
        overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'silver'
        }
    }),

    selected: Style.registerStyle({
        backgroundColor: 'silver'
    })
}