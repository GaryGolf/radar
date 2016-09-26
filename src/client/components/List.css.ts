import * as FreeStyle from 'react-free-style'

export const Style = FreeStyle.create()

export const flexContainer = Style.registerStyle({
  
    display: 'flex',
    justifyContent: 'flex-start', //space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
})

