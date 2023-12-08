import request from '@/utils/request'


export const userLogin = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}

export const userLogout = () => {
    return request({
        url: '/logout',
        method: 'post',
        data: "",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}

export const getSelfUserInfo = () => {
    return request({
        url: '/user/info/selfInfo',
        method: 'post',
        data: "",
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}

export const getUserBaseInfo = (data) => {
    return request({
        url: '/zyplayer-doc-wiki/common/user/base',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}

export const userGroupList = (data) => {
    return request({
        url: '/user/group/list',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}

export const getUserMessageList = (data) => {
    return request({
        url: '/user/message/list',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}

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
}

export const deleteUserMessage = (data) => {
    return request({
        url: '/user/message/delete',
        method: 'post',
        data,
        header: {
            isToken: false,
            repeatSubmit: false
        }
    });
}
