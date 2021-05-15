let date= ''
let id=''
Page({
  data:{
    event:{}
  },
  onLoad(options){
    console.log('列表携带的值',options)
    id=options.id
    this.getDetail()
  },
  //获取日期数据
  getDetail(){
    //查询单条日期 doc
    wx.cloud.database().collection('events')
    .doc(id)
    .get()
    .then(res =>{
      console.log('事件详情页请求成功',res)
      this.setData({
        event:res.data
      })
    })
    .catch(res =>{
      console.log('事件详情页请求失败',res)
    })
  },
  //获取用户输入的新日期
  getdate(e){
    date = e.detail.value
  },
  //修改商品日期
  update(){
    console.log('新的事件日期',date)
    if (date==''){
      wx.showToast({
        icon:'none',
        title: '日期为空啦',
      })
    }
    else{
      wx.cloud.database().collection('events')
      .doc(id)
      .update({
        data:{
          date:date
        }
      })
      .then(res=>{
        console.log('更新成功',res)
        this.getDetail()
      })
      .catch(res=>{
        console.log('更新失败',res)
      })
    }
  }
})