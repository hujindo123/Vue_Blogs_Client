/**
 * Created by Administrator on 2017/11/6.
 */
import {get, post} from '../config/fetch';
/**
 * 用户中心
 */
export const getUserMessage = (name, age) => get('/getUserMessage', {});
/**
 * 登录
 */
export const login = (account, password) => get('/login', {
  account: account,
  password: password
});
/**
 * 获取注册验证码
 */
export const getCaptchas = () => get('/getCaptchas', {});

/**
 * 注册
 */
export const register = (account, nickname, email, password, validCode) => get('/register', {
  account: account,
  nickname: nickname,
  email: email,
  password: password,
  validCode: validCode
});
/**
 * 发送激活
 */
export const updateEmailCode = (account) => get('/updateEmailCode', {
  account: account
});
/**
 * 激活账号
 */
export const actives = (email, code) => get('/actives', {
  email: email,
  code: code
});
/**
 *  找回密码
 */
export const findPass = (email, validCode) => fetch('/findPass', {
  email: email,
  validCode: validCode
});
/**
 * 更新密码
 */
export const updatePass = (email, code, password) => get('/updatePass', {
  email: email,
  code: code,
  password: password
});
/**
 * 更新信息
 */
export const setMessage = (nickname, sex, birthday, province, city, area) => get('/updateUserMessage', {
  nickname: nickname,
  sex: sex,
  birthday: birthday,
  province: province,
  city: city,
  area: area
});
/**
 * 上传图片
 */
export const updateImg = (formData) => post('/updateImg', {
  formData: formData
});

