import { isNum } from '@/utils/functional.utility.js'

const natCode = (value) => {
  if (typeof value === 'string' && value.length == 10) {
    if (
      value == '0000000000' ||
      value == '1111111111' ||
      value == '2222222222' ||
      value == '3333333333' ||
      value == '4444444444' ||
      value == '5555555555' ||
      value == '6666666666' ||
      value == '7777777777' ||
      value == '8888888888' ||
      value == '9999999999'
    ) {
      return 'کد ملی به درستی وارد نشده است.'
    }
    var c = parseInt(value.charAt(9))
    var n =
      parseInt(value.charAt(0)) * 10 +
      parseInt(value.charAt(1)) * 9 +
      parseInt(value.charAt(2)) * 8 +
      parseInt(value.charAt(3)) * 7 +
      parseInt(value.charAt(4)) * 6 +
      parseInt(value.charAt(5)) * 5 +
      parseInt(value.charAt(6)) * 4 +
      parseInt(value.charAt(7)) * 3 +
      parseInt(value.charAt(8)) * 2
    var r = n - parseInt(n / 11) * 11
    if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
      return true
    } else {
      return 'کد ملی به درستی وارد نشده است.'
    }
  }
  return 'کد ملی به درستی وارد نشده است.'
}

const validators = {
  required: (value) => {
    if (!value || (typeof value.length == 'number' && !value.length))
      return 'لطفا این قسمت را پر کنید'
    return true
  },
  number: (value) => {
    if (!isNum(value))
      return 'لطفا فقط عدد وارد کنید و زبان ورودی را انگلیسی کنید'
    return false
  },
  province: (value) => {
    if (!value || !value.Name) return 'لطفا یک استان انتخاب کنید'
    return false
  },
  city: (value) => {
    if (!value || !value.Name) return 'لطفا یک شهر انتخاب کنید'
    return false
  },
  provinceText: (value) => {
    if (!value) return 'لطفا یک استان انتخاب کنید'
    return false
  },
  cityText: (value) => {
    if (!value) return 'لطفا یک شهر انتخاب کنید'
    return false
  },

  postalCode: (value) => {
    if (!value || value.length <= 0) return 'لطفا کد پستی را وارد کنید'
    if (!isNum(value)) return 'کد پستی باید از اعداد لاتین تشکیل شده باشد'
    for (let i = 0; i < 5; i++) {
      if (value[i] === '0' || value[i] === '2')
        return 'پنج رقم اول کد پستی نمیتواند ۰ یا ۲ داشته باشد'
    }
    if (value.length !== 10) return 'کد پستی باید ده رقمی باشد'
    return false
  },

  address: (value) => {
    if (!value || value.length <= 0) return 'لطفا آدرس را وارد کنید'

    return false
  },
  phoneNumber: (value) => {
    if (!value) return 'لطفا شماره همراه را وارد کنید'
    if (value.length <= 0) return 'لطفا شماره همراه را وارد کنید'
    if (!isNum(value)) return 'شماره همراه باید فقط شامل اعداد لاتین باشد'
    if (value[0] !== '0' || value[1] !== '9')
      return 'شماره همراه صحیح با ۰۹ شروع میشود'
    if (value.length !== 11) return 'شماره همراه صحیح ۱۱ رقمی است'
    return false
  },
  passwordSimple: (value) => {
    if (!value || value.length <= 0) return 'لطفا رمز عبور را وارد کنید'
    if (value.length < 6) return 'رمز عبور باید حداقل ۶ حرفی باشد'
    return false
  },
  password: (value) => {
    if (!value || value.length <= 0) return 'لطفا رمز عبور را وارد کنید'
    else if (value.length < 6) return 'رمز عبور باید حداقل ۶ حرفی باشد'
    else if (!value.match(/[A-Z]/))
      return 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد'
    else if (!value.match(/[a-z]/))
      return 'رمز عبور باید حداقل یک حرف کوچک داشته باشد'
    else if (!value.match(/[0-9]/))
      return 'رمز عبور باید حداقل یک عدد داشته باشد'
    // else if (!value.match(/[!@#\$&\*]/))
    //   return "رمز عبور یک کاراکتر خاص !@#$&* را داشته باشد";
    return true
  },
  sms6DigitPasswordRecoveryVerificationCode: (value) => {
    if (!value || value.length <= 0) return 'لطفا کد پیامک شده را وارد کنید'
    if (!isNum(value)) return 'کد پیامکی باید فقط شامل اعداد لاتین باشد'
    if (value.length !== 6) return 'کد پیامکی باید ۶ رقمی باشد'
    return false
  },
  sms6DigitVerificationCode: (value) => {
    if (!value || value.length <= 0) return 'لطفا کد فعالسازی را وارد کنید'
    if (!isNum(value)) return 'کد فعالسازی باید فقط شامل اعداد لاتین باشد'
    if (value.length !== 6) return 'کد فعالسازی باید ۶ رقمی باشد'
    return false
  },
  sms6DigitDisposablePassword: (value) => {
    if (!value || value.length <= 0) return 'لطفا رمز یکبار مصرف را وارد کنید'
    if (!isNum(value)) return 'رمز یکبار مصرف باید فقط شامل اعداد لاتین باشد'
    if (value.length !== 6) return 'رمز یکبار مصرف باید ۶ رقمی باشد'
    return false
  },

  firstName: (value) => {
    if (!value) return 'لطفا نام را وارد کنید'
    return false
  },
  fullName: (value) => {
    if (!value) return 'لطفا نام و نام خانوادگی را وارد کنید'
    return false
  },
  lastName: (value) => {
    if (!value) return 'لطفا نام خانوادگی را وارد کنید'
    return false
  },
  userName: (value) => {
    if (!value) return 'لطفا نام کاربری را وارد کنید'
    return false
  },
  mobileNumber: (value) => {
    if (!value) return 'لطفا شماره همراه را وارد کنید'
    if (value.length <= 0) return 'لطفا شماره همراه را وارد کنید'
    if (!isNum(value)) return 'شماره همراه باید فقط شامل اعداد لاتین باشد'
    if (value[0] !== '0' || value[1] !== '9')
      return 'شماره همراه صحیح با ۰۹ شروع میشود'
    if (value.length !== 11) return 'شماره همراه صحیح ۱۱ رقمی است'
    return false
  },
  fixedPhoneNumber: (value) => {
    if (!value) return 'لطفا شماره تماس ثابت را وارد کنید'
    if (value.length <= 0) return 'لطفا شماره تماس ثابت را وارد کنید'
    if (!isNum(value)) return 'شماره تلفن ثابت باید فقط شامل اعداد لاتین باشد'
    if (value.length < 11)
      return 'شماره تماس ثابت(با پیش شماره) نمی‌تواند کمتر از 11 رقم باش'
    return false
  },
  email: (value) => {
    if (!value || value.length <= 0) return 'لطفا پست الکترونیکی را وارد کنید'
    if (!value.includes('@') || !value.includes('.'))
      return 'آدرس پست الکترونیکی باید شامل @ و نقطه باشد'

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let regexResult = regex.test(value)
    if (!regexResult) return 'پست الکترونیکی وارد شده صحیح نیست'

    return false
  },
  natCodeRule(value) {
    let result = natCode(value)
    if (typeof result === 'string') return result
    else return !result
  },
}
export default validators

export function FindValidationErrors(...inputs) {
  let errors = []
  const wrongValidator = () => 'تابع اعتبارسنجی ناشناخته'

  for (let i = 0; i < inputs.length - 1; i += 2) {
    const value = inputs[i]
    const validator =
      typeof inputs[i + 1] === 'function'
        ? inputs[i + 1]
        : validators[inputs[i + 1]] || wrongValidator
    const error = validator(value)
    if (typeof error === 'string') errors.push(error)
  }

  if (errors.length <= 0) return null
  else return errors
}
