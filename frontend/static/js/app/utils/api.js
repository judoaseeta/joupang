const getByItemUrl = (category, id) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getitembyid?category=${category}&id=${id}`;
const getCommentsById = (category,id) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getcommentsbyid/${category}?id=${id}`;
const getCommentsByCategory = (category) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getcommentsbycategory/${category}`;
const getTestimonialsByCategory = (category) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/gettestimonialsbycategory/${category}`;
const signUp = `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/signup`;
const login = `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/login`;
const getItemsByCategory = (category, sub) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getitemsbyc/${category}?sub=${sub ? sub : ''}`;
const hasComment = (category,id) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/hasCommentByUserId/${category}?id=${id}`;
const searchItems = (category,keyword) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/searchitems/${category}?keyword=${keyword}`;
const createComment = 'https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/createComment';

const fetchWithAuthorization = async (url,method = "GET", body = undefined) => {
    const authHeader = new Headers();
    const token = window.localStorage.getItem('joupang');
    authHeader.append("Authorization", `Bearer ${token}`);
    authHeader.append("Content-Type","application/json");
    if(body) {
        return await fetch(url,{
            method,
            body:JSON.stringify(body),
            "headers": authHeader
        });
    } else {
        return await fetch(url,{
            method,
            "headers": authHeader
        });
    }
    
}

const logout = () => {
    window.localStorage.removeItem('joupang');
}

const api = {
    getByItemUrl,
    getCommentsByCategory,
    getCommentsById,
    getItemsByCategory,
    getTestimonialsByCategory,
    hasComment,
    createComment,
    fetchWithAuthorization,
    searchItems,
    signUp,
    login,
    logout
};

export default api;
