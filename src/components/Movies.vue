<script>
export default {
    data() {
        return {
            movies: null,
            apiKey: '1ec227d026a02bc585507b3d8387bd6d', //v3 auth
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
            .then((result) => this.movies = result)
            .catch((error) => console.log('error', error));
    },
};
</script>

<template>
    <ul v-for="movie in movies">
        <li>{{movie}}</li>
    </ul>
    <p>{{ apiKey }}</p>
</template>

<style scoped></style>
