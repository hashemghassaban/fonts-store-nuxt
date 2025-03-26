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
    dataProduct: [],
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
    clear(){
      this.searchText = ''
      this.getCart()
    },
    async getCart() {
      await fetch(
        'https://linotyper.com/api/v1/layout/web',
        {
          method: 'GET', // or 'PUT'
        }
      )
        .then((response) => response.json()) //2
        .then((res) => {
          this.$store.commit('setEnamad',  res.entity?.settings?.enemad)
          this.$store.commit('setSetting',  res.entity?.settings)

          this.promotions = res.entity?.promotions
          this.menuItems = res.entity?.categories
          this.$store.commit('setCart', res.entity?.cart)
        })
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
  async asyncData() {
    const dataProduct = await fetch(
      `https://linotyper.com/api/v1/layout/web`,
      {
        method: 'GET', // or 'PUT'
      }
    ).then((res) => res.json());
    console.log(dataProduct)
    return { dataProduct };
  },
mounted() {
  this.getCart()
}
}


