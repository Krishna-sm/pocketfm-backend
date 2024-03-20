const moment = require("moment");
const slugify = require("slugify")
exports.userTypes = {
    'email_user':'email_user',
    'google_user':'google_user',
    'admin_user':'admin_user',
}

exports.CustomERROR = {
    'ACCOUNT_BLOCKED':`ACCOUNT_BLOCKED`
}



exports.LOGIN_TRY_LIMIT = 6
exports.Today =  moment().format('YYYY-MM-DD');
exports.CurrentDay =moment().startOf('day');


exports.SlugfyFun = (val)=>{
    return slugify(val, {
  replacement: '-',  // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: false,      // convert to lower case, defaults to `false`
  strict: false,     // strip special characters except replacement, defaults to `false`
  locale: 'vi',      // language code of the locale to use
  trim: true         // trim leading and trailing replacement chars, defaults to `true`
})
}


