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
                cast: null,
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

        // Get para obtener elenco de la pelicula por su ID

        fetch(
            `https://api.themoviedb.org/3/movie/${this.movie_id}/credits?api_key=${this.apiKey}&language=es-MX`,
            requestOptions
        )
            .then((response) => response.json())
            .then((resultado) => (this.movie_credits.cast = resultado.cast))
            .catch((error) => console.log('error', error));

        // =================================================================================================================
        // Cast scripts
        // =================================================================================================================
        var multipleCardCarousel = document.querySelector(
            '#carouselExampleControls'
        );
        if (window.matchMedia('(min-width: 768px)').matches) {
            var cardWidth = $('.carousel-item').width();
            var scrollPosition = 0;
            $('#carouselExampleControls .carousel-control-next').on(
                'click',
                function () {
                    scrollPosition += cardWidth;
                    $('.carousel-inner').animate(
                        { scrollLeft: scrollPosition },
                        600
                    );
                }
            );
            $('#carouselExampleControls .carousel-control-prev').on(
                'click',
                function () {
                    scrollPosition -= cardWidth;
                    $('.carousel-inner').animate(
                        { scrollLeft: scrollPosition },
                        600
                    );
                }
            );
        } else {
            $(multipleCardCarousel).addClass('slide');
        }
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
            <section class="container cast-container">
                <div
                    id="carouselExampleControls"
                    class="carousel"
                    data-bs-ride="carousel"
                >
                    <div class="carousel-inner">
                        <div class="carousel-item active" style="display: none">
                            <div class="card">
                                <div class="img-wrapper">
                                    <img
                                        src="..."
                                        class="d-block w-100"
                                        alt="..."
                                    />
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Card title 1</h5>
                                    <p class="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                    <a href="#" class="btn btn-primary"
                                        >Go somewhere</a
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            class="carousel-item"
                            v-for="actor in movie_credits.cast"
                        >
                            <div class="card bg-secondary bg-gradient">
                                <div class="img-wrapper">
                                    <img
                                        v-bind:src="
                                            imgRoute + actor.profile_path
                                        "
                                        alt="Actor Image"
                                        class="d-block w-100"
                                    />
                                </div>
                                <div class="card-body bg-secondary bg-gradient">
                                    <h5 class="card-title">
                                        {{ actor.name }}
                                    </h5>
                                    <p class="card-text">
                                        {{ actor.character }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                    >
                        <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                    >
                        <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
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
    padding: 100px 0px;
}

.first-row {
    position: relative;
    z-index: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 470px;
    width: 100%;
    img {
        height: 100%;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
    }
    &::before {
        content: '';
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
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

.cast-container {
    margin-top: 0px;
    padding-top: 40px;
    padding-bottom: 140px;
    background-color: #9b9999;
}

.carousel-inner {
    padding: 50px 0;
}

.card {
    margin: 0 1em;
    box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
    border: none;
    height: 350px;
}

.carousel-item {
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
}
.carousel-control-prev,
.carousel-control-next {
    background-color: #e1e1e1;
    width: 6vh;
    height: 6vh;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
}
@media (min-width: 768px) {
    .carousel-item {
        margin-right: 0;
        flex: 0 0 18%;
        display: block;
    }
    .carousel-inner {
        display: flex;
    }
}
.card .img-wrapper {
    max-width: 100%;
    height: 13em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card img {
    max-height: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
@media (max-width: 767px) {
    .card .img-wrapper {
        height: 17em;
    }
}

.card-body {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    h5 {
        font-size: 1.2em;
        font-weight: bold;
    }
    p {
        font-size: 0.7em;
        font-style: italic;
    }
}
</style>
