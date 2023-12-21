import request from '@/utils/request'

export const addMenu = (data) => {
    return request({
        url: '/menu',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}

export const delMenu = (data) => {
    return request({
        url: '/menu/' + data,
        method: 'delete',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
    })
}

export const getMenu = () => {

}

export const listMenu = (query) => {
    return request({
        url: '/menu/list',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: query
    })
}

export const updateMenu = (data) => {
    return request({
        url: '/menu',
        method: 'put',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}

export const roleMenuTreeselect = () => {

}

export const treeselect = () => {

}

export default {
    addMenu,
    delMenu,
    getMenu,
    listMenu,
    updateMenu,
    roleMenuTreeselect,
    treeselect
};
