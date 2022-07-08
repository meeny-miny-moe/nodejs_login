module.exports = {
  userLogin:function(request,response){
    if(request.user){
        return true;
      }else{
        return false;
      }
    },authStatusUI:function(request,response){
      var authStatusUI = '<a href="/login">login</a>'

      if(this.userLogin(request,response)){
        authStatusUI = `<a href="/logout">logout</a>`;
      }
      return authStatusUI;
    }
}
