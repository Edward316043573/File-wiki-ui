import request from '@/utils/request'

export const addRole = (data) => {
    return request({
        url: '/role',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}

export const changeRoleStatus = () => {

}

export const dataScope = () => {

}

export const delRole = (data) => {
    return request({
        url: '/role/' + data,
        method: 'delete',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
    })
}

export const getRole = () => {

}

export const listRole = (query) => {
    return request({
        url: '/role/list',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: query
    })
}

export const updateRole = (data) => {
    return request({
        url: '/role',
        method: 'put',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}

export const deptTreeSelect = () => {

}

export default {
    addRole,
    changeRoleStatus,
    dataScope,
    delRole,
    getRole,
    listRole,
    updateRole,
    deptTreeSelect
}
