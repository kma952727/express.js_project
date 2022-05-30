exports.movieDetail = (movie) => {
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

exports.movieSummary = (movie) => {
    return {
        id: movie.movie_id,
        title: movie.title,
        popularity: movie.popularity,
        overview: movie.overview
    }
}

exports.buyMovieRequest = (movieId, userId) => {
    return {
        userId: userId,
        movieId: movieId
    }
}

exports.addToCartRequest = (movieId, userId) => {
    return {
        movieId: movieId,
        userId: userId
    }
}
exports.removeAtCartRequest = (itemId, userId) => {
    return {
        itemId: Number(itemId),
        userId: userId
    }
}
