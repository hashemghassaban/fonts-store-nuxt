import TextInput from "@/components/TextInput/TextInput";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Timer from "@/components/counter/counter";
import { authService } from '~/services'


export default {
  name: 'signIn',
  middleware: 'authenticated',
  head: {
    titleTemplate: "",
    title: "ورود به لاینوتایپ - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },

  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "ورود به داشبورد کاربری لاینوتایپ ",
    },
  ],

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
    lastName:'',
    email:''

  }),

  components: {
    SvgIcon,
    TextInput,
    Timer
  },
  methods: {
    edit(){
      this.step = 1;
      this.otp = ""
      this.firstName = ""
      this.lastName = ""
      this.email = ""
    },
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
            this.$toast.error(error, {
              timeout: 4000,
            })
            this.loading = false
          })
    },
    async login() {
      if(this.isRegisterd){
        if(this.firstName === ""){
          this.$toast.error("فیلد نام نباید خالی باشد.", {
            timeout: 4000,
          })
          return;
        }
        if(this.lastName === ""){
          this.$toast.error("فیلد نام خانوادگی نباید خالی باشد.", {
            timeout: 4000,
          })
          return;
        }
        if(this.email === ""){
          this.$toast.error("فیلد ایمیل نباید خالی باشد.", {
            timeout: 4000,
          })
          return;
        }
      }
      this.loading = true
      const body = {
        mobile: this.mobile,
        code: this.otp,
        ...(this.isRegisterd === true && {
          name: this.firstName,
          family: this.lastName,
          email: this.email
        })

      }
  await authService.sendSMS(body)
     .then((res) => {
       this.loading = false;
       this.token = res.token
       this.user = res.user
       this.loginUser()
       let path = localStorage.getItem('lastUrL')
       window.location.replace(path ? path : '/')
       localStorage.removeItem('lastUrL')

     })
     .catch(error => {
       this.loading = false
       this.otp = ''

       this.$toast.error(error, {
         timeout: 4000,
       })

     })
    },
    loginUser() {
      window.localStorage.setItem('token',this.token);
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
        if(!this.isRegisterd)  this.login()

      }
    }
  }
}
