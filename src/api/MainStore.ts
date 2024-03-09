import {defineStore} from "pinia";
import axios from "axios";
import {Measure, Sys21M1, Sys21M3, Sys21M6, Sys223M5} from "@/molecules/types";

export const API_URL: string = "http://localhost:8080/api/";
export const useMainStore = defineStore('main', {
  state: () => ({
    Sys223M5: {} as Sys223M5,
    Sys21M1: {} as Sys21M1,
    Sys21M3: {} as Sys21M3,
    Sys21M6: {} as Sys21M6,
    measures: [] as Measure[]
  }),
  getters: {
    getMeasures(state): Measure[] {return state.measures},
  },
  actions: {
    async fetchMeasures () {
      this.measures = [];

      await this.setSys21M1();
      if (this.Sys21M1) this.measures.push(this.Sys21M1);

      await this.setSys223M5();
      if (this.Sys223M5) this.measures.push(this.Sys223M5)

      await this.setSys21M3();
      if (this.Sys21M3) this.measures.push(this.Sys21M3);

      await this.setSys21M6();
      if (this.Sys21M6) this.measures.push(this.Sys21M6);
    },
    async setSys223M5() {
      try {
        const response = await axios.get(API_URL + "SYS223M5", {});
        this.Sys223M5 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys21M1() {
      try {
        const response = await axios.get(API_URL + "SYS21M1", {});
        this.Sys21M1 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys21M3() {
      try {
        const response = await axios.get(API_URL + "SYS21M3", {});
        this.Sys21M3 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys21M6() {
      try {
        const response = await axios.get(API_URL + "SYS21M6", {});
        this.Sys21M6 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    }
  }
})

