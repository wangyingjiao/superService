<template>
  <div class='tabs-view-container'>
    <div class="leftmove" @click="leftmove">&#139</div>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" :type="isActive(tag.path)?'primary':''" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>	
	<div class="rightmove"  @click="rightmove">&#155</div>
  </div>
  
</template>

<script>
export default {
  computed: {
    visitedViews() {
      return this.$store.state.app.visitedViews.slice(-10)
    }
  },
  methods: {
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTabs() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive(path) {
      return path === this.$route.path
    },
	rightmove(){	  
	  var obj=this.$store.state.app.visitedViews;
	  var objLen=obj.length;
      var activeIndex=0;
	  for(var i=0;i<objLen;i++){
	      if(obj[i].path ===this.$route.path){
		       activeIndex=i
		  }
      }
	  if(activeIndex < objLen-1){
	       activeIndex++;
		   this.$router.push({path: obj[activeIndex].path })		   		   
	  }else{
	       activeIndex=0;
		   this.$router.push({path: obj[activeIndex].path })
	  }
	  
	},
	leftmove(){	  
	  var obj=this.$store.state.app.visitedViews;
	  var objLen=obj.length;
	  var lastObj=obj.slice(-1)[0];
      var lastIndex=0;	  
      var activeIndex=0;
	  for(var i=0;i<objLen;i++){
	      if(obj[i].path ===this.$route.path){
		       activeIndex=i
		  }
	      if(obj[i].path ===lastObj.path){
		       lastIndex=i
		  }		  
      }
	  if(activeIndex > 0){
	       activeIndex--;
		   this.$router.push({path: obj[activeIndex].path })		   		   
	  }else{
	       activeIndex=lastIndex;
		   this.$router.push({path: obj[activeIndex].path })
	  }
	  
	}
  },
  watch: {
    $route() {
      this.addViewTabs()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    display: inline-block;
    height:28px;
    line-height:28px;
  	width:100%;
    vertical-align: top;
    margin-left: 10px;
    .leftmove{
        display:inline-block; float:left;width:30px;height:28px;line-height:28px;text-align:center;cursor:pointer;margin-top: -3px;font-size:25px;color:gray;
    }
    .rightmove{
        display:inline-block;float:right;width:30px;height:28px;line-height:28px;text-align:center;cursor:pointer;margin-top: -3px;font-size:25px;color:gray;
    }
    .tabs-view {
	  float:left;
      margin-left: 10px;
    }
  }
</style>
