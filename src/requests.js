const env = import.meta.env
const key = env.VITE_API_KEY

const requests = {
    requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
    requestSearchMovie: `https://api.themoviedb.org/3/search/movie?api_key=${key}`
}

export default requests