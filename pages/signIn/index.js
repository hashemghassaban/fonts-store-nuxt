import { mapActions } from 'vuex'

import axios from 'axios'

export default {
  name: 'cart',
  layout: 'empty',
  head: {
    titleTemplate: '%s -فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی',
    title: 'سبد خرید',
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'سبد خرید   - فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی',
    },
  ],
  data: () => ({
    isLoading: null,
    rating: 2.5,
    loadingSkeleton: false,
    loadingSkeletonCart: true,
    dataCart: [],
    status:0,
  }),
  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem('token')
      }
    },
    dayCareItems() {
      return this.$store.getters.dayCareItems
    },
    lengthCart() {
      if (this.dataCart) {
        let total = 0

        for (let item of this.dataCart) {
          total += item?.quantity
        }

        return total
      } else return 0
    },
    totalPriceProcess() {
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
                item?.offPrice === null ||
                item?.offPrice === undefined ||
                item?.offPrice === 0 ||
                item?.offPrice === item?.price
                  ? item?.price * item?.quantity
                  : item?.offPrice * item?.quantity
            }
          } else {
            total +=
              (item?.offPrice ? item?.offPrice : item?.price) * item?.quantity
          }
        }

        return total
      } else return 0
    },
    totalPrice() {
      if (this.dataCart) {
        let total = 0

        for (let item of this.dataCart) {
          if (!this.authenticate) {
            if (item?.selectInfoVariation?.price) {
              total += item?.selectInfoVariation?.price * item?.quantity
            } else {
              total += item?.price * item?.quantity
            }
          } else {
            total += item?.price * item?.quantity
          }
        }
        return total
      } else return 0
    },
    totalDiscount() {
      if (this.dataCart) {
        let total = 0
        for (let item of this.dataCart) {
          if (!this.authenticate) {
            if (item?.selectInfoVariation?.price) {
              total += item?.selectInfoVariation?.offPrice
                ? (item?.selectInfoVariation?.price -
                    item?.selectInfoVariation?.offPrice) *
                  item?.quantity
                : 0
            } else {
              total +=
                item?.offPrice === item?.price ||
                item?.offPrice === null ||
                item?.offPrice === 0
                  ? 0
                  : (item?.price - item?.offPrice) * item?.quantity
            }
          } else {
            total +=
              item?.offPrice === item?.price ||
              item?.offPrice === null ||
              item?.offPrice === 0
                ? 0
                : (item?.price - item?.offPrice) * item?.quantity
          }
        }
        return total
      } else return 0
    },
  },
  watch: {
    dayCareItems(newCount, oldCount) {
      // Our fancy notification (2).
      this.dataCart = newCount
    },
  },
  methods: {
    ...mapActions(['decreaseCart']),
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
    async RemoveOrderDetails(item, index) {
      this.isLoading = index
      let data = {
        orderDetailsId: item.id ? item.id : item.relatedProductId,
      }
      await this.$store.dispatch('Order/RemoveOrderDetails', data).then(() => {
        this.dataCart = this.dataCart.filter((order) => order.id !== item.id)
        this.isLoading = null
      })
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    removeCart(item, index) {
      if (this.authenticate) {
        this.RemoveOrderDetails(item, index)
      } else {
        this.$store.commit('removeFromCart', item)
        this.dataCart = this.$store.getters.dayCareItems
      }
    },
    Shopping() {
      if (this.authenticate) {
        this.$router.push('/checkout')
      } else {
        localStorage.setItem('lastUrL', this.$route.path)
        this.$router.push('/signIn')
      }
    },
    async getListCart(index) {
      this.isLoading = index
      this.loadingSkeleton = true
      if (this.authenticate) {
        await this.$store
          .dispatch('Order/GetCurrentUserFullOpenOrder')
          .then((res) => {
            let data = res
            this.status = data?.status
            this.loadingSkeletonCart = false
            this.dataCart = data?.orderDetails
            if (res === '') {
              this.$toast.error('سبد خرید شما برای ثبت سفارش خالی است .', {
                timeout: 4000,
              })
            }
            this.dataCart = this.dataCart?.sort((a, b) =>
              a.productName.toLowerCase() < b.productName.toLowerCase()
                ? -1
                : b.productName.toLowerCase() > a.productName.toLowerCase()
                ? 1
                : 0
            )

            this.isLoading = null
          })

        this.loadingSkeleton = false
        this.loadingSkeletonCart = false
      }
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
              Authorization: process.client
                ? localStorage.getItem('token')
                : '',
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
    },
    decreaseCart(item, index) {
      if (this.authenticate) {
        if (item.quantity > 1) {
          this.AddProductToOrder(index, item, item.quantity - 1)
        }
      } else {
        if (item.quantity > 1) {
          this.$store.dispatch('decreaseCart', index)

          if (process.client) {
            this.dataCart = window.localStorage.getItem('dayCare')
          }

          this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []
        }
      }
    },
  },
  async beforeMount() {
    if (this.authenticate) {
      this.getListCart()
    }
  },
  mounted() {
    if (this.authenticate) {
      this.loadingSkeletonCart = true
    } else {
      this.dataCart = localStorage.getItem('dayCare')
      this.dataCart = this.dataCart ? JSON.parse(this.dataCart) : []
      this.loadingSkeletonCart = false
    }
  },
}
