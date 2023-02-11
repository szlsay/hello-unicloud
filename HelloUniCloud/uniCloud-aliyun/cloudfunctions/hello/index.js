// 'use strict';
// exports.main = async (event, context) => {
// 	//event为客户端上传的参数
// 	console.log('event : ', event)
	
// 	//返回数据给客户端
// 	return event
// };

exports.main = async(event, context) => {
	let array = [
		{"id": 1, "name": "st1"},
		{"id": 2, "name": "st2"},
		{"id": 3, "name": "st3"},
		{"id": 4, "name": "st4"},
		{"id": 5, "name": "st5"},
	]
	let { num } = event
	return array.slice(0, num)
}
