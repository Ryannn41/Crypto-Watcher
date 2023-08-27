import { create } from 'zustand'
import axios from 'axios'

export const showStore = create((set) => ({

    graphData: [],
    data: null,
    
    // fix flash issue when changing pages
    reset: () => {
        set({graphData: [], data: null}) 
    },

    fetchData: async (id) => {

        const [graphRes, dataRes] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
        ])


        const graphData = graphRes.data.prices.map(price => {
            set({ data: dataRes.data })
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us")
            return {
                Date: date,
                Price: p,
            };
        })

        console.log(dataRes)

        set({ graphData })

    },
}))