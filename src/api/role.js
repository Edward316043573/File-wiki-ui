import request from '@/utils/request'

export const addRole = () => {

}

export const changeRoleStatus = () => {

}

export const dataScope = () => {

}

export const delRole = () => {

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

export const updateRole = () => {

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
