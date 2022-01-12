/*
 * @Author: lrq
 * Date: 2021-03-05
 * @Last Modified by: lrq

*/

const phoneReg = /^1[3456789]\d{9}$/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@$#!%*?&]{6,32}/;
const uploadImgTypeReg = /\.(jpg|jpeg|png|gif|JPG|PNG|GIF)$/; // 图片类型限制
const uploadDocTypeReg = ['.pdf']; // 文档类型上传限制
const uploadSdkTypeReg = ['.zip', '.rar']; // 文档类型上传限制

// 手机号验证
function verifyPhone(rule, value, callback) {
  if (!phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
}

// 验证密码
function verifyPassword(rule, value, callback) {
  if (!password.test(value)) {
    callback(new Error('密码最少6-32个字符，至少包含大写字母，小写字母，数字和特殊字符'));
  } else {
    callback();
  }

}


export {
  verifyPhone,
  verifyPassword,
  uploadImgTypeReg,
  uploadDocTypeReg,
  uploadSdkTypeReg

};