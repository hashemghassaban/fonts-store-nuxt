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
    born:'',
    isValid: false,
    loading:false,


  }),
  components: {
    SvgIcon,
    sidebar,
    TextInput,
    datePicker
  },
  methods: {
    selectDate() {
      this.born = this.$refs.datePicker.displayValue
    },
    async saveProfile() {
      this.loading=true
      let body = {
        'full_name':this.firstName +''+ this.lastName,
        'mobile':this.mobileNumber,
        'email':this.email,
        'birth_at':this.born,
      }
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

  }

}
