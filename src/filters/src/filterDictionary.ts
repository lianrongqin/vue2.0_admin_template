import * as dictionary from '@/config/dictionary';

/* eslint-disable no-unused-vars */
function _createDictionaryFilter (dictionary) {
  return function (ipt, notFoundPlaceholder?) {
    if (ipt == null) { return null; }
    if ( typeof ipt === 'boolean' ) {
      ipt = Number(ipt);
    }
    const r = dictionary[ipt.toString()];
    if (r) {
      return r instanceof Object ? r.label : r;
    } else {
      return notFoundPlaceholder != undefined ? notFoundPlaceholder : '';
    }
  };
}
/* eslint-enable no-unused-vars*/
