<script>
import $ from 'jquery';

export default {
    data() {
        return {
            movie_id: '',
            apiKey: '1ec227d026a02bc585507b3d8387bd6d',
            imgRoute: 'https://image.tmdb.org/t/p/original/',
            movie_total_info: null,
        };
    },
    methods: {
        hola() {
            console.log(this.movie_total_info);
        },
    },
    mounted() {
        let id_movie = localStorage.getItem('movie');
        this.movie_id = id_movie;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        // Get para info total de la pelicula recibida por ID
        fetch(
            `https://api.themoviedb.org/3/movie/${this.movie_id}?api_key=${this.apiKey}&language=es-MX`,
            requestOptions
        )
            .then((response) => response.json())
            .then((resultado) => (this.movie_total_info = resultado))
            .catch((error) => console.log('error', error));


    },
};
</script>

<template>
    <header class="block">
        <img
            src="../../src/images/samurai.png"
            alt="Logo Samurai"
            class="Logo"
        />
    </header>
    <div class="section container">
        <div class="first-row">
            <!-- <img
                v-bind:src="imgRoute +  movie_total_info.backdrop_path"
                alt="posther image"
                class="d-block w-100"
            /> -->
            <!-- <p>{{}}</p> -->
        </div>
        <div class="second-row"></div>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background-color: #22272e;
}
.Logo {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-58%);
}

// Header animations
.block {
    position: relative;
    margin: -50px auto 0;
    width: 100%;
    height: 250px;
    background: linear-gradient(0deg, #22272e, #272727);
}

.block:before,
.block:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    background: linear-gradient(
        45deg,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #ff0000,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #ff0000
    );
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
}

@keyframes steam {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 400% 0;
    }
    100% {
        background-position: 0 0;
    }
}

.block:after {
    filter: blur(50px);
}

.container {
    margin-top: 100px;
}

.first-row {
    position: relative;
    z-index: 0;
    border-radius: 10px;
    height: 200px;
    width: 100%;
    &::before {
        content: '';
        border-radius: 10px;
        position: absolute;
        z-index: 1;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#d3d3d3, 0.9);
    }
}
</style>
