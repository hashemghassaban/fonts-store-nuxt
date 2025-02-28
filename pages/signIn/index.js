import TextInput from "@/components/TextInput/TextInput";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Timer from "@/components/counter/counter";
import { authService } from '~/services'


export default {
  name: 'signIn',
  middleware: 'authenticated',

  data: () => ({
    isValid: false,
    mobile:'',
    loading: false,
    step:1,
    otp:'',
    user: null,
    token: null,
    isRegisterd: false,
    firstName:'',
    lastName:''

  }),

  components: {
    SvgIcon,
    TextInput,
    Timer
  },
  methods: {
    async getSMS(){
      this.loading = true
      let body ={
        mobile:this.mobile,
      }
      await authService.login(body)
          .then((data) => {
            this.loading = false
            this.step  = 2
            this.isRegisterd = data?.is_registered
          })
          .catch(error => {
            console.log(error)
            this.loading = false
          })
    },
    async login() {
      this.loading = true
      const body = {
        mobile: this.mobile,
        code: this.otp,
        ...(this.isRegisterd === false && {
          firstName: this.firstName,
          lastName: this.lastName
        })

      }
  await authService.sendSMS(body)
     .then((res) => {
       this.loading = false;
       console.log(res)
       this.token = res.token
       this.user = res.user
       this.loginUser()
       let path = localStorage.getItem('lastUrL')
       window.location.replace(path ? path : '/')
       localStorage.removeItem('lastUrL')

     })
     .catch(error => {
       this.loading = false
     })
    },
    loginUser() {
      window.localStorage.setItem('token',this.token);
      // this.$auth.setUserToken(this.token)
      // this.$auth.setUser(this.user)
      // this.$store.commit('closeLogin')
      // this.$root.$emit('loggedIn')
    },
  },
  watch: {
    mobile(newValue) {
      if(newValue.length === 11){
        this.getSMS()
      }
    },
    otp(newValue) {
      if(newValue.length === 5){
        this.login()
      }
    }
  }
}
