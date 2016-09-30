import * as React from 'react'
import * as FreeStyle from 'react-free-style'

interface Props {}
interface State {}

export default class MobileLayout extends React.Component<Props, State> {

    private container: HTMLDivElement
    private menu: HTMLDivElement
    private RFS: FreeStyle.ReactFreeStyle
    private Styles: any
    private isLeftMenuActive: boolean

    constructor(props: Props) {

        super(props)

        this.RFS = FreeStyle.create()
        this.Styles = {}
        this.isLeftMenuActive = false

        window.onclick = (event: Event) => console.log('orientation change')

    }

    prepareStyle() {

        this.Styles.container = this.RFS.registerStyle({

            // fontSize: '2em',
            display: 'block',
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            minHeight: '100%',
            background: 'white'
        })

        this.Styles.menu = this.RFS.registerStyle({
            display: 'block',
            position: 'absolute',
            top: '0px',
            left: '0px',
            minWidth: '100%',
            zIndex: '0',
            fontSize: '2em'
        })

        this.Styles.displayNone = this.RFS.registerStyle({
            display: 'none'
        })


        const slideKeyFarmes = this.RFS.registerKeyframes({
            'from': { transform: 'translateX(0)'},
            'to': { transform: 'translateX(75%)'}
        })

        this.Styles.slideForMenu = this.RFS.registerStyle({

            animationName: slideKeyFarmes,
            animationDuration: '1s',
            animationTimingFunction: 'cubic-bezier(.6,1,1,.9)',
            transform: 'translateX(75%)',
            boxShadow: '10, 10, 5, black'
            
        })


    }
    clickHandler(event: MouseEvent) {

        if(this.isLeftMenuActive) {

            this.container.classList.remove(this.Styles.slideForMenu)
            // this.menu.classList.remove(this.Styles.displayNone)
            this.isLeftMenuActive = false

        } else {
            this.container.classList.add(this.Styles.slideForMenu)
            // this.menu.classList.remove(this.Styles.displayNone)
            this.isLeftMenuActive = true
        }
    }
    componentWillMount () {

        this.prepareStyle()
        
    }

    componentDidMount () {

        this.RFS.inject(this.container)
        // this.menu.classList.add(this.Styles.displayNone)
    }

