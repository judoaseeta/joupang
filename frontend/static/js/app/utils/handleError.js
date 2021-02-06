/**
 * 에러코드(eCode)
 * 101: 회원가입에러:아이디가 이미 존재합니다.
 * 102: 로그인 에러: 아이디가 존재하지 않습니다.
 * 103: 로그인 에러: 비밀번호가 일치하지 않습니다.
 * 
 */

 export default function handleError(eCode) {
     switch(eCode) {
        case 101 :
            alert('아이디가 이미 존재합니다');
            break;
        case 102 :
            alert('아이디가 존재하지 않습니다');
            break;
        case 103 :
            alert('비밀번호가 일치하지 않습니다');
            break;
     }
 }