<template>
	<view class="content">
		<!-- 		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<view v-for="item in users" :key="item._id">
			<view>姓名：{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				users: []
			}
		},
		onLoad() {
			// this.loadHello()
			// this.loadUser()
		},
		methods: {
			loadHello() {
				uniCloud.callFunction({
					name: "hello",
					data: {
						num: "3"
					}
				}).then(res => {
					console.log(res);
				})
			},
			loadUser() {
				uniCloud.callFunction({
					name: "user"
				}).then(res => {
					console.log(res)
					this.users = res.result.data
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