    render() {

        const menu = (
            <div className={this.Styles.menu} ref={element => this.menu = element}>
                <div> Create New </div>
                <div> Hold </div>
                <div> Save As </div>
                <div> Paste </div>
            </div>
        )

        return (
            <div>
                {menu}
            <div className={this.Styles.container} ref={element => this.container = element}
                onClick={this.clickHandler.bind(this)} >
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus rem, dolorum nobis, qui a maiores eos, quis dolore, iusto alias vitae eius. Nemo quos dolor asperiores! Quas, voluptas, inventore? Expedita odio pariatur, error dicta est modi nemo cumque enim, non ipsum nesciunt ab. Nobis quos accusantium doloribus voluptas itaque asperiores repellendus dolorum consequuntur vitae ab modi in adipisci error a quaerat ipsa ut ipsum suscipit nisi odio, ex, deleniti laboriosam ratione fuga inventore. Voluptates magni delectus voluptas quo repellendus, deserunt maiores aperiam dolore. Necessitatibus corporis iste a. Asperiores nesciunt incidunt explicabo eius reprehenderit architecto reiciendis esse inventore officiis maiores ipsa molestiae doloremque autem aspernatur dignissimos mollitia iure deleniti, quisquam excepturi tempora corrupti libero optio earum. Nihil veniam magni, eos eum vel eveniet quidem sequi rem voluptate earum placeat, nesciunt rerum quaerat. Debitis saepe officiis quam recusandae beatae illo cum tempora sed sequi expedita natus laborum ad suscipit reprehenderit hic adipisci veritatis, placeat omnis, magni. Natus, inventore accusantium suscipit, illo quas quis, animi cumque ipsa maiores quam commodi ut quo porro voluptates necessitatibus possimus! Reprehenderit ex eligendi aliquam blanditiis sapiente repudiandae reiciendis, sit deserunt ratione. Reprehenderit quidem alias suscipit impedit omnis amet molestiae iure dicta sequi ut nulla cum quas fuga tenetur, repellat necessitatibus illum, assumenda, magni commodi veritatis repudiandae nobis at architecto. Quas cumque impedit ad explicabo, quae accusantium aspernatur alias quisquam minima officia iure iste quaerat hic totam nemo placeat nostrum quis maiores repellendus corporis, fugit doloremque vel perspiciatis. Aperiam quaerat voluptates quos et vel deleniti fugit commodi atque ullam laudantium consequatur, quas esse, facere vero expedita at pariatur aspernatur magnam quae impedit obcaecati id tempore alias recusandae. Fugit nostrum sint inventore dignissimos eligendi aperiam excepturi. Consequatur corporis unde, sequi ad soluta ea eum quis illum impedit quidem, a facilis necessitatibus, cupiditate pariatur, ab voluptates doloribus omnis? Quod aut quo, eligendi nisi cum pariatur facere, unde laborum ipsam odio ea, impedit. Perferendis aliquid quas deleniti, quod nemo enim, in corporis nesciunt, tenetur beatae excepturi nostrum et officia atque! Officia vitae dolorum error doloribus nam molestiae sequi laboriosam quibusdam reprehenderit maxime iusto dolor, inventore tenetur impedit et eveniet aliquam veniam quidem ratione hic voluptate nemo? Corporis nihil excepturi ratione accusamus quidem autem molestias aliquam asperiores itaque error, quae suscipit earum soluta optio ad ut culpa expedita modi placeat architecto. Consectetur ullam officia modi amet, quo eos aut eveniet! Consectetur quae molestias soluta eius quas sint repellat eligendi reiciendis autem labore aliquam nulla deleniti voluptates eos, nisi. Nemo labore ullam laboriosam, laborum possimus perferendis repellendus. Labore eaque dignissimos laborum dolore suscipit tempore consequatur earum rerum hic debitis accusamus amet corporis facilis molestias animi quaerat, deserunt laudantium! Ea eaque laboriosam hic illo blanditiis rem reprehenderit delectus ab! Delectus eos error amet laudantium ipsa, voluptatibus dicta blanditiis ducimus tempore? Sint voluptatum id iure aspernatur laborum deleniti! Repellendus voluptates amet fuga incidunt eos eius dignissimos reiciendis nesciunt libero dolor neque adipisci voluptatum odit obcaecati, fugit, cupiditate dolores nisi ipsam accusamus facere itaque saepe recusandae laboriosam illum? Molestias fugit ea consectetur ipsa alias neque a eius possimus molestiae non deleniti, adipisci atque velit odio nemo ut quia quos dolorum qui laudantium, magnam quam repellendus sed tenetur. Consequatur aperiam eligendi totam possimus quia, maiores cumque laudantium beatae voluptatum nemo veritatis, quidem ipsam. Illum possimus cupiditate, sequi iusto minima iure laudantium. Amet libero eaque, aliquam praesentium, expedita porro velit vel dolor natus non modi nisi vero. Eaque laborum aperiam cum nihil dolore, facilis exercitationem voluptatem, saepe velit at, explicabo ullam aliquid harum vitae aut. Sed impedit oloribus quod quasi unde. Sunt quasi distinctio labore, natus amet dolores excepturi culpa voluptas accusantium dolorem, dignissimos quae rerum eius maiores doloribus quidem! Nemo iste optio dolores earum aliquam, eligendi quam voluptate consequatur aperiam? Maiores optio illum, est corrupti vitae nesciunt cupiditate enim quod possimus nemo asperiores. Molestias, velit, nostrum.
                </div>
            </div>
        </div>
        )
    }
} 