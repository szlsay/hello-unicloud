'use strict';
const db = uniCloud.database();


// exports.main = async (event, context) => {
// 	//event为客户端上传的参数
// 	console.log('event : ', event)

// 	//返回数据给客户端
// 	// 获取 `user` 集合的引用
// 	// let res = await db.collection('user').get();
// 	// let res = await db.collection('user').count();
// 	let res = await db.collection('user').add({
// 		"name": "st2",
// 		"age": 13
// 	});
// 	return res
// };

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('接收数据 : ', event)
	//返回数据给客户端
	let res = await db.collection('user').add(event)
	return res
};
