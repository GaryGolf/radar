/// <reference path="./Socket.d.ts" />

import * as React from 'react'
import * as IO from 'socket.io-client'
import { Style, flexContainer } from './List.css'
import ListItem from './ListItem'

interface Props { children?: React.ReactNode }
interface State {}

export default class List extends React.Component <Props, State> {

    private container: HTMLDivElement
    private a: any

    constructor(props: Props) {

        super(props)
    }

    componentWillMount () {

        
        this.a = [{
                title: 'Шикарный офис в центре',
                subtitle: 'Оффисный центр, четвертый этаж, 25кв.м', 
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quia quos odio fugiat qui. Eaque ea reprehenderit doloremque. Odit distinctio nisi eos delectus eaque provident consequuntur perferendis maiores, saepe doloribus suscipit quasi ad aut nam sapiente quas iste quo quidem, reiciendis, accusamus quam eligendi.\nUllam earum doloribus recusandae, quis, minus ipsa obcaecati dolores modi odio, beatae iusto, quaerat. Dicta architecto in perferendis ut modi velit consequatur itaque suscipit, reiciendis officia laborum praesentium numquam fuga labore ea cum eius soluta sit magni eaque unde perspiciatis asperiores? Cupiditate minus quis distinctio sequi placeat dolores reiciendis, inventore officiis eos quas quo illum perspiciatis?',
                img: ['img/1ee70cab09e65d1bf_900.jpg','img/c3bae5812bc053fd4_900.jpg'],
                tag: 'A'
            },
            {
                title: ' Магазин на красной линии',
                subtitle: '97м.кв',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia voluptas voluptatum, dolorum praesentium alias nihil, commodi laudantium dignissimos atque, molestiae cum. Aliquam officia, beatae incidunt officiis quas facere laboriosam laudantium eos. Magni molestiae at officiis quisquam sequi. Non deleniti mollitia, officia eveniet voluptatibus, fugit illo delectus minus odit sequi, enim magnam, omnis neque. Veritatis quam, sint magni dolor quos odio esse doloribus amet sequi harum. Tempora recusandae fugiat, nisi quis doloribus, voluptate, harum, quo facilis voluptates beatae mollitia et soluta consectetur ipsa. Neque sunt illo inventore maxime beatae quia unde quo, dolores ab minus modi iste molestiae, consequuntur, eligendi rem dignissimos distinctio aliquam sapiente quis tempore saepe voluptas? Dolore laudantium incidunt aperiam. Illum consequuntur, odit ut voluptatibus esse autem quia enim soluta animi fuga nihil est ullam dolorem maiores minus.',
                tag: 'B',
                img: ['img/366e860ebd645ba3e_900.jpg','img/ebb0de675f5c3e358_900.jpg']
            },
            {
                title: 'Уютное Кафе',
                subtitle: '64м.кв',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere expedita voluptatem corrupti voluptatum nemo explicabo temporibus, labore fuga, quae dolorem possimus, dicta hic culpa. Excepturi dicta doloremque inventore dolores, perspiciatis consectetur tempora tenetur similique officiis magni asperiores natus, laboriosam id a deleniti sapiente culpa, at rerum nesciunt quibusdam soluta quae aut repellendus! Reprehenderit velit sequi reiciendis debitis quasi deleniti natus nisi, non nostrum id beatae expedita consequuntur numquam saepe. Non.',
                tag: 'C',
                img: ['img/fa9d3ac22f33cca91_900.jpg','img/ce7cf0f9bfee28f14_900.jpg','img/c1efaa7bdf2b6e920_900.jpg','img/3d78848928321c054_900.jpg','img/fa9d3ac22f33cca91_900.jpg']
            }
        ]
    }

    componentDidMount () {

        Style.inject(this.container)
    }

    render() {

        const listItems = this.a.map((item: any, idx: number) => {
            return (
                <ListItem key={idx} info={item} />
            )
        })

        return (
            <div className={flexContainer} ref={element => this.container = element}>
                {this.props.children}
                {listItems}
            </div>
        )

    }
}