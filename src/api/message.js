import request from '@/utils/request'

export const getUserMessageList = (data) => {
    return request({
        url: '/wiki/user/message/list',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
};

export const readUserMessage = (data) => {
    return request({
        url: '/user/message/read',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
};

export default {
    getUserMessageList,
    readUserMessage
};
