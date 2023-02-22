<template>
	<view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="contacts">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="item in data" :key="item._id" :title="item.name" :note="item.phone" clickable
						@click="onClick(item)">
					</uni-list-item>
				</uni-list>
			</view>
		</unicloud-db>
		<button @click="onBtn">button</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			onClick(item) {
				const data = JSON.stringify(item)
				uni.navigateTo({
					url: '/pages/update/update?item=' + data,
				});
			},
			rmItem(data) {
				console.log(data);
				this.$refs.udb.remove(data)
			}
		}
	}
</script>

<style lang="scss">

</style>
