<template>
	<view>
		<view class="news-item" @click="godetails(item.id)" v-for="item in newsListData" :key="item.id">
			<image :src="item.img_url" mode=""></image>
			<view class="info">
				<view class="title">{{ item.title }}</view>
				<view class="content">
					<text>发表时间:{{ item.add_time | formData }}</text>
					<text>浏览:{{ item.click }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['newsListData'],
	filters: {
		formData(date) {
			//toString().padStart(2,0)  toString()把目标转换为字符串 padstart(长度,追加字符串) 如果目标不满足该长度 前面追加0
			console.log(date);
			const time = new Date(date);
			let y = time.getFullYear();
			let month = time.getMonth() + 1;
			let m = month.toString().padStart(2, 0);
			let d = time
				.getDate()
				.toString()
				.padStart(2, 0);
			return y + '-' + m + '-' + d;
		}
	},
	methods: {
		godetails(id) {
			this.$emit('details', id);
		}
	}
};
</script>

<style lang="scss">
.news-item {
	display: flex;
	padding: 10rpx 20rpx;
	border-bottom: 1rpx solid $shop-color;
	image {
		max-width: 200rpx;
		min-width: 200rpx;
		height: 150rpx;
	}
	.info {
		padding-top: 5rpx;
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			font-size: 30rpx;
			line-height: 50rpx;
		}
		.content {
			font-size: 24rpx;
			text:nth-child(2) {
				margin-left: 30rpx;
			}
		}
	}
}
</style>
