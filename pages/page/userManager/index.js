import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import TextInput from "@/components/TextInput/TextInput";
import { profileService  } from '~/services'
import moment from 'moment-jalaali'


export default {
  name: 'usermanager',
  head: {
    titleTemplate: "",
    title: " اطلاعات کاربری - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },

  },
  data: () => ({
    page: 1,
    firstName :'',
    lastName:'',
    email:'',
    mobileNumber:'',
    id:'',
    isValid: false,
    loading:false,
    isEdit:false,
    isCallService:false,
    internalDate: null,
    latinDate:null,
    showDatePicker: false,
    shamsiValidators: [
      (value) => {
        if (!value) return true
        const isValid = moment(value, 'jYYYY/jMM/jDD', true).isValid()
        return isValid || 'فرمت تاریخ باید YYYY/MM/DD باشد'
      }
    ]

  }),
  computed: {
    born: {
      get() {
        if (!this.internalDate) return null
        const date = moment(this.internalDate, 'YYYY-MM-DD')
        const shamsiDate = date.locale('fa').format('jYYYY/jMM/jDD')
        const latinDate = date.locale('en').format('YYYY-MM-DD')  // تغییر فرمت به YYYY-MM-DD

        this.latinDate = latinDate
        return shamsiDate
      },
      set(newValue) {
        if (!newValue) {
          this.internalDate = null
          return
        }
        const date = moment(newValue, 'jYYYY/jMM/jDD', true)
        if (date.isValid()) {
          this.internalDate = date.format('YYYY-MM-DD')
        }
      }
    }
  },
  components: {
    SvgIcon,
    sidebar,
    TextInput,
  },


  methods: {
    handleDateSelect(date) {
      if (!date) {
        this.showDatePicker = false
        return
      }
      this.internalDate = date
      this.showDatePicker = false
    },
    profile(newValue) {
      if(newValue ){
        this.loading = true
        setTimeout(()=>{
          this.getProfile(newValue)

        },100)
      }

    },
    avatarUrl(newValue) {
      if(newValue){
        this.src = newValue
      }

    },
    selectDate() {
      this.born = this.$refs.datePicker.displayValue
    },
    getFormData(data, method) {
      const form = new FormData()
      for (const key in data) {
        if (data[key] === null || data[key] === undefined) {
          delete data[key]
        } else form.append(key, data[key])
      }
      if(method) form.append('_method', method);
      return form
    },
    async saveProfile() {
      this.isCallService = false

      let body = {
        'mobile':this.mobileNumber,
        'email':this.email,
        'birth_at':this.latinDate,
        // 'avatar_url':this.src,
        "name":this.firstName,
        "family":this.lastName,

      }
      this.loading=true

      if(this.isValid)
        try {
        await profileService.saveProfile(this.getFormData(body))
          this.loading=false
          this.$toast.success('اطلاعات با موفقیت ویرایش شد.')
          this.isEdit = false
          this.isCallService = true


        } catch (e) {
          this.loading=false
          this.isEdit = false

          this.$toast.error(e)

        }
    },
    async getProfile(data) {
      this.firstName = data?.name
      this.lastName= data?.family
      this.mobileNumber =data?.mobile
      this.email = data?.email
      this.internalDate = data?.birth_at
      this.id = data?.id
      this.loading = false
    },

  }

}
