<template>
    <codemirror v-model="content" :options="options"/>
</template>

<script>
export default {
    name: "Content",
    data: () => ({
        options: {
            tabSize: 4,
            styleActiveLine: true,
            lineNumbers: true,
        }
    }),
    mounted() {
        return this.$store.dispatch('change', this.content);
    },
    computed: {
        content: {
            get() {
                return this.$store.getters.content;
            },
            set(content) {
                return this.$store.dispatch('change', content);
            }
        }
    },
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
</style>