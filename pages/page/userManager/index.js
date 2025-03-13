import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import TextInput from "@/components/TextInput/TextInput";
import datePicker from 'vue-persian-datetime-picker'
import { profileService  } from '~/services'


export default {
  name: 'usermanager',
  head: {
    titleTemplate: "",
    title: "پنل کاربری - لاینو تایپ",
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
    selectedDate:'',
    born:'',
    isValid: false,
    loading:false,
    isEdit:false,
    isCallService:false

  }),
  components: {
    SvgIcon,
    sidebar,
    TextInput,
    datePicker
  },


  methods: {
    profile(newValue) {
      if(newValue ){
        this.loading = true
        this.getProfile(newValue)
      }

    },
    avatarUrl(newValue) {
      if(newValue){
        console.log(newValue)
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
        'birth_at':this.selectedDate,
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
          if(e.response && e.response.data && e.response.data.errors) {
            this.errors = e.response.data.errors
          }
        }
    },
    async getProfile(data) {
      this.firstName = data?.name
      this.lastName= data?.family
      this.mobileNumber =data?.mobile
      this.email =data?.email
      this.born = data?.birth_at?   new Date(data?.birth_at ).toLocaleString("fa-IR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }) : null
      this.id = data?.id
      this.loading = false
    },

  }

}
