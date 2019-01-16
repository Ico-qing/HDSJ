<template>
    <div>
        <div style="height:150px;width:100%;background:pink;">
            <a class="person_box">
                <img src="../../assets/2.png" class="person_img" />
                <p style="color:#fff;font-size:20px;">花点时间</p>
                <p style="color:#fff;">设置</p>
            </a>
        </div>
        <div style="width:90%;margin:0 auto;">
            <div>
                <p>我的订单</p>
                <hr>
            </div>
            <ul style ="padding:0;display:flex;list-style-type:none;justify-content:space-around;text-align:center;margin-bottom:0;">
                
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/dfk.png" />
                        <p>待付款</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/fwz.png" />
                        <p>服务中</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/ywc.png" />
                        <p>已完成</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/dpj.png" />
                        <p>待评价</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/sh.png" />
                        <p>售后</p>
                    </a>
                </li>
            </ul>
            <hr>
            <div>
                <p style="margin:0;">收货订单</p>
                <p style="margin:0;">发现</p>
                <hr>
            </div>
            <ul style ="padding:0;display:flex;list-style-type:none;justify-content:space-around;text-align:center;margin-bottom:0;">
                
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/tjyj.png" />
                        <p>推荐有奖</p>
                    </a>
                </li>
                 <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/yhq.png" />
                        <p>优惠券</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/zs.png" />
                        <p>赠送订单</p>
                    </a>
                </li>
               
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/rl.png" />
                        <p>收花日历</p>
                    </a>
                </li>
            </ul>
             <ul style ="padding:0;display:flex;list-style-type:none;justify-content:space-around;text-align:center;margin-bottom:0;">
                
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/fp.png" />
                        <p>申请发票</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/hyk.png" />
                        <p>花艺课</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/gl.png" />
                        <p>管理续订</p>
                    </a>
                </li>
                <li>
                    <a>
                        <img style="height:30px;width:30px;" src="../../assets/lxkf.png" />
                        <p>联系客服</p>
                    </a>
                </li>
            </ul>
            
            <button style="margin-top:20px;width:100%;background:pink;border:1px solid pink;" @click="logout">退出登录</button>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        logout(){
            var url = "http://127.0.0.1:3000/logout";
            this.axios.get(url).then((result)=>{
                if(result.data.code==1){
                    this.$router.push("/Login");
                }
            })
        }
    }
}
</script>
<style>
.person_box{
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding-top:35px;
}
    .person_img{
        height:80px;
        width:80px;
        border-radius:50%;
    }
    hr{
        margin:0;
    }
</style>