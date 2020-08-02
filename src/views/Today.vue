<template>
  <div>
    <b-field label="CIUDAD">
      <b-select
        placeholder="Select a name"
        @click.native="getBeachesFunc()"
        v-model="cityLocal"
      >
        <option
          v-for="option in cities"
          :value="option.cityID"
          :key="option.cityID"
        >
          {{ option.city }}
        </option>
      </b-select>
    </b-field>

    <b-field label="PLAYA">
      <b-select
        placeholder="Select a name"
        @click.native="getSectorsFunc()"
        v-model="beachLocal"
      >
        <option
          v-for="option in beaches"
          :value="option.beachID"
          :key="option.beachID"
        >
          {{ option.beach }}
        </option>
      </b-select>
    </b-field>

    <b-field label="SECTOR">
      <b-select
        placeholder="Select a name"
        @click.native="getCategoriesFunc()"
        v-model="sectorLocal"
      >
        <option
          v-for="option in sectors"
          :value="option.sectorID"
          :key="option.sectorID"
        >
          {{ option.sector }}
        </option>
      </b-select>
    </b-field>

    <div>
      <div class="card" v-for="(item, index) in categories" :key="index">
        <header class="card-header">
          ID: <strong> {{ item.typeID }}</strong>
          <strong>{{ item.type }}</strong>
        </header>
        <div class="card-content">
          <div class="content">
            DISPONIBLE <strong> {{ item.available }}</strong>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">VER</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'today',
  data() {
    return {
      dateLocal: new Date().toISOString().split('T')[0],
      cities: [],
      beaches: [],
      sectors: [],
      categories: [],
      cityLocal: null,
      beachLocal: null,
      sectorLocal: null,
    };
  },
  async mounted() {
    this.cities = await this.getCities();
  },

  methods: {
    ...mapActions('worksStore', [
      'getCities',
      'getBeaches',
      'getSectors',
      'getCategories',
    ]),

    async getBeachesFunc() {
      try {
        this.beaches = await this.getBeaches(this.cityLocal);
      } catch (error) {
        console.log(error);
      }
    },

    async getSectorsFunc() {
      try {
        this.sectors = await this.getSectors({
          cityID: this.cityLocal,
          beachID: this.beachLocal,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getCategoriesFunc() {
      try {
        this.categories = await this.getCategories({
          cityID: this.cityLocal,
          beachID: this.beachLocal,
          sectorID: this.sectorLocal,
          date: this.date,
        });
        console.log(this.categories);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
