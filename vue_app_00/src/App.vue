<template>
 <div class="app-container">
    <mt-header fixed title="花点心思" style="background-color:pink;">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    <router-view></router-view>
 <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/Home">
				<span class="mui-icon mui-icon-home" ></span>
				<span class="mui-tab-label" >首页</span>
			</router-link>			
			<router-link class="mui-tab-item" to="/Find" >
				<span class="mui-icon mui-icon-paperplane"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
            <router-link class="mui-tab-item" to="/Card" >
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">
					 {{$store.getters.optCartCount}}
					</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/Login" v-if="!this.$store.state.isLogin">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">登录注册</span>
			</router-link>
            <router-link class="mui-tab-item" to="/Person" v-else>
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">个人中心</span>
			</router-link>
		</nav>
         <!--nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/Home">
            <span class="mui-icon mui-icon-extra mui-icon-extra-heart"></span>
            <span class="mui-tab-label">love</span>
        </router-link>
        <router-link class="mui-tab-item" to="/Find">
            <span class="mui-icon mui-icon-star"></span>
            <span class="mui-tab-label">all</span>
        </router-link>
        <router-link class="mui-tab-item" to="/Card">
            <span class="mui-icon mui-icon-extra mui-icon-extra-lamp">
                <!--<span class="mui-badge">{{this.$store.getters.optCount}}</span>-->
            <!--/span>
            <span class="mui-tab-label">world</span>
        </router-link>
        <router-link class="mui-tab-item" to="/Login">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">me</span>
        </router-link>
	</nav-->
 </div>
</template>

<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>
