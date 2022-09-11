<script>
export default {
    data() {
        return {
            greeting: 'Soy adrian Ramirez',
        };
    },
};
</script>

<template>
    <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>
