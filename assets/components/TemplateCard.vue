<template>
    <v-card :loading="loading" class="mx-auto my-4" height="auto" width="auto" min-height="400px">
        <template slot="progress">
            <v-progress-linear indeterminate/>
        </template>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <div class="card-content" :class="[editable ? 'card-content--editable' : '']">
                <textarea ref="edit" class="card-content-text" :hidden="!editable" v-model="contentEditable"/>
                <pre ref="view" class="card-content-text" v-html="content"/>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "TemplateCard",
        data: () => ({
            loading: false,
            editable: false,
        }),
        mounted() {
            if (this.editable) {
                const edit = this.$refs.edit;
                const view = this.$refs.view;
                const self = this;
                edit.addEventListener('input', function () {
                    this.style.height = view.scrollHeight + "px";
                    self.$emit('change', this.innerText);
                });

                edit.style.minHeight = "400px";
            }
        }
    }
</script>

<style>
    .card-content {
        height: auto;
        width: 100%;
        min-height: 400px;
    }

    .card-content--editable {
        background: #232323;
        border-radius: 5px;
    }

    .card-content--editable:hover {
        background: #242424;
    }

    .card-content textarea {
        color: rgba(0, 0, 0, 0) !important;
        position: absolute;
        width: 100%;
        caret-color: aqua;
        overflow: auto;
        outline: none;
        resize: none;
        z-index: 1;
    }

    .card-content pre {
        z-index: 0;
    }

    .card-content-text {
        position: relative;
        color: white;
        padding: 12px 12px;
        font-size: 16px;
        font-weight: 400;
        font-family: Roboto sans-serif;
        line-height: 1.375rem;
        letter-spacing: normal;

    }
</style>