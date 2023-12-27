import request from '@/utils/request'

export const downloadPDF = (data) => {
    return request({
        url: '/wiki/page/file/download',
        method: 'get',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        params:{
            spaceId: data
        },
        data: data,
        responseType: 'blob'
    })
}

export const getPDFStorePath = (data) => {
    return request({
        url: '/wiki/page/file/PDFStorePath',
        method: 'get',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        params:{
          spaceId: data
        },
        data: data
    })
}

export default {
    downloadPDF,
    getPDFStorePath
}
