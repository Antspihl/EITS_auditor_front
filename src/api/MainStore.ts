import {defineStore} from "pinia";
import axios from "axios";
import * as Sys from "@/molecules/types";

export const API_URL: string = "http://localhost:8080/api";
// Add measures to this array to fetch them from the API
export const MEASURES: string[] = [
  "SYS21M1", "SYS21M3", "SYS21M6",
  "SYS223M5", "SYS223M9", "SYS223M13",
  "SYS223M14", "SYS223M18", "SYS223M19"
];

export const useMainStore = defineStore('main', {
  state: () => ({
    urls: [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:8082",
    ] as string[],
    urlLoadingMessages: {} as Record<string, string>,
    loadingArray: [] as string[],
    urlMeasures: {} as Record<string, Sys.Measure[]>
  }),
  getters: {},
  actions: {
    async fetchForAllUrls() {
      for (const url of this.urls) {
        if (this.loadingArray.includes(url) || this.areLoaded(url)) continue;
        await this.fetchAllMeasuresForUrl(url);
      }
    },
    fetchAllMeasuresForUrl: async function (url: string) {
      this.urlMeasures[url] = [];
      this.urlLoadingMessages[url] = `Loading measures for ${url}...`;
      this.loadingArray.push(url);
      for (const measure of MEASURES) {
        this.urlLoadingMessages[url] = `Loading ${measure}...`;
        const response = await this.fetchMeasure(measure, url + "/api");
        if (Object.keys(response).length > 0) this.urlMeasures[url].push(response);
      }
      this.loadingArray = this.loadingArray.filter((value) => value !== url);
    },

    async fetchMeasure(measureName: string, url: string = API_URL) {
      try {
        const response = await axios.get(url + "/" + measureName, {});
        return response.data;
      } catch (error) {
        console.error("Error fetching setups", error);
        return {};
      }
    },

    areLoaded(url: string) {
      if (!this.urlMeasures[url]) return false;
      return this.urlMeasures[url].length === MEASURES.length;
    },

    getLoadingMessage(url: string) {
      if (!this.urlLoadingMessages[url]) return "Waiting for other PCs...";
      return this.urlLoadingMessages[url];
    },

    getPercentage: function (url: string) {
      if (!this.urlMeasures[url]) return 0;
      return Math.round(((this.urlMeasures[url].length / MEASURES.length) * 100) * 10) / 10;
    },
  }
})
