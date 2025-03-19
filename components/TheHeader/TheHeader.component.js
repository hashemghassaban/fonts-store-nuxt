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
    enamad:[],
    showSearch:false,
    promotions:[],
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
    handleSearch(){
      this.$router.push('/product?search=' + this.searchText)
      this.showSearch = false
    },
    async getCart() {
      try {
        const res = await cartService.getCart()
        this.$store.commit('setEnamad',  res.entity?.settings?.enemad)
        this.promotions = res.entity?.promotions
        this.menuItems = res.entity?.categories
        this.$store.commit('setCart', res.entity?.cart)
        console.log(this.$store.state.namad)

      } catch (error) {
        // this.$toast.error(error, {
        //   timeout: 4000,
        // })
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
  if(this.authenticate){
    this.getCart()
  }
}

}


