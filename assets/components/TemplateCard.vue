<template>
    <v-card :loading="loading" class="mx-auto my-4" height="auto" width="auto" min-height="400px">
        <template slot="progress">
            <v-progress-linear indeterminate/>
        </template>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text class="content">
            <pre :contenteditable="editable" ref="pre"><div v-html="content"/></pre>
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

<style>
    [contenteditable] {
        outline: 0 solid transparent;
        caret-color: #E1F5FE;
        white-space: pre-wrap;
    }
</style>