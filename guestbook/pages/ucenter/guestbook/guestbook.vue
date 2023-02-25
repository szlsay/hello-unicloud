<template>
	<view>
		guestbook
		<unicloud-db where="state == true" v-slot:default="{data, loading, error, options}"
			collection="guestbook, uni-id-users" field="_id, text, state, user_id{nickname, avatar_file, _id}">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				{{data}}
			</view>
		</unicloud-db>
		<button @click="add">添加</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			add() {
				const db = uniCloud.database()
				const guestbookTable = db.collection("guestbook")
				guestbookTable.add({
					"text": "1111"
				})
			}
		}
	}
</script>

<style>

</style>
