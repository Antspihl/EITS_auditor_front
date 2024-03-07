import {defineStore} from "pinia";
import axios from "axios";
import {Measure, Sys21M1, Sys223M5} from "@/molecules/types";

export const API_URL: string = "http://localhost:8080/api/";
export const useMainStore = defineStore('main', {
  state: () => ({
    Sys223M5: {} as Sys223M5,
    Sys21M1: {} as Sys21M1,
    measures: [] as Measure[],
  }),
  getters: {
    getMeasures(state): Measure[] {return state.measures},
    getSys223M5(state): Sys223M5 {return state.Sys223M5},
    getSys21M1(state): Sys21M1 {return state.Sys21M1}
  },
  actions: {
    async fetchMeasures () {
      this.measures = [];
      await this.setSys21M1();
      this.measures.push(this.Sys21M1);

      await this.setSys223M5();
      this.measures.push(this.Sys223M5);
      console.log(this.measures)
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
    }
  }
})

