<template>
	<view class="goods-list">
		<view class="goods-item" @click="goGoodsDetail(item.id)"  v-for="item in goodsList" :key="item.id">
			<image :src="item.img_url" mode=""></image>
			<view class="price">
				<text>￥{{item.market_price}}</text> <text>￥{{item.sell_price}}</text>
			</view>
			<view class="name">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goodsList'],
		methods:{
			goGoodsDetail(id){
				this.$emit('goodsDetail',id)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods-item {
			margin-top: 10rpx;
			width: 355rpx;
			font-size: 30rpx;
			box-sizing: border-box;
			background-color: #fff;

			//text-align: center;
			padding: 15rpx;

			image {
				width: 80%;
				height: 150px;
				margin-top: 10rpx;
				// uni中img默认是个行内块 
				display: flex;
				margin: 0 auto;
			}

			.price {
				color: $shop-color;
				font-size: 30rpx;
				margin-bottom: 15rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 26rpx;
					margin-left: 17rpx;
					// 文字下划线
					text-decoration: line-through;
				}
			}
			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 0 15rpx;
			}
		}
	}

</style>
