//1.加载模块
const express = require("express");
const pool=require("./pool");

//2.创建express对象
var app= express();
const cors = require("cors");
app.use(cors({
    origin:["http://loclahost:3001","http://127.0.0.1:3001"],
    credentials:true
})
);

//7.1:node.js app.js
//   加载第三方模块 express-session
const session = require("express-session")
//7.2:对模块配置   
app.use(session({
  secret:"128位随机字符",    //安全字符串
  resave:false,             //请求保存
  saveUninitialized:true,   //初始化保存
  cookie:{
    maxAge:1000 * 60 * 60 * 24 
  }
}));

app.listen(3000 ,'127.0.0.1' ,()=>{
    console.log('Blog-server running at http://127.0.0.1:3001');
});
app.use(express.static(__dirname+"/public"))

/*首页轮播图 */
app.get("/imagelist",(req,res)=>{
    var sql = "SELECT id,img_url From lunbo_image";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
})
/*首页两张图片 */
app.get("/hd_lztp",(req,res)=>{
    var sql = "SELECT id,img_url From hd_lztp";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
/*首页四个商品 */
app.get("/hd_sztp",(req,res)=>{
    var sql = "SELECT id,img_url,title,subtitle,price From hd_sztp";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
/*发现页面 */
app.get("/hd_fx",(req,res)=>{
    var sql = "SELECT id,img_url,title,subtitle From hd_fx";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
/*四个商品的详情 */
app.get("/goodsinfo",(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT id,title,subtitle,price FROM hd_sztp WHERE id = ?";
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
})

/*新闻列表 */
app.get("/newslist",(req,res)=>{
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if(!pno){pno = 1}
    if(!pageSize){pageSize=7}
    var reg = /^[0-9]{1,3}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页码格式不正确"});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"});
        return; 
    } 
    var progress = 0;
    var obj = {code:1};
    //查询新闻的总条数
    var sql = " SELECT count(id) AS c FROM hd_news ";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        //c是总的条  数 
        var pageCount = Math.ceil(result[0].c/pageSize);
        progress += 50;
        obj.pageCount = pageCount;
        if(progress==100){
            res.send(obj);
        }
    })
    var sql = " SELECT id,title,img_url,content,ctime FROM hd_news LIMIT ?,? ";
    var offset = parseInt((pno-1)*pageSize);
        pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        progress += 50;
        obj.data = result;
        if(progress==100){
            res.send(obj);
        }
    })
})
//查找一条详细新闻信息
app.get("/newsinfo",(req,res)=>{
    var id = req.query.id;
    var sql = " SELECT id,title,content,img_url,ctime FROM hd_news WHERE id = ?"
    pool.query(sql,[id],(err,result)=>{
        if (err) throw err;
        res.send({code:1,data:result});
    })
});

