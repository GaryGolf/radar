import * as FreeStyle from 'react-free-style'

export const Style: FreeStyle.ReactFreeStyle = FreeStyle.create() 

export const containerStyle = Style.registerStyle({

    position: 'absolute',
    overflow: 'hidden',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%'
})

const slideKeyFarmes = Style.registerKeyframes({
    'from': { transform: 'translateX(0)'},
    'to': { transform: 'translateX(80%)'}
})

export const childSlideStyle = Style.registerStyle({

    display: 'block',   
    animationName: slideKeyFarmes,
    animationDuration: '1s',
    animationTimingFunction: 'cubic-bezier(.6,1,1,.7)',
    // transform: 'translate3d(0,100%,0)'
    
})

export const afterSlideStyle = Style.registerStyle({

//    display: 'none'
  transform: 'translateX(80%)'
})

const toSlideKeyFrames = Style.registerKeyframes({

    'from': { transform: 'translate3d(0,100%,0)'},
    'to': { transform: 'translate3d(0,0,0)'}
})

export const toChildSlideStyle = Style.registerStyle({

    // display: 'block',
    // animationName: toSlideKeyFrames,
    // animationDuration: '1s',
    // animationTimingFunction: 'cubic-bezier(.6,1,1,.7)',
    
}) 

