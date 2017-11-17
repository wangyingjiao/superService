<template>

  <div class="Home">
  
    <ul>
    
      <li v-for="item in items" @click="selectSort(item)" :class="{'active':item.show===true}">{{item.sort}} <span v-show="item.show">正确</span></li>
      </ul>
    </div>
</template>
<script>
  export default {
    data() {　　　　　　
      return {　　　　　　　　
        items: [　　　　　　　　　　{
          sort: '综合排序',
          show: false
        }, 　　　　　　　　　　 {
          sort: '最新发布',
          show: false
        }, 　　　　　　　　　　 {
          sort: '价格从低到高',
          show: false
        }, 　　　　　　　　　　 {
          sort: '价格从高到低',
          show: false
        }　　　　　　　　]　　　　　　
      };
    },
    methods: {　　　　　　
      selectSort(item) {　　　　　　　　
        item.show = !item.show;　　　　　　
      }　　　　
    }
  }

</script>
<style>
  ul li {
    width: 800px;
    cursor: pointer;
    list-style: none;
    padding: 10px;
    border: 1px solid #000;
  }

  ul li>span {
    float: right;
    color: #ff00ff;
  }

  ul li.active {
    color: #ff00ff;
  }

</style>
