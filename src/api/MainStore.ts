import { defineStore } from "pinia";
import axios from "axios";
import * as Sys from "@/molecules/types";

export const API_URL: string = "http://localhost:8080/api/";
// Add measures to this array to fetch them from the API
export const MEASURES: string[] = [
  "SYS21M1", "SYS21M3", "SYS21M6",
  "SYS223M5", "SYS223M9", "SYS223M13",
  "SYS223M14", "SYS223M18", "SYS223M19"
];

export const useMainStore = defineStore('main', {
  state: () => ({
    measures: [] as Sys.Measure[],
    loadingMessage: "Loading measures..."
  }),
  getters: {
    getMeasures(state): Sys.Measure[] {
      return state.measures
    },
    getLoadedMeasures(state): number {
      return state.measures.length
    },
    getAmountOfMeasures(): number {
      return MEASURES.length
    }
  },
  actions: {
    async fetchMeasures() {
      this.measures = [];

      for (const measure of MEASURES) {
        await this.setMeasure(measure);
        if (Object.keys((this as any)[measure]).length > 0) this.measures.push((this as any)[measure]);
      }
    },
    async setMeasure(measureName: string) {
      try {
        this.loadingMessage = `Loading ${measureName}`;
        const response = await axios.get(API_URL + measureName, {});
        (this as any)[measureName] = response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
      }
    }
  }
})
