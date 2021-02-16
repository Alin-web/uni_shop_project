<template>
	<view class="list">
		<good-list @goodsDetail="goDetail" :goodsList="goodsList"></good-list>
		<view class="Prompt" v-if="isShow">------加载到底啦------</view>
	</view>
</template>

<script>
	import goodlist from '../../components/goods-list.vue'
	export default {
		data() {
			return {
				goodsList:[],
				num:1,
				isShow:false
			}
		},
		components:{'good-list':goodlist},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			// 请求商品列表数据
			async getGoodsList() {
				const {
					data: res
				} = await this.$http({
					url: '/api/getgoods?pageindex='+this.num
				})
				if (res.status !== 0) return uni.showToast({
					title: "商品列表请求失败"
				})
				this.goodsList = [...this.goodsList,...res.message]
				console.log(res.message);
			},
		goDetail(id){
			uni.navigateTo({
				url:'../goods-detail/goods-detail?id='+ id
			})
		}
	},
	onReachBottom() {
		if(this.goodsList.length < this.num*10){
			return  this.isShow = true
		}else{
			this.num++;
			this.getGoodsList()
		}
	},
	//监听下拉刷新钩子
	onPullDownRefresh() {
		this.goodsList= [],
		this.num = 1,
		this.isShow =false
		setTimeout(()=>{
			this.getGoodsList()
			uni.stopPullDownRefresh()
		},1000)
	}
	
}
</script>

<style>
	.Prompt{
		
		text-align: center;
		height: 50px;
		line-height: 50px;
		margin-top: 10rpx;
		background-color: #fff;
	}
	.list{
		background-color: #eee;
	}
</style>
