<template>
	<view class="news"><news-list @details="goDetail" :newsListData="newsListData"></news-list></view>
</template>

<script>
import newslist from '../../components/news-item/news-item.vue';
export default {
	data() {
		return {
			newsListData: []
		};
	},
	onLoad() {
		this.getNewsListData();
	},
	components: {
		'news-list': newslist
	},
	methods: {
		//获取资讯列表
		async getNewsListData() {
			const { data: res } = await this.$http({
				url: '/api/getnewslist'
			});
			if (res.status !== 0)
				return uni.showToast({
					title: '请求数据失败'
				});

			this.newsListData = res.message;
		},
		// 进入详情页
		goDetail(id) {
			uni.navigateTo({
				url: '/components/detail/detail?id=' + id
			});
		}
	}
};
</script>

<style lang="scss"></style>
