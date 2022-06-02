interface ApiConfig {
  baseUrl: string
  apiKey: string
  originalImage: Function
}

const apiConfig: ApiConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: 'api_key=f342503e05811b9bde208a8cdbc7d3d0',
  originalImage: (imgPath?: string) => {
    if (imgPath) return `https://image.tmdb.org/t/p/original${imgPath}`
    return 'https://demofree.sirv.com/nope-not-here.jpg'
  },
}

export default apiConfig
