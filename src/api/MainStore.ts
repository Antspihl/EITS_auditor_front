import {defineStore} from "pinia";
import axios from "axios";
import * as Sys from "@/molecules/types";

export const API_URL: string = "http://localhost:8080/api";

export const useMainStore = defineStore('main', {
  state: () => ({
    urls: [] as string[],
    // Add measures to these this array to add them to the selection
    allMeasures: ["SYS21M1", "SYS21M3", "SYS21M6",
      "SYS223M5", "SYS223M9", "SYS223M13",
      "SYS223M14", "SYS223M18", "SYS223M19"
    ] as string[],
    selectedMeasures: [] as string[],
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

    async fetchAllMeasuresForUrl(url: string) {
      if (this.urlMeasures[url]) return;
      this.urlMeasures[url] = [];
      this.urlLoadingMessages[url] = `Loading measures for ${url}...`;
      this.loadingArray.push(url);
      for (const measure of this.selectedMeasures) {
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

    async testURL(url: string) {
      try {
        const response = await axios.get(url + "/api", {timeout: 5000}, );
        return response.status === 200;
      } catch (error) {
        console.error("Error fetching setups", error);
        return false;
      }
    },

    areLoaded(url: string) {
      if (!this.urlMeasures[url]) return false;
      return this.urlMeasures[url].length === this.selectedMeasures.length;
    },

    getLoadingMessage(url: string) {
      if (!this.urlLoadingMessages[url]) return "Waiting for other PCs...";
      return this.urlLoadingMessages[url];
    },

    getPercentage: function (url: string) {
      if (!this.urlMeasures[url]) return 0;
      return Math.round((this.urlMeasures[url].length / this.selectedMeasures.length) * 100);
    },

  }
})
