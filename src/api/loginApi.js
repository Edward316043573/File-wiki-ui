import request from '@/utils/request'

export const login = (username, password, code) => {
    const param = {
        username,
        password,
        code
    }
    return request({
        url: '/login',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    })
}