//分页查找指定新闻下评论列表
app.get("/getcomment",(req,res)=>{
    //1:获取参数
    var pno = req.query.pno;  //页码
    var pageSize = req.query.pageSize;//页大小
    var nid = req.query.nid; //新闻id
    //console.log(nid);
    //2:设置默认值 1 7
    if(!pno){pno = 1}
    if(!pageSize){pageSize=7}
    //3:创建正则表达式验证用户输入验证
    var reg = /^[0-9]{1,3}$/;
    //4:如果错出停止函数运行
    if(!reg.test(pno)){
       res.send({code:-1,msg:"页编格式不正确"});
       return;
    }
    if(!reg.test(pageSize)){
       res.send({code:-2,msg:"页大小格式不正确"});
       return;
    }
    var progress = 0;
    var obj = {code:1};
    obj.uname = req.session.uname;
    //11:49
    //5:创建sql1 查询总记录数   严格区分大小写
    var sql = "SELECT count(id) AS c FROM hd_comment WHERE nid = ?";
    nid = parseInt(nid);
    pool.query(sql,[nid],(err,result)=>{
      if(err)throw err;
      var pageCount = Math.ceil(result[0].c/pageSize);
      progress+=50;
      obj.pageCount = pageCount;
      if(progress==100){
        res.send(obj);
      }
    });
    //6:创建sql2 查询当前页内容 严格区分大小写
    var sql =" SELECT id,user_name,ctime,";
        sql+=" content";
        sql+=" FROM hd_comment";
        sql+=" WHERE nid = ?";
        sql+=" ORDER BY id DESC";
        sql+=" LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);
        pageSize = parseInt(pageSize);
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
      if(err)throw err;
      progress+=50;
      obj.data=result;
      if(progress==100){
        res.send(obj);
      }
    })
   });

   //发表评论
   //引入第三方模块：badyParser 处理post请求
   const bodyParser = require("body-parser");
   app.use(bodyParser.urlencoded({
       extended:false
   }));
   app.post("/addComment",(req,res)=>{
       //1.获取三个参数
       var nid = req.body.nid;
       var content = req.body.content;
       var user_name = req.session.uname;
       //2.创建sql语句
       var sql = " INSERT INTO `hd_comment` (`id`, `nid`, `user_name`, `ctime`, `content`) VALUES (null,?,?,now(),?)";
    nid = parseInt(nid);
    pool.query(sql,[nid,user_name,content],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:"评论发表成功"})
    })
   })

   //用户登录
   app.get("/login",(req,res)=>{
       var uname = req.query.uname;
       var upwd = req.query.upwd;
       if(!uname){
           res.send({code:401,msg:"请输入用户名"});
           return
       }
       if(!upwd){
        res.send({code:402,msg:"请输入密码"});
            return
        }
       var sql = " SELECT * FROM hd_login WHERE uname = ? AND upwd = md5(?)";
       pool.query(sql,[uname,upwd],(err,result)=>{
           console.log(22222222222222)
           console.log(result)
           if(err) throw err;
           
        //    console.log(result[0].id)
           if(result.length<1){
               res.send({code:403,msg:"请先注册再登录"});
               return
           }else
            if(result.length==1){
                var obj = result[0].id;
                req.session.uname = uname;
                console.log(req.session.uname)
                req.session.obj= obj;
                
                //console.log(33333333333333333)
                console.log(obj);
                console.log(req.session.obj);
                res.send({code:1,msg:"登录成功"});
            }else{
                res.send({code:-1,msg:"请填写登录信息"})
            }
       })
   })
   //判断是否登录
   app.get("/isLogin",(req,res)=>{
        var obj = req.session.obj;
        if(!obj){
            res.send({code:1,msg:"请先登录哦!"})
        }else{
            res.send({code:2,msg:"去购物吧！"})
        }
       
   })
   //用户注册
   app.post("/register",(req,res)=>{
       var $uname = req.body.uname;
       //console.log(111111111);
       var $upwd = req.body.upwd;
       var $cpwd = req.body.cpwd;
       var reg = /^(\w{3,12})|([\u4e00-\u9fa5]{1,6})$/;
       var reg1 = /^(\w{6,12})$/;
       if(!reg.test($uname)){
           res.send({code:3,msg:"用户名为3-12位字符"})
           return
       }
       if(!reg1.test($upwd)){
           res.send({code:4,msg:"密码为6-12个字符"})
           return
       }
       if(!$cpwd===$upwd){
           res.send({code:5,msg:"密码确认错误"})
           return
       }
       var sql = "insert into hd_login values(null,?,md5(?),md5(?))";
       pool.query(sql,[$uname,$upwd,$cpwd],(err,result)=>{
           if(err) throw err ;
           //console.log(result);
           if(result.affectedRows>0){
               res.send({code:1,msg:"注册成功"})
           }else{
               res.send({code:2,msg:"注册失败"})
           }
       })
   });
   //用户名验证
   app.post("/checkUname",(req,res)=>{
       var $uname = req.body.uname;
       var sql="select id from hd_login where uname=?";
       pool.query(sql,[$uname],(err,result)=>{
           if(err) throw err;
           if(result.length>0){
               res.send({code:1,msg:"用户名已存在"})
           }else{
               res.send({code:2,msg:"用户名可用"})
           }
       })
   })
   //退出登录
   app.get("/logout",(req,res)=>{
       req.session.uname = undefined;
       req.session.obj = undefined;
       res.send({code:1});
   })
   //功能八:加入购物车
app.get("/addCart",(req,res)=>{
    var uid = req.session.obj;
    console.log(uid);
    var pid = req.query.pid;
    var c = req.query.count;
    var i = req.query.img_url;
    var sql  =" INSERT INTO `hd_shoppingcart_item`(`iid`, `user_id`, `product_id`, `count`, `img_url`) VALUES (null,?,?,?,?)"
    pool.query(sql,[uid,pid,c,i],(err,result)=>{
         if(err)throw err;
         res.send({code:1,msg:"购物车添加成功"});
    });
  })

  //查询购物详细信息
  app.get("/getCarts",(req,res)=>{
      var uid = req.session.obj;
      if(!uid){
          res.send({code:1,msg:"请先登录"});
          return
      }else{
        var sql = "SELECT c.iid,c.user_id,c.count,c.img_url,p.price,p.title,p.img_url FROM hd_sztp p,hd_shoppingcart_item c WHERE p.id = c.product_id AND c.user_id = ?";
        uid = parseInt(uid);
        pool.query(sql,[uid],(err,result)=>{
            if(err) console.log(err);
            res.send({code:2,data:result})
        })
      }
      //console.log(11111111)
      //console.log(uid);
     
  })

  //更新购物数量
  app.get("/updateCart",(req,res)=>{
      var iid = req.query.iid;
      var count = req.query.count;
      var sql = " UPDATE hd_shoppingcart_item SET count = ? WHERE iid = ?";
      iid = parseInt(iid);
      count = parseInt(count);
      pool.query(sql,[count,iid],(err,result)=>{
          if(err) throw err;
          if(result.affectedRows > 0){
              res.send({code:1,msg:"数量修改成功"})
          }else{
              res.send({code:-1,msg:"数量修改失败"})
          }
      })
  })