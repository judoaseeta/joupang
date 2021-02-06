import Link from '../../router/link.js';
import element from '../../component/element.js';


const logoLink = new Link({
    props: {
        children: element('img', {
            props: {
                src:'https://res.cloudinary.com/mitoo/image/upload/c_scale,w_182/v1612365011/joupang/logo_transparent.png'
            }
        }),
        className: 'main_nav_logo',
        href: '/'
    }
});

export default logoLink;
