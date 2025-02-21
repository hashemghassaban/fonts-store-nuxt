import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import TextInput from "@/components/TextInput/TextInput";
import datePicker from 'vue-persian-datetime-picker'


export default {
  name: 'invite',
  data: () => ({
    page: 1,
    firstName :'',
    lastName:'',
    email:'',
    mobileNumber:'',
    born:''


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

  }

}
