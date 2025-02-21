import NavBar from '@/components/megaMenu/megaMenu'
import axios from 'axios'

import { mapActions } from 'vuex'

import Autocomplete from '@trevoreyre/autocomplete-vue'
export default {
  name: 'TheHeader',
  components: {
    NavBar,
    Autocomplete,
  },
  middleware: 'guest',
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },

  data: () => ({
    user: [],
    showCartList: false,
    view: {
      topOfPage: true,
    },
    drawer: false,
    typing: false,
    loading: false,
    loadingCart: false,
    items: [],
    phoneNumber: '',
    isLoading: null,
    searchText: '',
    states: [],
    versionCurrent: 0,
    showNewVersion: false,
    OrderDetail: [],
    menu: null,
    lengthCart: 0,
    dataCart: [],
    status:0,
    showDataCart: false,
  }),

  watch: {
    dayCareItems(newCount, oldCount) {
      this.dataCart = process.client
        ? window.localStorage.getItem('dayCare')
        : []
      this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []

      this.showDataCart = false
    },
    itemCartServer(newCount, oldCount) {
      if (this.authenticate) {
        if (newCount) {
          let total = 0
          for (let item of newCount) {
            total += item?.quantity
          }
          this.lengthCart = total
          return total
        } else this.lengthCart = 0
      }
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user')) || []

    this.versionCurrent = localStorage.getItem('version')
    if (this.versionCurrent !== null && this.versionCurrent !== this.version) {
      this.showNewVersion = true
    } else if (this.versionCurrent === null) {
      localStorage.setItem('version', this.version)
    }

    if (this.authenticate) {
      this.GetPersonInfo()
    }
    this.getListCart()
    this.getCategory()

    this.dataCart = localStorage.getItem('dayCare')

    this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []
  },

  methods: {
    ...mapActions(['increaseCart', 'decreaseCart', 'setCart']),

    search(input) {
      this.searchText = input
      const url = `https://gateway.alasaz.com/Product/Product/GetProductsShortData?Search=${encodeURI(
        input
      )}`

      return new Promise((resolve) => {
        if (input.length < 2) {
          return resolve([])
        }

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            resolve(data.models)
          })
      })
    },

    getResultValue(result) {
      return result.name
    },
    handleSubmit(result) {
      this.$router.push(
        '/product/' + result?.number + '/' + result?.name?.replaceAll(' ', '-')
      )
    },
    goToSign() {
      localStorage.setItem('lastUrL', this.$route.path)
      this.$router.push('/signIn')
    },
    eraseCache() {
      this.phoneNumber = localStorage.getItem('user')
      location.reload(true)
      window.history.forward(1)
      localStorage.clear()
      localStorage.setItem('user', this.phoneNumber)
    },
    increaseCart(index, item, data) {
      if (this.authenticate) {
        if (data < item.productQuantityInStock) {
          this.AddProductToOrder(index, item, item.quantity + 1)
        } else {
          this.$toast.error('بیش از حد موجودی در انبار', {
            timeout: 4000,
          })
        }
      } else {
        if (
          item?.selectInfoVariation?.variationId
            ? data < item?.selectInfoVariation?.quantity
            : data < item.quantityInStock
        ) {
          this.$store.dispatch('increaseCart', index)
          this.dataCart = process.client
            ? window.localStorage.getItem('dayCare')
            : []
          this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []
        } else {
          this.$toast.error('بیش از حد موجودی در انبار', {
            timeout: 4000,
          })
        }
      }
      this.showDataCart = false
    },
    async GetUserWallet() {
      let data = {
        pageNumber: 1,
        pageSize: 1,
      }
      await this.$store.dispatch('Order/GetUserWallet', data).then((res) => {
        this.$store.commit('setBalance', res.balance)
      })
    },
    async GetPersonInfo() {
      await this.$store.dispatch('Account/PersonInfo').then((res) => {
        localStorage.setItem('user', JSON.stringify(res))
      })
      this.user = JSON.parse(localStorage.getItem('user'))
    },

    async AddProductToOrder(index, item, state) {

  

      this.isLoading = index
      const newArr = this.dataCart.map((obj) => {
        if (obj.id === item.id) {
          return {
            ...obj,
            quantity: state,
          }
        }

        return obj
      })
      await axios
        .put(
          'https://gateway.alasaz.com/Order/Order/UpdateOrderProducts',
          newArr,
          {
            headers: {
              Authorization:  process.client ? localStorage.getItem('token') : '',
            },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            this.$toast.warning('به دلیل عدم موجودی از سبد خرید حذف شد ', {
              timeout: 4000,
            })
          }
          this.getListCart()
          this.$store.commit('stopLoading')
        })
        .catch(() => {
          this.$store.commit('stopLoading')
        })
    },

    async RemoveOrderDetails(item, index) {
      this.isLoading = index
      let data = {
        orderDetailsId: item.id ? item.id : item.relatedProductId,
      }
      await this.$store.dispatch('Order/RemoveOrderDetails', data).then(() => {
        this.getListCart()
      })
    },

    async getListCart() {
      this.loadingCart = true
      if (this.authenticate) {
        await this.$store
          .dispatch('Order/GetCurrentUserFullOpenOrder')
          .then((res) => {
            let data = res
            this.status = data?.status
            this.dataCart = data?.orderDetails
            this.dataCart = this.dataCart?.sort((a, b) =>
              a.productName.toLowerCase() < b.productName.toLowerCase()
                ? -1
                : b.productName.toLowerCase() > a.productName.toLowerCase()
                ? 1
                : 0
            )
            this.setCart(this.dataCart)
            this.isLoading = null
            this.loadingCart = false
            this.showDataCart = true
          })
      } else {
        this.dataCart = process.client
          ? window.localStorage.getItem('dayCare')
          : []
        this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []
      }
      this.loadingCart = false
    },
    decreaseCart(item, index) {
      if (this.authenticate) {
        if (item.quantity > 1) {
          this.AddProductToOrder(index, item, item.quantity - 1)
        }
      } else {
        if (item.quantity > 1) {
          this.$store.dispatch('decreaseCart', index)
          this.dataCart = process.client
            ? window.localStorage.getItem('dayCare')
            : []
          this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []
        }
      }
      this.showDataCart = false
    },
    goToDetail(item) {
      this.$router.push(
        '/product/' + item?.number + '/' + item?.name?.replaceAll(' ', '-')
      )
    },
    reqSearch() {
      let str = this.searchText?.replaceAll(' ', '-')
      let newstr = str.endsWith('-') ? str.slice(0, -1) : str
      this.$router.push('/productList?q=' + newstr)
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        if (this.view.topOfPage) this.view.topOfPage = false
      } else {
        if (!this.view.topOfPage) this.view.topOfPage = true
      }
    },
    openCart() {
      this.showCartList = !this.showCartList
      this.getListCart()
    },
    showDetailProduct(item) {
      if (item?.productNumber !== undefined) {
        return this.$router.push(
          '/product/' +
            item?.productNumber +
            '/' +
            item?.productName.replaceAll(' ', '-')
        )
      } else {
        return this.$router.push(
          '/product/' + item?.number + '/' + item?.name.replaceAll(' ', '-')
        )
      }
    },

    async getCategory() {
    
      await fetch(
        'https://gateway.alasaz.com/Product/Product/GetCategories',
        {
          method: 'GET', // or 'PUT'
          headers: {
            Authorization:   process.client ? localStorage.getItem('token') : '',
          },
        }
      )
        .then((response) => response.json()) //2
        .then((res) => {
          let data = res
          this.menu = data
          this.$store.dispatch('getMenu', data)
        })
    },

    removeCart(item, index) {
      if (this.authenticate) {
        this.RemoveOrderDetails(item, index)
      } else {
        this.$store.commit('removeFromCart', item)
        this.dataCart = this.$store.getters.dayCareItems
      }
      this.showDataCart = false
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    percent(x, y) {
      return (((x - y) / x) * 100).toString().slice(0, 2)
    },
    goToProfile() {
      this.$router.push('/profile/activity')
    },
    payment() {
      this.$router.push('/checkout')
    },
    logout() {
      this.$store.commit('LOGOUT')
    },
    cart() {
      this.$router.push('/cart')
    },
  },

  computed: {
    version() {
      return this.$store.getters.getVersion
    },
    amountWallet() {
      return this.$store.getters.getBalance
    },
    dayCareItems() {
      return this.$store.getters.dayCareItems
    },
    itemCartServer() {
      return this.$store.getters.getCart
    },
    lengthCartLocal() {
      if (!this.authenticate) {
        if (this.dataCart) {
          let total = 0
          for (let item of this.dataCart) {
            total += item?.quantity
          }

          return total
        } else return 0
      }
    },
    totalPrice() {
      if (this.dataCart) {
        let total = 0

        for (let item of this.dataCart) {
          if (!this.authenticate) {
            if (item?.selectInfoVariation?.price) {
              total +=
                (item?.selectInfoVariation?.offPrice
                  ? item?.selectInfoVariation?.offPrice
                  : item?.selectInfoVariation?.price) * item?.quantity
            } else {
              total +=
                item?.offPrice === 0 ||
                item?.offPrice === null ||
                item?.offPrice === undefined ||
                item?.offPrice === item?.price
                  ? item?.price * item?.quantity
                  : item?.offPrice * item?.quantity
            }
          } else {
            total +=
              item?.offPrice === 0 ||
              item?.offPrice === null ||
              item?.offPrice === undefined ||
              item?.offPrice === item?.price
                ? item?.price * item?.quantity
                : item?.offPrice * item?.quantity
          }
        }

        return total
      } else return 0
    },

    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem('token')
      }
    },
  },
}
