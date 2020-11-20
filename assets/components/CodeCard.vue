<template>
    <card title="Template" min-height="400px">
        <template v-slot:code-content>
            <code-content :editable="true" min-height="400px" :code="content" :view="view" @change="build"/>
        </template>
    </card>
</template>

<script>
    import highlight from "../plugins/highlight";
    import Card from "./Card";
    import CodeContent from "./CodeContent";
    export default {
        name: "CodeCard",
        components: {CodeContent, Card},
        computed: {
            content: {
                get() {
                    return this.$store.getters.content;
                },
                set(value) {
                    this.$store.dispatch('setContent', value);
                }
            },
            view() {
                return this.$store.getters.default;
            },
            ast() {
                return this.$store.getters.ast;
            }
        },
        methods: {
            highlight(content) {
                if (Array.isArray(this.ast)) {
                    this.content = highlight(content, this.ast);
                } else {
                    this.content = content;
                }
            },
            build(content) {
                const self = this;
                this.$store.dispatch('buildAst', content).then(() => {
                    self.highlight(content);
                });
            },
        }
    }
</script>

<style>
    .highlight--str {
        color: #8BC34A;
    }
    .highlight--block {
        color: #80D8FF;
    }
    .highlight--identity {
        color: #B39DDB;
    }
    .highlight--image {
        color: #80D8FF;
    }
    .highlight--image-size {
        color: #F44336;
    }
    .highlight--call {
        color: #80D8FF;
    }
    .highlight--condition {
        color: #FFEB3B;
    }
    .highlight--escaped-block {
        color: #EF6C00;
    }
    .highlight--escaped-char {
        color: #EF6C00;
    }
    .highlight--expression {
        color: #FFEB3B;
    }
    .highlight--filter-expression {
        color: #FFEB3B;
    }
    .highlight--default {
        color: #B39DDB;
    }
</style>