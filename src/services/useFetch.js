import useSWR from 'swr'
import { api } from './axios'

export function useFetch(url) {
    const { data, error } = useSWR(url, async (url) => {
        const response = await api.get(url, {
            headers: {
                Authorization: `Bearer GQvqhQJM6s3h8b9i5ua6399c44d847ff`,
            },
        })
        return response.data
    }, { refreshInterval: 10000, })

    return { data, error }
}
