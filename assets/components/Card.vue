<template>
    <v-card :loading="loading" class="mx-auto my-4" height="auto" width="auto" :min-height="minHeight">
        <template slot="progress"><v-progress-linear indeterminate/></template>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <slot name="code-content"></slot>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Card",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        minHeight: {
            type: String,
            default: "400px"
        },
        title: {
            type: String,
            default: "",
        }
    }
}
</script>