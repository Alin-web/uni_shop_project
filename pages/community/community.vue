<template>
	<view class="pics">
		<scroll-view scroll-y="true" class="left">
			<view :class="clickIndex === index ? 'active' : ''" @click="leftMneuClick(index, item.id)" v-for="(item, index) in menuList" :key="item.id">{{ item.title }}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="right">
			<view class="item" v-for="item in rightSecondData" :key="item.id">
				<image @click="imageUrl(item.img_url)" :src="item.img_url" mode=""></image>
				<view>{{ item.title }}</view>
			</view>
			<view v-if="rightSecondData.length === 0">当前页面无数据</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuList: [],
			clickIndex: 0,
			rightSecondData: []
		};
	},
	onLoad() {
		this.getMenuList();
	},
	methods: {
		async getMenuList() {
			const { data: res } = await this.$http({
				url: '/api/getimgcategory'
			});
			if (res.status !== 0)
				return uni.showToast({
					title: '发送请求失败'
				});
			this.menuList = res.message;
			// console.log(res.message[0].id);
			// 页面刚开始加载的时候调用右侧菜单栏的函数 进行页面的初始化渲染
			// const a = res.message[0].id    res.message[0].id 是默认点击第一项的Id
			this.getRightData(res.message[0].id);
		},
		// 左侧菜单栏点击事件
		leftMneuClick(index, id) {
			this.clickIndex = index;

			this.getRightData(id);
		},
		// 对应的左侧菜单栏的右侧数据
		async getRightData(id) {
			const { data: res } = await this.$http({
				url: '/api/getimages/' + id
			});
			if (res.status !== 0)
				return uni.showToast({
					title: '请求数据失败'
				});
			this.rightSecondData = res.message;
			
		},
		//预览图片
		imageUrl(currentImageUrl){
			const urlList = this.rightSecondData.map(item=>{
				return item.img_url
			})
			console.log(urlList);
			// 预览图片
			uni.previewImage({
				//预览的第一张
				current:currentImageUrl,
				// 预览列表
				urls:urlList
			})
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.pics {
	height: 100%;
	display: flex;
	.left {
		width: 200rpx;
		height: 100%;
		border-right: 1px solid #eee;

		view {
			height: 60px;
			line-height: 60px;
			text-align: center;
			border-top: 1px solid #b7b7a8;
			font-size: 34rpx;
		}
	}
	.right {
		width: 520rpx;
		height: 100%;
		margin: 10rpx auto;
		.item {
			image {
				width: 520rpx;
				height: 520rpx;
				border-radius: 5px;
			}
			view {
				font-size: 30rpx;
				line-height: 40rpx;
			}
		}
	}
}
.active {
	background-color: $shop-color;
	color: #fff;
}
</style>
