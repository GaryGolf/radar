import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Style, containerStyle, childSlideStyle, afterSlideStyle, toChildSlideStyle } from './OnePageScroll.css'

interface Props { children?: Element | React.ReactNode }
interface State {}

export default class OnePageScroll extends React.Component<Props, State> {

    private container: HTMLDivElement

    constructor (props: Props) {

        super(props)

        
    }

    componentWillMount () {

    }
    componentDidMount () {

        Style.inject(this.container)
        const length = this.container.children.length
        for(var i = 0; i < length; i++) {
            this.container.children.item(i).setAttribute('data-index',i.toString())
        }
    }

    clickHandler(event: MouseEvent) {

        console.log('click')
        this.container.children[0].className = childSlideStyle
        this.container.children[1].className = toChildSlideStyle
    }

    animationEndHandler(event: AnimationEvent) {

        console.log('animation ends')
        this.container.children[0].className = afterSlideStyle 
    }

    render () {
        return (
            <div className={containerStyle} ref={element => this.container = element} 
                onClick={this.clickHandler.bind(this)} 
                onAnimationStart={event => console.log('animation start')} 
                onWheel={event => console.log('wheel')} 
                onScroll={event => console.log('scroll')} 
                onAnimationEnd={this.animationEndHandler.bind(this)}>
                <div key={1} style={{position: 'absolute', width: '100%', height: '100%', background: 'white'}} onScroll={event => console.log('scroll')} >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolore cumque repellat saepe explicabo ullam officia velit? Libero quidem vitae veritatis illum, laboriosam autem, aut harum tempora, nobis a unde laborum nulla, blanditiis sunt nisi delectus eum officia tenetur atque aperiam similique. Nobis perferendis, cum ipsa nostrum, quod eaque architecto esse quam, nulla hic quae pariatur? Perspiciatis, cum quo mollitia ipsum? Impedit nam at eius hic suscipit nisi molestias vitae, magni quibusdam tenetur error incidunt id consequatur laborum consequuntur non unde. In quia exercitationem eos illo culpa nam eum reprehenderit blanditiis fuga asperiores eveniet vitae, harum vel animi dicta, iste incidunt quis fugit mollitia nisi tempora ratione ab magni molestias provident. Quis eum, itaque amet nobis! Rerum eos nostrum, explicabo, cupiditate nulla dolor inventore voluptas asperiores totam, nemo ipsa quos fugiat repudiandae. Blanditiis, tenetur, possimus. Excepturi ea saepe nisi recusandae iusto sapiente explicabo labore praesentium magni distinctio sed maiores tempora accusantium laudantium officia tempore sunt voluptates dolore, vero doloribus, ratione molestias dignissimos alias dolor. Asperiores rerum corporis sit molestiae non quo maxime quae quia facilis voluptatibus voluptatum ipsum reprehenderit est, numquam dolor autem aperiam debitis. Aliquid cumque non, iusto labore minima et velit recusandae, sed laborum ipsam quibusdam quod ad repudiandae, dicta asperiores ullam quas! Cum rerum in quibusdam, veritatis, nesciunt at deleniti illo repudiandae quasi dolores nulla, modi aperiam aliquam quod iure, sequi numquam. Eius nobis repellendus voluptatem unde excepturi nulla iure aliquam illum labore, numquam dignissimos dolorum laborum quam ratione sint nostrum odit, enim mollitia tempore. Ipsam dolore, nulla asperiores praesentium rem, eum laborum eveniet, placeat culpa voluptates fugit quasi aspernatur excepturi nobis tenetur. Deleniti quibusdam officia, velit inventore voluptatum harum cum, assumenda voluptates cupiditate! Natus, porro obcaecati sunt. Accusamus qui quibusdam consequuntur, autem, dolorum numquam debitis nisi neque dolorem aut! Omnis eos repudiandae laudantium veritatis atque perferendis harum dicta dolores eligendi dolorum molestiae ullam, voluptatibus numquam aspernatur velit, sit blanditiis adipisci quos necessitatibus et fugit non quas doloremque debitis. Optio cupiditate error, repellat quae odit, at autem impedit, deserunt quod repudiandae consequatur aliquid libero debitis ipsa, numquam! Sequi vitae nam asperiores, provident numquam ducimus quia veniam pariatur facilis. Ipsum excepturi id magnam dolorem error at sapiente pariatur fuga, debitis non ipsa ab accusamus fugiat eaque quo possimus. Vero provident, vel quos totam nesciunt recusandae velit modi ipsam ipsum id minima ullam distinctio commodi veritatis hic. Minima eligendi quis vitae dolorum eveniet voluptatem, velit repellendus aspernatur unde sit, tempore itaque rem illo doloribus rerum quisquam et, officiis distinctio. Labore quia et minus, tenetur accusamus modi cum fuga soluta ipsum cupiditate neque, placeat incidunt laudantium culpa obcaecati, voluptates! Fuga placeat odio neque architecto magnam fugit inventore recusandae fugiat. Eligendi officiis et atque dignissimos saepe dolores. Iusto in dolorem, id velit voluptas ratione repellendus dignissimos omnis sapiente veniam aperiam reiciendis maxime perferendis. Fuga quia delectus, repellendus reprehenderit laboriosam maiores, corrupti, perferendis sapiente doloremque, ipsa facere officiis nulla modi! Iure cum doloremque minima ipsam molestias. Quo voluptas repellat iste, est in! Illo tempora, fugit quae, reiciendis iste amet obcaecati quod distinctio.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dicta libero ratione, autem officiis inventore deleniti eligendi labore maiores laudantium vel reiciendis optio facilis harum suscipit quo tempore praesentium, repellat a saepe blanditiis aspernatur dignissimos. Nobis est officiis dolore quod numquam, quia ut vitae distinctio quo ad minus sed hic molestias odit, sint voluptatem. Accusantium odio repellat at quia hic ipsa, quas vero voluptatem veritatis, eum possimus. Iure aspernatur ea autem, dicta distinctio vitae, deserunt excepturi, voluptate voluptatem recusandae hic ut possimus a reprehenderit officiis. Nostrum tenetur, odit qui recusandae quam? Rerum officiis, eos nostrum cum molestiae adipisci dicta error labore, molestias optio ullam? Nam ipsa, ad a mollitia maxime sunt doloremque dolorum illum, fuga minus error quisquam consectetur totam sint perferendis hic, minima iure non atque unde doloribus odit facilis repellendus! Aut eligendi reprehenderit nulla doloremque assumenda, voluptate, vel et repudiandae pariatur, nesciunt temporibus placeat quia dicta magnam atque dolorum. Distinctio perspiciatis quas quisquam cumque ducimus, id quaerat optio, fugit esse, excepturi explicabo nesciunt odio doloribus non molestias dolores nihil possimus sint quae exercitationem ipsum. Voluptate vitae illum libero, sequi ea soluta perspiciatis eum. Magni ut aspernatur, doloribus sapiente doloremque deleniti magnam rerum dolorum nostrum quod deserunt ullam accusamus maxime minima autem, asperiores voluptatibus officiis? Doloribus ea a culpa, expedita quas temporibus exercitationem ullam quia necessitatibus voluptate quo sequi doloremque id ad, quisquam harum, sed ratione, dolore nihil nesciunt! Pariatur dolorem voluptatum voluptatibus! Quas alias deleniti eligendi error eum ab maiores eveniet, aperiam consequuntur officiis ipsa minus! Doloremque saepe corporis cumque iusto incidunt architecto libero eveniet, cum, odit asperiores, eos quos aliquid eaque id esse tenetur! Quaerat alias ea obcaecati voluptatibus culpa quod provident, esse fugiat qui inventore unde harum! Sunt laudantium numquam assumenda quidem laborum aspernatur, quaerat rerum dolores tempora veritatis dolor minima cum velit necessitatibus aperiam, vitae nisi consequatur autem, blanditiis nam, doloribus praesentium beatae deserunt nemo? Maiores repellat dolorem corporis veniam libero, iure sed accusantium perferendis tempora esse! Corporis necessitatibus doloremque voluptates, esse aspernatur, iste! Odit nostrum, libero eum consectetur quaerat, voluptatibus sapiente corporis non quidem maiores voluptatem facilis fugiat temporibus obcaecati labore. Soluta dolorem autem eveniet ipsum inventore eaque quidem aspernatur. Odio, aut nulla. Sed id minus, assumenda itaque quos placeat commodi, expedita eaque excepturi asperiores facilis, voluptatibus dolorum iure! Quo necessitatibus in eum sint nisi. Porro repellat magni harum, iste explicabo tempore suscipit at, nesciunt voluptatibus dolores quod minima molestiae, ducimus quos quibusdam ut.
                </div>
                <div key={2} style={{position: 'absolute', width: '100%', height: '100%', overflow:'hidden', display: 'block', zIndex: -1, color: 'white', background: 'silver' }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolore cumque repellat saepe explicabo ullam officia velit? Libero quidem vitae veritatis illum, laboriosam autem, aut harum tempora, nobis a unde laborum nulla, blanditiis sunt nisi delectus eum officia tenetur atque aperiam similique. Nobis perferendis, cum ipsa nostrum, quod eaque architecto esse quam, nulla hic quae pariatur? Perspiciatis, cum quo mollitia ipsum? Impedit nam at eius hic suscipit nisi molestias vitae, magni quibusdam tenetur error incidunt id consequatur laborum consequuntur non unde. In quia exercitationem eos illo culpa nam eum reprehenderit blanditiis fuga asperiores eveniet vitae, harum vel animi dicta, iste incidunt quis fugit mollitia nisi tempora ratione ab magni molestias provident. Quis eum, itaque amet nobis! Rerum eos nostrum, explicabo, cupiditate nulla dolor inventore voluptas asperiores totam, nemo ipsa quos fugiat repudiandae. Blanditiis, tenetur, possimus. Excepturi ea saepe nisi recusandae iusto sapiente explicabo labore praesentium magni distinctio sed maiores tempora accusantium laudantium officia tempore sunt voluptates dolore, vero doloribus, ratione molestias dignissimos alias dolor. Asperiores rerum corporis sit molestiae non quo maxime quae quia facilis voluptatibus voluptatum ipsum reprehenderit est, numquam dolor autem aperiam debitis. Aliquid cumque non, iusto labore minima et velit recusandae, sed laborum ipsam quibusdam quod ad repudiandae, dicta asperiores ullam quas! Cum rerum in quibusdam, veritatis, nesciunt at deleniti illo repudiandae quasi dolores nulla, modi aperiam aliquam quod iure, sequi numquam. Eius nobis repellendus voluptatem unde excepturi nulla iure aliquam illum labore, numquam dignissimos dolorum laborum quam ratione sint nostrum odit, enim mollitia tempore. Ipsam dolore, nulla asperiores praesentium rem, eum laborum eveniet, placeat culpa voluptates fugit quasi aspernatur excepturi nobis tenetur. Deleniti quibusdam officia, velit inventore voluptatum harum cum, assumenda voluptates cupiditate! Natus, porro obcaecati sunt. Accusamus qui quibusdam consequuntur, autem, dolorum numquam debitis nisi neque dolorem aut! Omnis eos repudiandae laudantium veritatis atque perferendis harum dicta dolores eligendi dolorum molestiae ullam, voluptatibus numquam aspernatur velit, sit blanditiis adipisci quos necessitatibus et fugit non quas doloremque debitis. Optio cupiditate error, repellat quae odit, at autem impedit, deserunt quod repudiandae consequatur aliquid libero debitis ipsa, numquam! Sequi vitae nam asperiores, provident numquam ducimus quia veniam pariatur facilis. Ipsum excepturi id magnam dolorem error at sapiente pariatur fuga, debitis non ipsa ab accusamus fugiat eaque quo possimus. Vero provident, vel quos totam nesciunt recusandae velit modi ipsam ipsum id minima ullam distinctio commodi veritatis hic. Minima eligendi quis vitae dolorum eveniet voluptatem, velit repellendus aspernatur unde sit, tempore itaque rem illo doloribus rerum quisquam et, officiis distinctio. Labore quia et minus, tenetur accusamus modi cum fuga soluta ipsum cupiditate neque, placeat incidunt laudantium culpa obcaecati, voluptates! Fuga placeat odio neque architecto magnam fugit inventore recusandae fugiat. Eligendi officiis et atque dignissimos saepe dolores. Iusto in dolorem, id velit voluptas ratione repellendus dignissimos omnis sapiente veniam aperiam reiciendis maxime perferendis. Fuga quia delectus, repellendus reprehenderit laboriosam maiores, corrupti, perferendis sapiente doloremque, ipsa facere officiis nulla modi! Iure cum doloremque minima ipsam molestias. Quo voluptas repellat iste, est in! Illo tempora, fugit quae, reiciendis iste amet obcaecati quod distinctio.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dicta libero ratione, autem officiis inventore deleniti eligendi labore maiores laudantium vel reiciendis optio facilis harum suscipit quo tempore praesentium, repellat a saepe blanditiis aspernatur dignissimos. Nobis est officiis dolore quod numquam, quia ut vitae distinctio quo ad minus sed hic molestias odit, sint voluptatem. Accusantium odio repellat at quia hic ipsa, quas vero voluptatem veritatis, eum possimus. Iure aspernatur ea autem, dicta distinctio vitae, deserunt excepturi, voluptate voluptatem recusandae hic ut possimus a reprehenderit officiis. Nostrum tenetur, odit qui recusandae quam? Rerum officiis, eos nostrum cum molestiae adipisci dicta error labore, molestias optio ullam? Nam ipsa, ad a mollitia maxime sunt doloremque dolorum illum, fuga minus error quisquam consectetur totam sint perferendis hic, minima iure non atque unde doloribus odit facilis repellendus! Aut eligendi reprehenderit nulla doloremque assumenda, voluptate, vel et repudiandae pariatur, nesciunt temporibus placeat quia dicta magnam atque dolorum. Distinctio perspiciatis quas quisquam cumque ducimus, id quaerat optio, fugit esse, excepturi explicabo nesciunt odio doloribus non molestias dolores nihil possimus sint quae exercitationem ipsum. Voluptate vitae illum libero, sequi ea soluta perspiciatis eum. Magni ut aspernatur, doloribus sapiente doloremque deleniti magnam rerum dolorum nostrum quod deserunt ullam accusamus maxime minima autem, asperiores voluptatibus officiis? Doloribus ea a culpa, expedita quas temporibus exercitationem ullam quia necessitatibus voluptate quo sequi doloremque id ad, quisquam harum, sed ratione, dolore nihil nesciunt! Pariatur dolorem voluptatum voluptatibus! Quas alias deleniti eligendi error eum ab maiores eveniet, aperiam consequuntur officiis ipsa minus! Doloremque saepe corporis cumque iusto incidunt architecto libero eveniet, cum, odit asperiores, eos quos aliquid eaque id esse tenetur! Quaerat alias ea obcaecati voluptatibus culpa quod provident, esse fugiat qui inventore unde harum! Sunt laudantium numquam assumenda quidem laborum aspernatur, quaerat rerum dolores tempora veritatis dolor minima cum velit necessitatibus aperiam, vitae nisi consequatur autem, blanditiis nam, doloribus praesentium beatae deserunt nemo? Maiores repellat dolorem corporis veniam libero, iure sed accusantium perferendis tempora esse! Corporis necessitatibus doloremque voluptates, esse aspernatur, iste! Odit nostrum, libero eum consectetur quaerat, voluptatibus sapiente corporis non quidem maiores voluptatem facilis fugiat temporibus obcaecati labore. Soluta dolorem autem eveniet ipsum inventore eaque quidem aspernatur. Odio, aut nulla. Sed id minus, assumenda itaque quos placeat commodi, expedita eaque excepturi asperiores facilis, voluptatibus dolorum iure! Quo necessitatibus in eum sint nisi. Porro repellat magni harum, iste explicabo tempore suscipit at, nesciunt voluptatibus dolores quod minima molestiae, ducimus quos quibusdam ut.
                </div>
            </div>
        )

    }

}