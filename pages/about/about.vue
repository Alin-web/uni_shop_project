<template>
	<view class="about">
		<image src="http://yun.itheima.com/Upload/Images/2020-12-16/5fd9d9ba8f639.jpg" mode=""></image>
		<view class="info">
			<view @click="phone('400-618-4000')" > 联系电话: 400-618-4000 (点击拨打)</view>
			<view class="place">
				校区地址: 河南省郑州市新郑市皇帝故里景区
			</view>
		</view>
		<map class="map" :latitude="latitude" :longitude="longitude" :scale="scale" :markers="covers"></map>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude:34.40,
				longitude:113.728,
				scale:15,
				covers: [{
					latitude:34.40,
					longitude:113.728,
					iconPath:'../../static/hmlogo.png',
					width:40,
					height:40
				}]
			}
		},
		methods: {
			// 拨打电话
			phone(phoneNum){
				console.log(phoneNum);
				uni.makePhoneCall({
					phoneNumber:phoneNum
				})
			}
		}
	}
</script>

<style lang="scss">
.about{
	image{
		width: 100%;
		height: 400rpx;
	}
	.info{
		font-size: 30rpx;
		padding: 10rpx 15rpx;
		line-height: 60rpx;
	}
}
.map{
	
	width: 750rpx;
	height: 300px;
	
}
</style>
