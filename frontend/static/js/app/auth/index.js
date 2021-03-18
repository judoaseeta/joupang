import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
// utils
import api from '../utils/api.js';
import handleError from '../utils/handleError.js';
// Icon Component
import Icon from '../icon/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.requestSignUp = this.requestSignUp.bind(this);
        this.requestSignIn = this.requestSignIn.bind(this);
        this.idValidater = this.idValidater.bind(this);
        this.pwValidater = this.pwValidater.bind(this);
        this.showType = this.showType.bind(this);
    }
    async requestSignUp(id, password) {
        try {
            const result =  await fetch(api.signUp,{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( {
                    id,
                    password
                })
            });
            const parsed = await result.json();
            if(!!parsed) {
                if(parsed.eCode) {
                    handleError(parsed.eCode);
                } else {
                    alert('축하합니다! 로그인 창으로 이동합니다.');
                    this.router.navigateTo('/auth/login');
                }
            }
        } catch(e) {
            alert(e);
        }
    }
    async requestSignIn(id, password) {
        const authInfo = id + ':' + password;
        const encodedAuthInfo = btoa(unescape(encodeURIComponent(authInfo)));
        try {
            const result = await fetch(api.login, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization' :encodedAuthInfo
                }
            });
            const parsed = await result.json();
            if(!!parsed) {
                if(parsed.eCode) {
                    handleError(parsed.eCode);
                } else {
                    window.localStorage.setItem('joupang', parsed.token);
                    this.observable.update({
                        auth: {
                            isLogin: true,
                            userId: parsed.id
                        }
                    });
                    history.go(-1);
                }
            }
        } catch(e) {
            console.log(e);
            alert('아이디 혹은 비밀번호를 다시 확인해보세요 !');
        }
    }
    onChange(e) {
        if(e.target.name === 'id') {
            this.idValidater(e.target.value);
        } else if(e.target.name === 'password') {
            this.pwValidater(e.target.value);
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const authType = this.router.getParams().type;
        console.log(authType);
        const id = e.target[0].value;
        const pw = e.target[1].value;
        if(this.idValidater(id) && this.pwValidater(pw)) {
            if(authType === 'signup') {
                this.requestSignUp(id,pw);  
            } else {
                this.requestSignIn(id,pw);
            }
        }
    }
    idValidater(id) {
        const container = document.getElementById(this.props.id);
        const errorMessage = container.getElementsByClassName('auth_error_message')[0];
        if(id.length < 4) {
            errorMessage.classList.remove('valid');
            errorMessage.classList.remove('invalid');
            errorMessage.innerText = '';
        } else if(id.length < 6) {
            errorMessage.classList.remove('valid');
            errorMessage.classList.add('invalid');
            errorMessage.innerText = '아이디는 영문 또는 숫자, 여섯 글자 이상이어야 합니다';
        } else {
            errorMessage.classList.remove('invalid');
            errorMessage.classList.add('valid');
            errorMessage.innerText = '올바른 아이디입니다';
        } 
        if(id.length < 13 && id.length > 6) {
            return true;
        }  
    }
    pwValidater(pw) {
        const container = document.getElementById(this.props.id);
        const lengthMessage = container.getElementsByClassName('auth_error_message')[1];
        const uppercaseMessage = container.getElementsByClassName('auth_error_message')[2];
        const specialCharMessage = container.getElementsByClassName('auth_error_message')[3];
        // regexes
        const uppercase = /[A-Z]{1,}/;
        const specialChars = /[\!\?\@\#\$\%\^\&\*]{1,}/;
        // validaters
        const isLongEnough = pw.length > 7;
        const isNotTooLong = pw.length <17;
        const hasUpperCase = uppercase.test(pw);
        const hasSpecialChar = specialChars.test(pw);
        // toggle class
        lengthMessage.classList.toggle('valid', isLongEnough && isNotTooLong);
        lengthMessage.classList.toggle('invalid', !isLongEnough || !isNotTooLong);
        uppercaseMessage.classList.toggle('valid', hasUpperCase);
        uppercaseMessage.classList.toggle('invalid', !hasUpperCase);
        specialCharMessage.classList.toggle('valid',hasSpecialChar);
        specialCharMessage.classList.toggle('invalid',!hasSpecialChar);
        if(!isLongEnough) {
            lengthMessage.innerText ='비밀번호는 8글자 이상이어야 합니다';
        } else if(!isNotTooLong) {
            lengthMessage.innerText ='비밀번호는 17글자 미만이어야 합니다';
        } 
        if(isLongEnough && isNotTooLong) {
            lengthMessage.innerText ='적절한 길이의 비밀번호입니다';
        }
        
        if(!hasUpperCase) {
            uppercaseMessage.innerText ='최소한 하나의 알파벳 대문자가 필요합니다';
        } else {
            uppercaseMessage.innerText ='알파벳 대문자를 포함합니다.';
        }
        
        if(!hasSpecialChar) {
            specialCharMessage.innerText ='최소한 하나의 특수문자(!?@#$%^&*)가 필요합니다';
        } else {
            specialCharMessage.innerText ='특수문자 하나가 포함됩니다';
        }
        if(isNotTooLong && isLongEnough && hasSpecialChar && hasUpperCase) {
            return true;
        }
    }
    showType() {
        const type = this.router.getParams().type;
        if(type === 'login') return '로그인';
        else if(type === 'signup') return '회원가입';
    }
    getHtml() {
        const { auth: { isLogin }} = this.observable.getState();
        if(isLogin) {
            this.router.back();
            return;
        }
        const container = this.container;
        const form = element('form', {
            props: {
                className: 'auth_form'
            },
            handler: {
                onInput: this.onChange,
                onSubmit: this.onSubmit
            }
        });
        renderer(form, element('legend', {
            content: `${this.showType()}`
        }))
        const idLabel = element('label', {
            props: {
                className: 'auth_label',
                attributes: {
                    for: 'id_input'
                }
            },
        })
        renderer(idLabel, element('input', {
            props: {
                className: 'auth_input',
                id: 'id_input',
                name:'id',   
                placeholder: '아이디'
            },
        }));
        renderer(idLabel, element('span', {
            props: {
                className: 'auth_error_message',
            },
        }));
        renderer(idLabel, new Icon({
            iconName: 'fa-user',
            className: 'auth_input_icon',
        }));
        const pwLabel = element('label', {
            props: {
                className: 'auth_label',
                attributes:{
                    for: 'password_input'
                }
            },
        });
        renderer(pwLabel, new Icon({
            iconName: 'fa-key',
            className: 'auth_input_icon',
        }));
        renderer(pwLabel, element('input', {
            props: {
                className: 'auth_input',
                id: 'password_input',
                type: 'password',
                name: 'password',
                autocomplete: true,
                placeholder: '비밀번호'
            },
        }));
        renderer(pwLabel, element('span', {
            props: {
                className: 'auth_error_message',
            },
        }));
        renderer(pwLabel, element('span', {
            props: {
                className: 'auth_error_message',
            },
        }));
        renderer(pwLabel, element('span', {
            props: {
                className: 'auth_error_message',
            },
        }));
        
        renderer(form, idLabel);
        renderer(form, pwLabel);
        renderer(form, element('button', {
            props: {
                type: 'submit'
            },
            content: '제출'
        }));
        renderer(container, form);
        return container;
    }
}