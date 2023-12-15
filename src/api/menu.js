import request from '@/utils/request'

export const addMenu = () => {

}

export const delMenu = () => {

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

export const updateMenu = () => {

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
