exports.install = function (Vue) {
      Vue.prototype.getResponseData = function (res) {
            if (res.data.status !=200) {
                  alert(res.data.message)
                  return null
            }
            return res.data.message.body.data[0]
      }
}
