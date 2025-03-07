import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import TextInput from "@/components/TextInput/TextInput";
import datePicker from 'vue-persian-datetime-picker'
import { profileService  } from '~/services'


export default {
  name: 'invite',
  data: () => ({
    page: 1,
    firstName :'',
    lastName:'',
    email:'',
    mobileNumber:'',
    id:'',
    born:'',
    isValid: false,
    loading:false,
    isEdit:false,


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
        console.log(newValue)
        this.getProfile(newValue)
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
    async saveProfile() {
      // const formData = new FormData();
      let body = {
        'mobile':this.mobileNumber,
        'email':this.email,
        'birth_at':this.born,
        // 'avatar_url':this.src,
        "name":this.firstName,
        "family":this.lastName,

      }
      // // اضافه کردن فیلدهای ساده
      // Object.keys(body).forEach(key => {
      //   formData.append(key, body[key]);
      // });
      this.loading=true

      if(this.isValid)
        try {
        await profileService.saveProfile(body)
          this.loading=false
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
      this.born = data?.birth_at
      this.id = data?.id
    },

  }

}
