import SvgIcon from "@/components/SvgIcon/SvgIcon";
import NavBar from '@/components/megaMenu/megaMenu'

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
  methods: {
    openSearch() {
      this.showSearch = true
    },
  },

  watch: {

  },

  }


