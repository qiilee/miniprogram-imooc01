wx.cloud.init();
const db = wx.cloud.database();

Page({
  data: {
    images: []
  },
  insert: function () {
    // db.collection('user').add({
    //   data: {
    //     name: 'qilei',
    //     age:20
    //   },
    //   success: res=>{
    //     console.log(res)
    //   },
    //   fail: err=>{
    //     console.log(err)
    //   },      
    // })
    db.collection('user').add({
      data: {
        name: 'qilei',
        age: 20
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  update: function () {
    db.collection('user').doc('79550af2601d0c6702bb0e0e1ffad24a').update({
      data: {
        name: 'qilei',
        age: 18
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  search: function () {
    db.collection('user').where({
      name: "qilei"
    }).get().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  delete: function () {
    db.collection('user').doc('79550af2601d0c6702bb0e0e1ffad24a').remove().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  sum: function () {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 3
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  getOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  batchDelete: function () {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  upload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + ".png", // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID);
            db.collection('image').add({
              data: {
                fileID: res.fileID
              }
            }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          },
          fail: console.error
        })
      }
    })
  },
  getFile: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res)
      // console.log(res.result.openid)
      db.collection('image').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2)
        this.setData({
          images: res2.data
        })
      }).catch(err2 => {
        console.log(err2)
      })

    }).catch(err => {
      console.log(err)
    })
  },
  downloadFile: function (event) {
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          console.log(res);
          wx.showToast({
            title: '保存成功'
          })
        }
      })
    }).catch(error => {
      // handle error
    })
  }
})