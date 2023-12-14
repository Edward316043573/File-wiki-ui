import request from '@/utils/request'

export const pageUpdate = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageChangeParent = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/changeParent',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageList = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const updatePage = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const copyPage = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/copy',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const movePage = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/move',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const renamePage = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/rename',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageDetail = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/detail',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export function delDept(deptId) {
    return request({
        url: '/system/dept/' + deptId,
        method: 'delete'
    })
}

export const pageDelete = (data) => {
    return request({
        url: '/wiki/page/delete/' + data.pageId,
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'delete',
    });
};

export const pageHistoryList = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/history/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageHistoryDetail = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/history/detail',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageNews = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/news',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageSearchByEs = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/searchByEs',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageLock = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/lock',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageUnlock = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/unlock',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const spaceFavoriteUpdate = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/favorite/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const spaceAuthAssign = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/auth/assign',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const spaceAuthList = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/auth/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const spaceSettingList = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/setting/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const spaceSettingUpdate = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/setting/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const spaceList = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const updateSpace = (data) => {
    const param = data;
    return request({
        url: '/wiki/space/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const getPageUserAuthList = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/auth/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const assignPageUserAuth = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/auth/assign',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const deletePageFile = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/file/delete',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageCommentList = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/comment/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const updatePageComment = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/comment/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const deletePageComment = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/comment/delete',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const pageZanList = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/zan/list',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const updatePageZan = (data) => {
    const param = data;
    return request({
        url: '/wiki/page/zan/update',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const openPageDetail = (data) => {
    const param = data;
    return request({
        url: '/wiki/open-api/page/detail',
        headers: {
            isToken: true,
            repeatSubmit: false
        },
        method: 'post',
        data: param
    });
};

export const openPageList = (data) => {
    return request({
        url: '/wiki/open-api/page/list',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data
    });
}

export const openSpaceInfo = (data) => {
    return request({
        url: '/wiki/open-api/space/info',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data
    });
}

export const openPageNews = (data) => {
    return request({
        url: '/wiki/open-api/page/news',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data
    });
}

export const addTemplate = (data) => {
    return request({
        url: '/wiki/template/add',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data
    });
}

export const getTemplate = (data) => {
    return request({
        url: '/wiki/template/filterAll',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data: data
    });
}

export const useTemplate = (data) => {
    return request({
        url: '/wiki/template/use',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data
    });
}

export const getTags = (data) => {
    return request({
        url: '/wiki/template/allTags',
        method: 'post',
        header: {
            isToken: true,
            repeatSubmit: false
        },
        data
    });
}

export default {
    pageUpdate,
    pageChangeParent,
    pageList,
    updatePage,
    copyPage,
    movePage,
    renamePage,
    pageDetail,
    pageDelete,
    pageHistoryList,
    pageHistoryDetail,
    pageNews,
    pageSearchByEs,
    pageLock,
    pageUnlock,
    spaceFavoriteUpdate,
    spaceAuthAssign,
    spaceAuthList,
    spaceSettingList,
    spaceSettingUpdate,
    spaceList,
    updateSpace,
    getPageUserAuthList,
    assignPageUserAuth,
    deletePageFile,
    pageCommentList,
    updatePageComment,
    deletePageComment,
    pageZanList,
    updatePageZan,
    openPageDetail,
    openPageList,
    openSpaceInfo,
    openPageNews,
    addTemplate,
    getTemplate,
    useTemplate,
    getTags
}
