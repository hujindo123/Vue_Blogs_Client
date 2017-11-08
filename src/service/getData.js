/**
 * Created by Administrator on 2017/11/6.
 */
import fetch from '../config/fetch';
/**
 * 用户中心
 */
export const getUserMessage = () => fetch('/getUserMessage');
/**
 * 登录
 */
export const login = (account, password) => fetch('/login', {
  account: account,
  password: password
});
/**
 * 获取注册验证码
 */
export const getCaptchas = () => fetch('/getCaptchas');

/**
 * 注册
 */
export const register = (account, nickname, email, password, validCode) => fetch('/register', {
  account: account,
  nickname: nickname,
  email: email,
  password: password,
  validCode: validCode
});
/**
 * 激活账号
 */
export const updateEmailCode = (account) => fetch('/updateEmailCode', {
  account: account
});

