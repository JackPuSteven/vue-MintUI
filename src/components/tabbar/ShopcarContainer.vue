<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域项 区域-->

      <div class="mui-card" v-for=" (item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何从购物车中获取商品数量 -->
                <!-- 1， 我们可以先创建一个空对象 然后循环购物车中所有商品的数据，把当前循环  这条商品的id，作为对象的属性名，count值作为对象的属性值，这样，当把所有的商品循环一遍，就会得到一个对象：{88:2 , 89:1 } -->
                <!-- 删除这里：item.id删除的是car（store中的数据）i是用来删除goodslist中的数据 因为一个在本地内存 一个在逻辑上。。。 -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品
                <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价 ￥
                <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
    <p>{{$store.getters.getGoodsSelected}}</p>
  </div>
</template>

<script>
import numbox from "../subcomponents/Shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取购物侧商品列表
      //   1. 获取到sotre 中所有商品的Id 然后拼接出一个 用逗号分隔的 字符串
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      //   如果购物车中没有商品，直接返回否则直接报错
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      // 点击删除，把商品从 store 中根据 传递 Id 删除 ， 同时 把当前组件的goodslist中 对应要删除的那个商品，使用Index 删除
      this.goodslist.splice(index, 1); //本地的数据
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新的开关状态 同步到 store 中去
      console.log(id + "----" + val);
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>


<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 14px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center; //纵向居中
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
