<script>
export default {
    data() {
        return {
            movies: null,
            apiKey: '1ec227d026a02bc585507b3d8387bd6d',
            imgRoute: 'https://image.tmdb.org/t/p/w500/', //v3 auth
        };
    },
    methods: {},
    mounted() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=1ec227d026a02bc585507b3d8387bd6d&language=es-MX&page=1',
            requestOptions
        )
            .then((response) => response.json())
            .then((resultado) => (this.movies = resultado.results))
            .catch((error) => console.log('error', error));
    },
};
</script>

<template>
    <ul v-for="movie in movies">
        <li>{{ movie }}</li>
    </ul>

    <div class="movie-card" v-for="movie in movies">
        <div class="movie-card-image">
            <img v-bind:src="imgRoute + movie.poster_path" alt="" />
        </div>
        <div class="movie-info-preview">
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.release_date }}</p>
            <p>{{ movie.vote_average }}</p>
        </div>
    </div>
</template>

<style scoped>
.movie-card {
    display: flex;
    flex-direction: column;
    width: min-content;
}
.movie-card-image {
    position: relative;
}

.movie-card-image img{
    position: relative;
    border-radius: 32px;
}
</style>
