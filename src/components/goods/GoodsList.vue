<template>
  <div class="goods-list">
    <!-- 把div改造成 router-link 同时要指定tag 不然会被渲染成span -->
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+ item.id" tag="div">
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}</h1>

      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->

  <!-- 玩出花的 router-link的第二种方式 -->
  <!-- 网页中，有两种跳转方式：方式一：使用 a/router-link 标签的形式叫做 标签跳转；方式2：使用 window.location.href的形式，叫做编程式导航 -->
   <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}</h1>

      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>



  <!-- 加载更多需要拼接数据 -->
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

   

    <!-- <div class="goods-item">
      <img src="https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg">
      <h1 class="title">小米（MI）小米 NOte 16G 双网通班 双摄像头 超长时间可待机 限时多天 机不再来 时不可待</h1>

      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余60件</span>
        </p>
      </div>
    </div> -->
  </div>
</template>


<script>
export default {
  data(){ //data是往自己组建内部挂载的一些 私有数据的
    return {
      pageindex:1,  //分页页数
      goodslist:[], //存放商品列表的数组

    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      // 获取商品列表
      this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageindex).then(result =>{
          if(result.body.status === 0){
            // this.goodslist = result.body.message;
            this.goodslist = this.goodslist.concat(result.body.message);
          }else{
            Toast("获取数据失败")
          }
      })
    },

    getMore(){
      this.pageindex++;
      this.getGoodsList();
    },

    goDetail(id){
      // 使用JS 的形式进行路由的导航,router从哪里来.... console.log(this) 看一下带  看 route 
      // 注意：一定要区分 this.$route 和 this.$router 的区别两个对象
      // 其中 this.$rout 是参数对象，所有路由中 的 参数 params 和 query  都属于它
      // 其中 ：this.$router，是一个路由导航对象，用它可以方便的 使用 JS 代码，实现路由的前进，后退、跳转到新的 URL地址
      
      // 第一种方式
      // this.$router.push('/home/goodsinfo/' + id);

      // 2.传递对象
      // this.$router.push({path:'/home/goodsinfo/' + id});

      // 3. router  传递命名的路由,编程式导航  $router中有 go -->  -1 往回去跳转 1--> 往前进一 / back / forward  / push 
      this.$router.push({name: 'goodsinfo', params: {id}}, )
    }

  }
};
</script>


<style lang="scss" scoped>
.goods-list {
  display: flex; //伸缩。大盒子布局 横向摆放了
  flex-wrap: wrap; //flex换行
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%; //每一个宽度 50% 左右
    border: 1px solid #ccc; //处理边框
    box-shadow: 0 0 8px #ccc;
    padding:2px;  //每一个小格子底下都会有一个小小的小白边
    display :  flex; //这一项是改变主轴的,横向布局
    flex-direction: column; //改变主轴方向为向下
    justify-content:space-between;
    min-height: 293px;  //这个框框的长度要固定起来

    margin:3px 0   ;// 左边是7px,上下是3  左右是0   

    img {
     
        width: 100%;
      
    }

    .title {
      font-size: 14px;
    }

    .info{
      background-color: #eee;
      p{
        margin:0;
        padding: 5px;
      }
        .price{
           .now{
           color:red;
           font-weight: bold;
           font-size: 16px;
        }

        .old{
          text-decoration: line-through; //删除线
          font-size:12px;
          margin-left:10px;
        }
        }
        .sell{
          display: flex;
          justify-content:space-between;  //两端对齐
          font-size: 13px;
        }

       
    }

  }
}
</style>
