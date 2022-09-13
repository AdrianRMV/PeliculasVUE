<script>
import $ from 'jquery';

export default {
    data() {
        return {
            movies: null,
            apiKey: '1ec227d026a02bc585507b3d8387bd6d',
            imgRoute: 'https://image.tmdb.org/t/p/w500/', //v3 auth
        };
    },
    methods: {
        moreInfo (movie){
            let pelicula = {
                id_pelicula: movie.id,
            }
            localStorage.setItem('movie', JSON.stringify(pelicula.id_pelicula));
            window.location.href = '../../pelicula_individual.html';
        }
    },
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

        // Cards scripts
        var multipleCardCarousel = document.querySelector(
            '#carouselExampleControls'
        );
        if (window.matchMedia('(min-width: 768px)').matches) {
            var cardWidth = $('.carousel-item').width();
            console.log(cardWidth);
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

    <section class="container">
        <div
            id="carouselExampleControls"
            class="carousel"
            data-bs-ride="carousel"
        >
            <div class="carousel-inner">
                <div class="carousel-item active" style="display: none">
                    <div class="card">
                        <div class="img-wrapper">
                            <img src="..." class="d-block w-100" alt="..." />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Card title 1</h5>
                            <p class="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-for="movie in movies">
                    <div class="card bg-secondary bg-gradient">
                        <div class="img-wrapper">
                            <img
                                v-bind:src="imgRoute + movie.poster_path"
                                alt="movie image"
                                class="d-block w-100"
                            />
                        </div>
                        <div class="card-body bg-secondary bg-gradient">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">
                                {{ movie.release_date }}
                            </p>
                            <a @click="moreInfo(movie)" class="btn btn-dark">Leer mas</a>
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
    margin-top: 168px;
    padding-bottom: 140px;
}

.card {
    margin: 0 1em;
    box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
    border: none;
    height: 400px;
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
        flex: 0 0 25%;
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
    image-rendering: pixelated;
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
        font-size: 1em;
        font-weight: bold;
    }
    p {
        font-size: 0.7em;
        font-style: italic;
    }
    a {
    }
}
</style>
