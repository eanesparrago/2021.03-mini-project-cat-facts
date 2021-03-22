import axios from "axios";

const BASE_URL = "https://cat-fact.herokuapp.com";

function fetchRandomCatFact(): Promise<{ data: { text: string } }> {
  return axios.get(`${BASE_URL}/facts/random`);
}

export { fetchRandomCatFact };
