<script>
import $ from 'jquery';

export default {
    data() {
        return {
            movie_id: '',
            apiKey: '1ec227d026a02bc585507b3d8387bd6d',
            imgRoute: 'https://image.tmdb.org/t/p/original/',
            movie_total_info: {
                backdrop_path: '',
                title: '',
                release_date: '',
                overview: '',
                poster_path: '',
                tagline: '',
                annio: '',
                vote_average: '',
            },
            movie_credits: {
                cast: {},
                crew: {},
            },
        };
    },
    methods: {
        id() {
            console.log(this.movie_credits);
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
            .then(
                (resultado) => (
                    (this.movie_total_info.backdrop_path =
                        resultado.backdrop_path),
                    (this.movie_total_info.title = resultado.title),
                    (this.movie_total_info.release_date =
                        resultado.release_date),
                    (this.movie_total_info.overview = resultado.overview),
                    (this.movie_total_info.poster_path = resultado.poster_path),
                    (this.movie_total_info.tagline = resultado.tagline),
                    (this.movie_total_info.annio =
                        resultado.release_date.substring(0, 4)),
                    (this.movie_total_info.vote_average =
                        resultado.vote_average.toFixed(1))
                )
            )
            .catch((error) => console.log('error', error));
    },
    beforeMounted() {
        // Get para obtener elenco de la pelicula por su ID
        fetch(
            `https://api.themoviedb.org/3/movie/${this.movie_id}/credits?api_key=${this.apiKey}&language=es-MX`,
            requestOptions
        )
            .then((response) => response.json())
            .then(
                (resultado) => (
                    (this.movie_credits.cast = resultado.cast),
                    (this.movie_credits.crew = resultado.crew)
                )
            )
            .catch((error) => console.log('error', error));
    },
};
</script>

<template>
    <header class="block">
        <a href="/page_prinicipal.html" title="Home page">
            <img
                src="../../src/images/samurai.png"
                alt="Logo Samurai"
                class="Logo"
            />
        </a>
    </header>
    <div class="section container">
        <div class="first-row">
            <img
                v-bind:src="imgRoute + this.movie_total_info.backdrop_path"
                alt="movie backdrops"
                class="d-block w-100"
            />

            <div class="info-container">
                <h1>
                    {{ movie_total_info.title }} ({{ movie_total_info.annio }})
                </h1>
                <p class="full_date">
                    {{ movie_total_info.release_date }}
                </p>
                <div class="puntuacion">
                    <span>{{ movie_total_info.vote_average }}</span>
                </div>
                <span>Puntuacion por usuarios</span>
                <p class="tagline">{{ movie_total_info.tagline }}</p>
                <span>{{ movie_credits.cast[0].name }}</span>
                <h2>Resumen</h2>
                <p class="overview">{{ movie_total_info.overview }}</p>
            </div>

            <div class="poster_image">
                <img
                    v-bind:src="imgRoute + this.movie_total_info.poster_path"
                    alt="movie poster"
                    class="d-block w-100"
                />
            </div>
        </div>
        <div class="second-row">
            <button @click="id">Hola</button>
        </div>
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
    animation: steam 30s linear infinite;
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
    height: 470px;
    width: 100%;
    img {
        height: 100%;
        border-radius: 14px;
    }
    &::before {
        content: '';
        border-radius: 10px;
        position: absolute;
        z-index: 0;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#34345c, 0.9);
    }

    .poster_image {
        position: absolute;
        height: 284px;
        width: 228px;
        top: 78px;
        left: 52px;
        background-color: #fff;
        border-radius: 12px;

        img {
            border-radius: 7px;
            height: 100%;
        }
    }

    .info-container {
        position: absolute;
        left: 25%;
        top: 9%;
        color: #fff;
        padding-right: 25px;
    }

    .puntuacion {
        display: inline-block;
        width: max-content;
        background: #06b063;
        padding: 12px;
        border-radius: 50%;
        margin-right: 10px;
        span {
            font-weight: bold;
        }
    }

    .tagline {
        color: rgba(#fff, 0.5) !important;
        font-style: italic;
        padding-top: 5px;
    }

    h2 {
        font-size: 1.4em;
        font-weight: bold;
    }
}
</style>
