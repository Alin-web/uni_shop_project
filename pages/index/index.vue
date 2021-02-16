<template>
	<view class="home">
		<!-- :circular="true"  是否采用衔接滑动，即播放到末尾后重新回到开头-->
		<!--:autoplay="true" 是否自自动切换  interval 间隔时长 duration 滑动时常  -->
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="2000" :duration="800">
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nva">
			<view class="nva-item" v-for="(item,index) in nvalist" :key="index" @click="nvaItemClick(item.path)">
				<view class="iconFonts">
					<text :class="item.fonts"></text>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods">
			<view class="tit">
				推荐商品
			</view>
			<good-list @goodsDetail="goDetail" :goodsList="goodsList"></good-list>
		</view>
	</view>
</template>

<script>
	import goodlist from '../../components/goods-list.vue'
	export default {
		data() {
			return {
				swipers: [],
				goodsList: [],
				nvalist:[
						{
							title:'黑马超市',
							fonts:'iconfont icon-ziyuan',
							path:'/pages/goods/goods'
						},
						{
							title:'关于我们',
							fonts:'iconfont icon-guanyuwomen',
							path:'/pages/about/about'
						},
						{
							title:'社区图片',
							fonts:'iconfont icon-tupian',
							path:'/pages/community/community'
						},
						{
							title:'学习视频',
							fonts:'iconfont icon-shipin',
							path:'/pages/video/video'
						}
					]
			}
		},
		onLoad() {
			this.getlbData()
			this.getGoodsList()
		},
		components:{'good-list':goodlist},
		methods: {
			//请求数据
			async getlbData() {
				const {
					data: res
				} = await this.$http({
					url: '/api/getlunbo'
				})
				if (res.status !== 0) return uni.showToast({
					title: '请求失败'
				})
				this.swipers = res.message
				// console.log(this.swipers);
			},
			// 导航点击跳转
			nvaItemClick(navurl){
				console.log(navurl);
				// 跳转
				uni.navigateTo({
					url:navurl
				})
			},
			// 请求商品列表数据
			async getGoodsList() {
				const {
					data: res
				} = await this.$http({
					url: '/api/getgoods?pageindex=1'
				})
				if (res.status !== 0) return uni.showToast({
					title: "商品列表请求失败"
				})
				this.goodsList = res.message
				console.log(res.message);
			},
			// 跳转到商品详情页
			goDetail(id){
				uni.navigateTo({
					url:'../goods-detail/goods-detail?id='+ id
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.home {

		swiper {
			margin: 0;
			width: 750rpx;
			height: 380rpx;

			swiper-item {
				image {
					
					width: 750rpx;
					height: 380rpx;
				}
			}
		}
	}
	.nva{
		display: flex;
		.nva-item{
			width: 25%;
			text-align: center;
			margin-top: 10rpx;
			view{
				width: 120rpx;
				height: 120rpx;
				background-color: #b50e30;
				margin: 0 auto;
				border-radius: 50%;
				.iconfont{
					line-height: 120rpx;
					color: #fff;
					font-size: 50rpx;
				}
			}
			text{
				font-size: 30rpx;
			}
		}
	}
	.goods{
		width: 100%;
		margin-top: 20rpx;
		background-color:#eee;
		overflow: hidden;
		.tit{
			height: 50px;
			line-height: 50px;
			margin: 10rpx 0;
			background-color:#fff;
			color: $shop-color;
			text-align: center;
			/* letter-spacing  文字之间的距离 */
			letter-spacing: 20px;
		}
	}
</style>
