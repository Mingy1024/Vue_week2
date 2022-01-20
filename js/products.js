import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "mingyo";

const app = createApp({
    data() {
        return {
            products:[],
            tempProduct:{}
        }
    },
    methods:{
        checkAdmin() {
            const url = `${apiUrl}/api/user/check`;
            axios.post(url)
            .then(()=>{
                this.getData();
            })
            .catch((err)=>{
                alert(err.data.message);
                window.location = "index.html";
            })
        },
        getData() {
            const url = `${apiUrl}/api/${apiPath}/admin/products`;
            axios.get(url)
            .then((res)=>{
                this.products = res.data.products;
                console.log(this.products);
            })
            .catch((err)=>{
                alert(err.data.message);
            })
        },
        openProduct(item) {
            this.tempProduct = item;
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();
    }
});

// 掛載
app.mount("#app");

