const getByItemUrl = (category, id) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getitembyid?category=${category}&id=${id}`;
const getCommentsById = (id) => `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getcomments/${id}`;
const signUp = `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/signup`;
const signIn = `https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/login`;
const api = {
    getByItemUrl,
    getCommentsById,
    signUp,
    signIn
};

export default api;
