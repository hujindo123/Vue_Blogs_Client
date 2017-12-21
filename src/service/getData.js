/**
 * Created by Administrator on 2017/11/6.
 */
import fetch from '../config/fetch';
/**
 * 用户中心
 */
export const getUserMessage = (name, age) => fetch('/getUserMessage', {}, 'GET');
/**
 * 登录
 */
export const login = (account, password) => fetch('/login', {
  account: account,
  password: password
}, 'GET');
/**
 * 获取注册验证码
 */
export const getCaptchas = () => fetch('/getCaptchas', {}, 'GET');

/**
 * 注册
 */
export const register = (account, nickname, email, password, validCode) => fetch('/register', {
  account: account,
  nickname: nickname,
  email: email,
  password: password,
  validCode: validCode
}, 'GET');
/**
 * 发送激活
 */
export const updateEmailCode = (account) => fetch('/updateEmailCode', {
  account: account
}, 'GET');
/**
 * 激活账号
 */
export const actives = (email, code) => fetch('/actives', {
  email: email,
  code: code
}, 'GET');
/**
 *  找回密码
 */
export const findPass = (email, validCode) => fetch('/findPass', {
  email: email,
  validCode: validCode
}, 'GET');
/**
 * 更新密码
 */
export const updatePass = (email, code, password) => fetch('/updatePass', {
  email: email,
  code: code,
  password: password
}, 'GET');
/**
 * 更新信息
 */
export const setMessage = (nickname, sex, birthday, province, city, area) => fetch('/updateUserMessage', {
  nickname: nickname,
  sex: sex,
  birthday: birthday,
  province: province,
  city: city,
  area: area
}, 'GET');
/**
 * 上传图片
 */
export const updateImg = (formData) => fetch('/updateImg', {
  formData: formData
}, 'POST');

