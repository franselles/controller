<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#" @click="back"
            ><b-icon icon="arrow-left-thick"></b-icon> VOLVER</a
          >
        </li>
        <li>{{ employee.name }}</li>
      </ul>
    </nav>

    <article class="message is-danger" v-if="error">
      <div class="message-header">
        <p>ERROR CON LA CAMARA</p>
      </div>
      <div class="message-body">
        {{ error }}
      </div>
    </article>

    <qrcode-stream @decode="onDecode" @init="onInit" />

    <article :class="stateTicket(detail)" v-if="result">
      <div class="message-header">
        <p>USUARIO: {{ cartLocal.phone }}</p>
      </div>
      <div class="message-body">
        <h5 class="title is-5" v-if="detail.used">
          ESTADO DEL TICKET:
          <span class="tag is-danger is-medium has-text-weight-bold"
            >USADO</span
          >
        </h5>

        <h5 class="title is-5">NÚMERO: {{ detail.numberItem }}</h5>
        <h5 class="title is-5">
          COLUMNA: {{ detail.col }} FILA: {{ detail.row }}
        </h5>
        <h5 class="title is-5">PLAYA: {{ detail.beach }}</h5>
        <h5 class="title is-5">SECTOR: {{ detail.sector }}</h5>
        <p>TICKET: {{ cartLocal.ticketID }}</p>
        <p>FECHA: {{ formatDate(detail.date) }}</p>
        <p>ID: {{ detail.itemID }}</p>
        <p>TIPO: {{ detail.type }}</p>
        <p>PRECIO: {{ detail.price }} €</p>
        <b-button type="is-danger" @click="setUsed(detail._id)" expanded
          >MARCADO CHECK</b-button
        >
      </div>
    </article>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'checkticket',
  components: { QrcodeStream },
  data() {
    return {
      result: '',
      error: '',
      cartLocal: {
        date: null,
        userID: null,
        phone: null,
        ticketID: null,
        canceled: false,
        detail: [],
      },
      detail: null,
    };
  },

  methods: {
    ...mapActions('userStore', [
      'getItemUserDetail',
      'getItemUser',
      'postUsed',
    ]),

    setUsed(item) {
      this.postUsed({
        id: item,
      });
    },

    stateTicket(item) {
      if (item.used == true) {
        return 'message is-danger';
      }

      return 'message is-warning';
    },

    onDecode(result) {
      this.getItemUser({
        id: result,
      }).then(res => {
        this.cartLocal = res;
        this.getItemUserDetail({
          id: result,
        }).then(res => {
          this.detail = res;
          this.result = result;
        });
      });
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      }
    },

    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY');
    },

    back() {
      this.$router.go(-1);
    },
  },

  computed: {
    ...mapState('userStore', ['employee']),
  },
};
</script>

<style scoped></style>
