import request from '@/utils/request'

export const systemUpgradeInfo = (data) => {
	return request({
		url: '/system/info/upgrade',
		header: {
			isToken: false,
			repeatSubmit: false
		},
		method: 'post',
		data: data
	})
}
