import TextInput from "@/components/TextInput/TextInput";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Timer from "@/components/counter/counter";


export default {
  name: 'signIn',
  data: () => ({
    isValid: false,
    fullName:'',
    loading: false,
    step:1,
    otp:'',
    email:''

  }),
  components: {
    SvgIcon,
    TextInput,
    Timer
  },
  methods: {
    handleComplete() {
      console.log('زمان به پایان رسید!')
    },


  }

}
