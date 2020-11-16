<template>
    <v-card :loading="loading" class="mx-auto my-4" height="auto" width="auto" min-height="400px">
        <template slot="progress">
            <v-progress-linear indeterminate/>
        </template>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <pre :contenteditable="editable" ref="pre">{{content}}</pre>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "TemplateCard",
        data: () => ({
            loading: false,
            editable: false,
            title: '',
        }),
    }
</script>

<style scoped lang="scss">
</style>