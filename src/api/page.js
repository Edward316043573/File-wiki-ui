import request from '@/utils/request'

export const pageUpdate = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageChangeParent = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/changeParent',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const updatePage = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const copyPage = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/copy',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const movePage = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/move',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const renamePage = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/rename',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageDetail = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/detail',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageDelete = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/delete',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageHistoryList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/history/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageHistoryDetail = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/history/detail',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageNews = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/news',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageSearchByEs = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/searchByEs',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageLock = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/lock',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageUnlock = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/unlock',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const spaceFavoriteUpdate = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/favorite/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const spaceAuthAssign = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/auth/assign',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const spaceAuthList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/auth/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const spaceSettingList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/setting/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const spaceSettingUpdate = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/setting/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const spaceList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const updateSpace = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/space/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const getPageUserAuthList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/auth/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const assignPageUserAuth = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/auth/assign',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const deletePageFile = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/file/delete',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageCommentList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/comment/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const updatePageComment = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/comment/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const deletePageComment = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/comment/delete',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const pageZanList = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/zan/list',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const updatePageZan = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/page/zan/update',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const openPageDetail = (data) => {
	const param = data;
	return request({
		url: '/zyplayer-doc-wiki/open-api/page/detail',
		headers: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: param
	});
};

export const openPageList = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/open-api/page/list',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data
	});
}

export const openSpaceInfo = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/open-api/space/info',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data
	});
}

export const openPageNews = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/open-api/page/news',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data
	});
}

export const addTemplate = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/template/add',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data
	});
}

export const getTemplate = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/template/filterAll',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data: Qs.stringify(data, { arrayFormat: "indices", allowDots: true })
	});
}

export const useTemplate = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/template/use',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data
	});
}

export const getTags = (data) => {
	return request({
		url: '/zyplayer-doc-wiki/template/allTags',
		method: 'post',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		data
	});
}
