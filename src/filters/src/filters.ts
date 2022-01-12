'use strict';
export default {
  filterBrithdayDate,
  filterMoney
};

export function filterBrithdayDate(date: any): string {
  let year = date.substring(0, 4);
  let month = date.substring(4, 6);
  let day = date.substring(6, 8);
  return `${year}-${month}-${day}`;
}


// 金额 逢3一断
export function filterMoney(moneyFormat: any, num = 2): string {
  if (!moneyFormat || moneyFormat === '-' || moneyFormat === null) return '0.00';
  if (moneyFormat.toString().indexOf('.') == -1) {
    return moneyFormat.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  var moneyString = Number(moneyFormat).toFixed(num).split('.');
  var intPartFormat = moneyString[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  var floatPart = '';
  if (moneyString.length >= 2) {
    floatPart = moneyString[1];
    if (floatPart.length == 1) {
      return intPartFormat + '.' + floatPart + '0';
    } else {
      return intPartFormat + '.' + floatPart;
    }
  } else {
    return intPartFormat + floatPart;
  }
}

