const movieDetail = (movie) => {
    return {
        id: movie.movie_id,
        title: movie.title,
        budget: movie.budget,
        homepage: movie.homePage,
        overview: movie.overview,
        popularity: movie.popularity,
        releaseDate: movie.releaseDate,
        revenue: movie.revenue,
        runtime: movie.runtime,
        movieStatus: movie.movie_status,
        tagline: movie.tagline,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count
    }
}

const movieSummary = (movie) => {
    return {
        id: movie.movie_id,
        title: movie.title,
        popularity: movie.popularity
    }
}

module.exports = { movieSummary, movieDetail };