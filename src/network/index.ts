import  axios  from 'axios';
  const instance = axios.create({
        baseURL:'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
        timeout:50000,
        headers:{
          "Content-Type":"application/json;charset=utf-8"
        }
  })
  //请求拦截
  instance.interceptors.request.use(config =>{
    config.headers = config.headers || {}
    if(localStorage.getItem('token')){
      config.headers.token=localStorage.getItem( 'token') || " "
    }
    return config
  },err=>{
    console.log(err)
  })
  // 响应拦截
  instance.interceptors.response.use( result =>{
    //必须返回出去，不然config信息会被拦截在这里
    const code:number=result.data.code
    if(code!=200){
      return Promise.reject(result.data)
    }
    return result.data
  },err=>{
    console.log(err)
  })
export default instance


