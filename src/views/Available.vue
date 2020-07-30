<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#" @click="back"
            ><b-icon icon="arrow-left-thick"></b-icon> VOLVER</a
          >
        </li>
        <li v-if="employee">{{ employee.name }}</li>
        <li>
          <a href="#" @click="logout"
            ><b-icon icon="home-circle"></b-icon> SALIR DE LA APP</a
          >
        </li>
      </ul>
    </nav>

    <p>{{ sectorActual.sector }} PLAYA {{ beachActual.beach }}</p>

    <div>
      <div class="card" v-for="(item, index) in cartDetail" :key="index">
        <header class="card-header">
          <p class="card-header-title">PRECIO TOTAL {{ total(item) }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            ID: <strong> {{ item.typeID }}</strong>
            <br />
            <strong>{{ item.type }}</strong>
            <br />
            DISPONIBLE <strong> {{ item.available }}</strong>
            <br />
            CANTIDAD: <strong> {{ item.quantity }} </strong> PRECIO
            <strong> {{ item.price }}</strong>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="addItem(index)">+</a>
          <a class="card-footer-item" @click="removeItem(index)">-</a>
        </footer>
      </div>
    </div>

    <b-button type="is-primary" @click="send">ENVIAR</b-button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'available',
  data() {
    return {
      cartLocal: {
        date: null,
        userID: null,
        phone: null,
        ticketID: null,
        canceled: false,
        payed: false,
        lang: '',
        payMethod: 1,
        coupon: '',
        detail: [],
      },
    };
  },

  mounted() {
    this.resetCartDetail();
    this.getCategories({
      cityID: this.cityActual.cityID,
      beachID: this.beachActual.beachID,
      sectorID: this.sectorActual.sectorID,
      date: this.dateActual,
    }).then(result => {
      this.setCartDetail(result);
    });
  },

  methods: {
    ...mapActions('userStore', ['getCategories', 'getTicketNumber']),

    ...mapMutations('userStore', [
      'setCartDetail',
      'resetCartDetail',
      'updateAddCartDetail',
      'updateRemoveCartDetail',
      'setCart',
    ]),

    total(data) {
      return data.quantity * data.price;
    },

    addItem(data) {
      if (data.available <= 0) return;
      this.updateAddCartDetail(data);
    },

    removeItem(data) {
      this.updateRemoveCartDetail(data);
    },

    getTicketNumberLocal() {
      this.getTicketNumber().then(result => {
        // this.cartLocal.ticketID = (
        //   this.cartLocal.date + ('00000' + result).slice(-5)
        // ).replace(/-/g, '');
        this.cartLocal.ticketID = ('00000000' + result).slice(-8);

        this.postCart(this.cartLocal).then(result => {
          if (result === true) {
            setTimeout(() => {
              this.resetCart();
              this.$router.replace({ name: 'citybeaches' });
            }, 2000);
          } else {
            this.detailDuplicated = result;
            result.forEach(element => {
              const index = this.cartLocal.detail.findIndex(
                (p => p.citiID === element.cityID) &&
                  (p => p.beachID === element.beachID) &&
                  (p => p.sectorID === element.sectorID) &&
                  (p => p.typeID === element.typeID) &&
                  (p => p.col === element.col) &&
                  (p => p.row === element.row)
              );

              this.cartLocal.detail.splice(index, 1);
            });

            if (this.detailDuplicated.length > 0) {
              this.setCart(this.cartLocal);
              this.calcTotal();
            }
          }
        });
      });
    },

    send() {
      let f = this.cartDetail.filter(item => item.quantity > 0);
      this.cartLocal.date = dayjs(new Date()).format('YYYY-MM-DD');
      // this.cartLocal.userID = 'CO-' + this.employee.dni;
      // this.cartLocal.phone = 'CO-' + this.employee.phone;
      this.cartLocal.userID = 'VENTA EN TAQUILA';
      this.cartLocal.phone = 'VENTA EN TAQUILA';

      this.cartLocal.ticketID = null;

      this.cartLocal.canceled = false;
      this.cartLocal.payed = false;
      this.cartLocal.lang = 'es';
      this.cartLocal.payMethod = 1;
      this.cartLocal.coupon = '';

      f.forEach(item => {
        this.cartLocal.detail.push({
          date: this.dateActual,
          cityID: this.cityActual.cityID,
          // city: this.cityActual.city,
          beachID: this.beachActual.beachID,
          // beach: this.beachActual.beach,
          sectorID: this.sectorActual.sectorID,
          // sector: this.sectorActual.sector,
          typeID: item.typeID,
          type: item.type,
          itemID: null,
          price: item.price,
          quantity: item.quantity,
          codeID: null,
          used: false,
          dateTimeUsed: '',
        });
      });

      this.setCart(this.cartLocal);
      this.$router.push({ name: 'cart' });
    },

    back() {
      this.$router.go(-1);
    },

    logout() {
      this.$router.replace({ name: 'login' });
    },
  },

  computed: {
    ...mapState('worksStore', [
      'sectors',
      'employee',
      'cityActual',
      'sectorActual',
      'beachActual',
      'dateActual',
    ]),
    ...mapState('userStore', ['cartDetail']),
  },
};
</script>

<style scoped>
.card {
  margin: 1.2em 0 1.2em;
}
</style>
