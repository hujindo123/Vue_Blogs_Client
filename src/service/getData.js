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
