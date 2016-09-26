import * as FreeStyle from 'react-free-style'

export const Style: FreeStyle.ReactFreeStyle = FreeStyle.create()

export function prepareAnimation(img: Array<string>): string {

    let animation: any = {}
    const animationDirections = [
        { from: 'right top', to: 'left bottom'},
        { from: 'left bottom', to: 'right top'},
        { from: 'right bottom', to: 'left top'},
        { from: 'left top', to: 'right bottom'}
    ]

    for(var i = 0, begin = 0; i < img.length; i++, begin += 100/img.length ) {

        const end = (i+1 === img.length) ? 100 : begin + 100/img.length -.1
        const dir = animationDirections[Math.floor(Math.random()*animationDirections.length)]

        animation[begin+'%']={ background: `url('${img[i]}') no-repeat ${dir.from}` }
        animation[end+'%']={ background: `url('${img[i]}') no-repeat ${dir.to}` }
    }

    const animationName: string = Style.registerKeyframes(animation)
    const animationTimingFunction: string = (['linear','ease-in','ease-out','ease-in-out'])[Math.floor(Math.random()*4)]
    const animationDuration: string = img.length*(5+Math.floor(Math.random()*5))+'s'
    
    return Style.registerStyle({
        maxWidth: '600px',
        height: '400px',
        padding: '8px',
        margin: '2px',
        borderRadius: '5px',
        flex: '1 500px',
        boxSizing: 'content-box',

        animationIterationCount: 'infinite',
        animationTimingFunction,
        animationDuration,
        animationName
        
    })
}

export const wrapperStyle = Style.registerStyle({
    position: 'relative',
    background: 'linear-gradient(-30deg, rgba(0,0,0,.6), rgba(0,70,80,.3))',
    overflow: 'hidden',
    color: 'white',
    height: '100%',
    textShadow: '2px 2px 4px rgba(0,0,0,.3)',
    borderRadius: '5px'
})

export const titleStyle = Style.registerStyle({
    fontSize: '1.8em',
    padding: '10px',
    fontFamily: 'Times New Roman, Times, serif',
    fontWeight: 'bold',
    textAlign: 'right'
  
})

export const subtitleStyle = Style.registerStyle({
    padding: '10px',
    textAlign: 'right'
})

export const descriptionStyle = Style.registerStyle({
    paddingLeft: '10px',
    paddingRight: '10px',
    textAlign: 'justify'
})

export const tagStyle = Style.registerStyle({
    position: 'absolute',
    left: '10px',
    bottom: '10px',
    color: 'white',
    background: 'red',
    opacity: '1',
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    textAlign: 'center'
})