
/***************************************************
 * [Quasar Cookies] http://quasar-framework.org/components/cookies.html
 * [Quasar LocalStorage] http://quasar-framework.org/components/web-storage.html
 **************************************************/

import { Cookies, LocalStorage } from 'quasar'

import HttpService from './service'

import ConfigAuth from 'config/auth'

import http from 'axios'


class OAuth
{
  constructor(){
    this.storages =  {
      Cookies,
      LocalStorage
    }
    this.Session = this.storages[ConfigAuth.default_storage]
  }

  logout(){
    HttpService.destroySession()
    this.Session.remove('access_token');
    this.Session.remove('refresh_token');
  }

  guest(){
    return this.Session.has('access_token') ? false : true;
  }

  isAuthenticated(){
    return this.Session.has('access_token') ? true : false;
  }

  login(username, password){
    let data = {
      username,
      password,
    } 

    //We merge grant type and client secret stored in configuration
    Object.assign(data, ConfigAuth.oauth);
    return new Promise( (resolve, reject) => {
      HttpService.attemptLogin(data).then( response => {
        this.storeSession(response.data)
        this.addAuthHeaders()
        resolve(response)
      }).catch( error => {
        console.log("OAUTH Authentication error: ",error)
        reject(error)
      })
    })
  }

  getUser(){
    if(this.Session.has('access_token')){
      return new Promise( (resolve, reject) => {
        HttpService
        .currentUser()
        .then( response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    }
    return new Promise( resolve => resolve(null) )
  }

  getAuthHeader() {
    if(this.Session.has('access_token')){
      let access_token = this.getItem('access_token')
      return ConfigAuth.oauth_type+" "+ access_token // Example : Bearer xk8dfwv8783dxddjk232xjshoqpx
    }
    return null
  }
  
  getItem(key){
    if(ConfigAuth.default_storage == 'LocalStorage'){
      return this.Session.get.item(key)
    }
    return this.Session.get(key)
  }

  addAuthHeaders() {
    let header = this.getAuthHeader();
		HttpService.addAuthorizationHeader(header)
	}

  storeSession(data){

    let hourInMilliSeconds = 86400;
    let time = data.expires_in / hourInMilliSeconds;

    if(ConfigAuth.default_storage == 'LocalStorage'){
      this.Session.set('access_token', data.access_token)
      this.Session.set('refresh_token', data.access_token)
    }else{

      /************************************* 
      ** when the Storage is type Cookies
      ** we send the expires property given in days
      **************************************/
      this.Session.set('access_token', data.access_token, {
        expires : time,
      })
      /*
      ** We duplicate the time because,
      ** in theory it lasts the double of time access token duration
      */
      this.Session.set('refresh_token', data.access_token, {
        expires : time * 2,
      })
    }

  }

}

export default OAuth