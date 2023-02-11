'use strict';
const db = uniCloud.database();


exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	//返回数据给客户端
	// 获取 `user` 集合的引用
	let res = await db.collection('user').get();
	return res
};
