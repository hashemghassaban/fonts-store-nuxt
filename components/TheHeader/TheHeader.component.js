import SvgIcon from "@/components/SvgIcon/SvgIcon";
import NavBar from '@/components/megaMenu/megaMenu'
import { cartService  } from '~/services'

export default {
  name: 'TheHeader',
  components: {
    SvgIcon,
    NavBar
  },
  data: () => ({
    showMenu: false,
    drawer: false,
    showSearch:false,
    menuItems: [
      {
        "name": "دسته بندی ها",
        id:1,
        link:null,
        category: [
  [        {
    "name": "تست",
    link:null,

  },
    {
      "name": "تست",
      link:null,

    },
    {
      "name": "تست",
      link:null,

    },
    {
      "name": "تست",
      link:null,

    },],
          [        {
            "name": "تست",
            link:null,

          },
            {
              "name": "تست",
              link:null,

            },
            {
              "name": "تست",
              link:null,

            },
            {
              "name": "تست",
              link:null,

            },],
          [        {
            "name": "تست",
            link:null,

          },
            {
              "name": "تست",
              link:null,

            },
            {
              "name": "تست",
              link:null,

            },
            {
              "name": "تست",
              link:null,

            },],
          [        {
            "name": "تست",
            link:null,

          },
            {
              "name": "تست",
              link:null,

            },
            {
              "name": "تست",
              link:null,

            },
            {
              "name": "تست",
              link:null,

            },],




        ],


      },




    ],
    searchText: '',
    menu:[{
      name : '', link:''

    }]
  }),

  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem("token");
      }
    },
    cart() {
      return this.$store.state.cart
    },
  },
  methods: {
    async getCart() {

      try {
        const res = await cartService.getCart()
        this.$store.commit('setCart', res.entity?.cart)
        console.log(res.entity?.cart)

      } catch (error) {
        console.error('خطا در دریافت کاربران:', error)
      }


    },
    goToCart(){
      if(this.cart?.items?.length  > 0){
        this.$router.push('/cart')
      }else {
        this.$toast.error('سبد خرید خالی است ', {
          timeout: 4000,
        })
      }

    },
    openSearch() {
      this.showSearch = true
    },
  },
mounted() {
  this.menuItems = this.$store.state.categories
  if(this.authenticate){
    this.getCart()
  }
}

}


