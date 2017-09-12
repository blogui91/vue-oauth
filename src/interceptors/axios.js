import http from 'axios'
import OAuth from 'src/oauth'
let oAuth = new OAuth();

http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Add a request interceptor
http.interceptors.request.use(function (config) {

  config.headers['Authorization'] = oAuth.getAuthHeader() //Example: Bearer asf3132dfsfddffd

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});