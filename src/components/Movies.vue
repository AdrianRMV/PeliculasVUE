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
        var config = {
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/popular?api_key=1ec227d026a02bc585507b3d8387bd6d&language=es-MX&page=1',
            headers: {},
        };

        axios(config)
            .then(function (response) {
                // movies = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};
</script>

<template>
    <!-- <ul v-for="u in movies">
        <li>{{u}}</li>
    </ul> -->

    <p>{{apiKey}}</p>
</template>

<style scoped></style>
