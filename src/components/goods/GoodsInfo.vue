<template>
  <div class="goodsinfo-container">
    <!-- 小球动画 半场动画，只能用钩子函数 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del> &nbsp; &nbsp; 销售价：
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析: 如何实现加入购物车之后，拿到 选择的数量 -->
            <!-- 1. 经过分析发现 ：按钮 属于 goodsinfo 页面，数字属于 numberbox组件  -->
            <!-- 2. 由于涉及 父子组件的嵌套  无法直接在 goodsinfo 页面中获取选中 的商品数量值 -->
            <!-- 3。 怎么解决问题： 涉及到子组件向父组件传值（事件调用机制）-->
            <!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数chuan 传递给这个方法 -->
            <!--  -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>存储情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
// 导入轮播图组件
import swiper from "../subcomponents/Swiper.vue";
// 导入 数字选择框 组件
import numbox from "../subcomponents/Goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的 id 挂载到 data上，后期调用
      lunbotu: [], //轮播图的数据
      goodsinfo: {}, //获取到商品的信息
      ballFlag: false, //控制小球隐藏和显示的标识符
      selectedCount: 1 //保存用户选中的商品数量，默认认为用户买一个
    };
  },

  created() {
    this.getlunbotu();
    this.getGoodsInfo();
  },

  methods: {
    getlunbotu() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            //   先循环轮播图数组的每一项，为 item 添加 img 属性  ，因为轮播图组件中，只认识item.img ,不认识item.src
            result.body.message.forEach(item => {
              item.img = item.src; //直接加上一个属性，并且其值与 item.src 相同
            });
            this.lunbotu = result.body.message;
          } else {
            Toast("获取数据失败！");
          }
        });
    },

    getGoodsInfo() {
      // 获取商品的信息
      this.$http
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.goodsinfo = result.body.message[0];
          }
        });
    },

    goDesc(id) {
      // 点击使用编程式导航，图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转的评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },

    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
    },

    beforeEnter(el) {
      el.style.transform = "translate(0,0)"; //小球原本的位置
    },
    enter(el, done) {
      // 获取小球的位置 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //   获取徽标的页面中 位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDistance = badgePosition.left - ballPosition.left;
      const yDistance = badgePosition.top - ballPosition.top;

      el.offsetWidth;
      el.style.transform = `translate(${xDistance}px,${yDistance}px)`; //小球终点的位置
      el.style.transition = "all 0.5s cubic-bezier(.4, -0.3,1,.68)"; //ease 是一种动画效果
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },

    getSelectedCount(count) {
      // 当子组件 把选中的 数量传递给 父组件的时候， 把选中的值保存到 data 上
      this.selectedCount = count;
      console.log("父组件拿到的值" + this.selectedCount);
    }
  },

  //   小球动画优化思路
  // 1， 先分析导致动画 不准确的 本质原因：我们把 小球  最终 位移到的位置 已经局限在了 某一分辨率下滚动条未滚动的情况下
  //   2. 只要分辨率不一样，或滚动条有一定滚动距离时，
  // 3. 不能写死横纵坐标，动态计算坐标值
  //   4.经过分析，得出解题思路：先得到徽标的 横纵 坐标，在得到小球的横纵坐标，然后让 y 值求差值  x值也要求差值，就是横纵的移动距离
  //   5. 如果对获取 徽标和小球的位置   ？？？ domObject.getBoundingRect()    自己百度

  components: {
    swiper, //注册轮播图
    numbox
  }
};
</script>


<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden; //最外层有一个小白边顶下来了

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold; //粗体
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0; //上下 10px  左右：0px 为按钮添加 margin
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99; //提高层级，不然会被覆盖
    // top: 300px; //可以在页面中找位置定位  这个属性的意思是离上方多少像素，下面同理
    // left: 390px;
    top: 410px;
    left: 146px;
  }
}

// .ball {
//   width: 90px;
//   height: 90px;
//   border-radius: 50px;
//   background-color: red;
//   position: absolute;
//   z-index: 99; //提高层级，不然会被覆盖
//   top: 300px; //可以在页面中找位置定位  这个属性的意思是离上方多少像素，下面同理
//   left: 390px;
// }
</style>