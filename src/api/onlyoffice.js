import request from '@/utils/request'

// 预览文档
export const previewOfficeFile = (data) => {
    return request({
        url: '/office/previewofficefile',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}
// 创建文档
export const createOfficeFile = (data) => {
    return request({
        url: '/file/createFile',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}
// 编辑文档
export const editOfficeFile = (data) => {
    return request({
        url: '/office/editofficefile',
        method: 'post',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    })
}
