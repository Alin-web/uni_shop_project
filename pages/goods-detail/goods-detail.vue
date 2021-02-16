<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true">
			<swiper-item v-for="(item, index) in image" :key="index"><image :src="item.src"></image></swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{ goodsInfo.sell_price }}</text>
				<text>￥{{ goodsInfo.market_price }}</text>
			</view>
			<view class="title">{{ goodsInfo.title }}</view>
		</view>
		<view class="box2">
			<view>货号:&nbsp;&nbsp;{{ goodsInfo.goods_no }}</view>
			<view>库存:&nbsp;&nbsp;{{ goodsInfo.stock_quantity }}</view>
		</view>
		<view class="box3">
			<view>详情介绍:&nbsp;&nbsp;{{ detailContent.title }}</view>
			<view>
				内容:
				<rich-text :nodes="detailContent.content"></rich-text>
			</view>
		</view>
		<view class="shop">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
export default {
	data() {
		return {
			id: null,
			image: [],
			goodsInfo: [],
			detailContent: [],
			options: [
				{
					icon: 'headphones',
					text: '客服'
				},
				{
					icon: 'shop',
					text: '店铺',
					// info: 2,
					// infoBackgroundColor: '#007aff',
					infoColor: 'red'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	components: { uniGoodsNav },
	onLoad(id) {
		this.id = id.id;
		this.getSwiperData();
		this.getGoodsInfoData();
		this.getDetailContent();
	},
	methods: {
		// 得到轮播图数据
		async getSwiperData() {
			const { data: res } = await this.$http({
				url: '/api/getthumimages/' + this.id
			});
			this.image = res.message;
		},
		// 得到商品信息数据
		async getGoodsInfoData() {
			const { data: res } = await this.$http({
				url: '/api/goods/getinfo/' + this.id
			});
			this.goodsInfo = res.message[0];
		},
		// 获得详情内容
		async getDetailContent() {
			const { data: res } = await this.$http({
				url: '/api/goods/getdesc/' + this.id
			});
			this.detailContent = res.message[0];
			console.log(res.message[0]);
		},
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none'
			});
		},
		buttonClick(e) {
			console.log(e);
			this.options[2].info++;
		}
	}
};
</script>

<style lang="scss">
swiper {
	margin: 0;
	width: 750rpx;
	height: 700rpx;
	swiper-item {
		image {
			width: 750rpx;
			height: 700rpx;
		}
	}
}
.box1 {
	padding: 10rpx;
	border-bottom: 1px solid #ccc;
	.price {
		font-size: 35rpx;
		color: $shop-color;
		line-height: 60rpx;
		text:nth-child(2) {
			font-size: 25rpx;
			color: #ccc;
			text-decoration: line-through;
			margin-left: 20rpx;
		}
	}
	.title {
		font-size: 32rpx;
		line-height: 60rpx;
	}
}
.box2 {
	padding: 10rpx;
	border-bottom: 1px solid #ccc;
	view {
		font-size: 32rpx;
		line-height: 50rpx;
	}
}
.box3 {
	margin-bottom: 50rpx;
	padding: 10rpx;
	border-bottom: 1px solid #ccc;
	view {
		font-size: 32rpx;
		line-height: 60rpx;
	}
}
.shop{
	// 绝对定位 根据浏览器进行定位 不会动
	position: fixed;
	bottom: 0;
	width: 750rpx;
}
</style>
