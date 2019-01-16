<template>
    <div class="app-newlist">
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in list4" :key="item.id">
				<router-link :to="'/NewsInfo?id='+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
							{{item.title}}
						<p class='mui-ellipsis'>
							
							<span>{{item.ctime | datatimeFilter}}</span>
						</p>
					</div>
				</router-link>
			</li>
			<!--li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../../assets/Goods/3.png">
					<div class="mui-media-body">
							快乐是什么？
						<p class='mui-ellipsis'>要努力呀！为了想要的生活，为了人间的烟火气，为了今天的风和月。</p>
					</div>
				</a> 
			</li>
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../../assets/Goods/3.png">
					<div class="mui-media-body">
							开心是什么？
						<p class='mui-ellipsis'>"希望这个冬天 我被各种火锅 奶茶 甜品 的怀抱围住"</p>
					</div>
				</a>
			</li-->
        </ul>
        <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>  
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
    export default {
		data(){
			return{
				list4:[],
				pno:0,     //当前页码
				pageSize:7,  //页码大小
				pageCount:1   //总页数
			}
		},
		methods:{
			getMore(){
				this.pno++;
				var hasMore = this.pno <= this.pageCount;
				if(!hasMore){
					Toast("已无更多数据！");
					return}
				//发送请求  获取分页数据
				var url = "newslist?pno="+this.pno+"&pageSize="+this.pageSize;
				this.$http.get(url).then(result=>{

					var rows = this.list4.concat(result.body.data);
					console.log(rows.content);
					this.list4= rows;
					this.pageCount = result.body.pageCount;
				})
			}
		},
		created() {
			this.getMore();
		},
	}
</script>
<style>
    .app-newlist .mui-table-view li .mui-ellipsis{
   display:flex;               /*弹性布局*/
   font-size:12px;
   color:#226aff;
   justify-content:space-between; /*两端对齐*/
} 
</style>