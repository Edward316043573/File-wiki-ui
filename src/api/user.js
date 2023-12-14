import request from '@/utils/request'


export const userLogin = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data,
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const userLogout = () => {
    return request({
        url: '/logout',
        method: 'post',
        data: "",
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const getSelfUserInfo = () => {
    return request({
        url: '/user/selfInfo',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const getUserBaseInfo = (data) => {
    return request({
        url: '/zyplayer-doc-wiki/common/user/base',
        method: 'post',
        data,
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const userGroupList = (data) => {
    return request({
        url: '/user/group/list',
        method: 'post',
        data,
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const getUserMessageList = (data) => {
    return request({
        url: '/user/message/list',
        method: 'post',
        data,
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const deleteUserMessage = (data) => {
    return request({
        url: '/user/message/delete',
        method: 'post',
        data,
        headers: {
            isToken: true,
            repeatSubmit: false
        }
    });
}

export const changeUserStatus = (data) => {

}

export const listUser = () => {

}

export const resetUserPwd = () => {

}

export const delUser = () => {

}

export const getUser = () => {

}

export const updateUser = () => {

}

export const addUser = () => {

}

export const deptTreeSelect = () => {

}

export default {
    userLogin,
    userLogout,
    getSelfUserInfo,
    getUserBaseInfo,
    userGroupList,
    getUserMessageList,
    deleteUserMessage
}
