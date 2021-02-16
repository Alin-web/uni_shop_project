<template>
	<view class="detail" >
		<view class="title">{{detailsInfo.title}}</view>
		<view class="info">
			<text class="time">发表时间:{{detailsInfo.add_time | formData }}</text>
			<text>浏览:{{detailsInfo.click}}</text>
		</view>
		<view class="content">
			<!-- 使用富文本解析带后台html和CSS的数据 -->
			<rich-text :nodes="detailsInfo.content"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			detailsInfo:[]
		};
	},
	
	onLoad(id) {
		this.id = id.id;
		this.getDetailsData();
	},
	methods: {
		async getDetailsData() {
			const {data:res} = await this.$http({
				url:'/api/getnew/'+this.id
			})
			if(res.status !== 0) return uni.showToast({
				title:'请求失败'
			})
			console.log(res.message);
			this.detailsInfo = res.message[0]
		}
	}
};
</script>

<style lang="scss">
.detail{
	font-size: 30rpx;
	padding: 20rpx;
	.title{
		text-align: center;
	}
	.info{
		display: flex;
		justify-content: center;
		text:nth-child(1){
			margin-right: 40rpx;
		}
		text:nth-child(2){
			margin-left: 20rpx;
		}
	}
}
</style>
