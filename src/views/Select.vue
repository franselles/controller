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
        <li>
          <a href="#" @click="logout"
            ><b-icon icon="home-circle"></b-icon> SALIR DE LA APP</a
          >
        </li>
      </ul>
    </nav>

    <article class="message is-info">
      <div class="message-body">
        <b-button type="is-info" @click="checkTicket" expanded
          >CHECK TICKET</b-button
        >
      </div>
    </article>

    <article class="message is-success">
      <div class="message-body">
        <b-button type="is-success" @click="checkIn" expanded
          >ALQUILAR HAMACA</b-button
        >
      </div>
    </article>
    <article class="message is-warning">
      <div class="message-body">
        <b-button type="is-warning" @click="booked" expanded
          >TICKETS VENDIDOS</b-button
        >
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Select',
  data() {
    return {};
  },
  methods: {
    checkIn() {
      this.$router.push({ name: 'citybeaches' });
    },

    checkTicket() {
      this.$router.push({ name: 'checkticket' });
    },

    create() {
      this.$router.push({ name: 'createitems' });
    },

    booked() {
      this.$router.push({ name: 'today' });
    },

    back() {
      this.$router.go(-1);
    },

    logout() {
      this.$router.push({ name: 'login' });
    },
  },

  computed: {
    ...mapState('userStore', ['employee']),
  },
};
</script>

<style scoped></style>
