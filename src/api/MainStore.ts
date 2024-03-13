import {defineStore} from "pinia";
import axios from "axios";
import * as Sys from "@/molecules/types";

export const API_URL: string = "http://localhost:8080/api/";
export const useMainStore = defineStore('main', {
  state: () => ({
    Sys21M1: {} as Sys.Sys21M1,
    Sys21M3: {} as Sys.Sys21M3,
    Sys21M6: {} as Sys.Sys21M6,
    Sys223M5: {} as Sys.Sys223M5,
    Sys223M9: {} as Sys.Sys223M9,
    Sys223M13: {} as Sys.Sys223M13,
    Sys223M14: {} as Sys.Sys223M14,
    Sys223M18: {} as Sys.Sys223M18,
    Sys223M19: {} as Sys.Sys223M19,
    measures: [] as Sys.Measure[]
  }),
  getters: {
    getMeasures(state): Sys.Measure[] {
      return state.measures
    },
    getLoadedMeasures(state): number {
      return state.measures.length
    },
    getAmountOfMeasures(): number {
      return 9
    }
  },
  actions: {
    async fetchMeasures() {
      this.measures = [];

      await this.setSys21M1();
      if (Object.keys(this.Sys21M1).length > 0) this.measures.push(this.Sys21M1);

      await this.setSys21M3();
      if (Object.keys(this.Sys21M3).length > 0) this.measures.push(this.Sys21M3);

      await this.setSys21M6();
      if (Object.keys(this.Sys21M6).length > 0) this.measures.push(this.Sys21M6);

      await this.setSys223M5();
      if (Object.keys(this.Sys223M5).length > 0) this.measures.push(this.Sys223M5);

      await this.setSys223M9();
      if (Object.keys(this.Sys223M9).length > 0) this.measures.push(this.Sys223M9);

      await this.setSys223M13();
      if (Object.keys(this.Sys223M13).length > 0) this.measures.push(this.Sys223M13);

      await this.setSys223M14();
      if (Object.keys(this.Sys223M14).length > 0) this.measures.push(this.Sys223M14);

      await this.setSys223M18();
      if (Object.keys(this.Sys223M18).length > 0) this.measures.push(this.Sys223M18);

      await this.setSys223M19();
      if (Object.keys(this.Sys223M19).length > 0) this.measures.push(this.Sys223M19);
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
    },
    async setSys223M5() {
      try {
        const response = await axios.get(API_URL + "SYS223M5", {});
        this.Sys223M5 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys223M9() {
      try {
        const response = await axios.get(API_URL + "SYS223M9", {});
        this.Sys223M9 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys223M13() {
      try {
        const response = await axios.get(API_URL + "SYS223M13", {});
        this.Sys223M13 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys223M14() {
      try {
        const response = await axios.get(API_URL + "SYS223M14", {});
        this.Sys223M14 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys223M18() {
      try {
        const response = await axios.get(API_URL + "SYS223M18", {});
        this.Sys223M18 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
    async setSys223M19() {
      try {
        const response = await axios.get(API_URL + "SYS223M19", {});
        this.Sys223M19 = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    },
  }
})
