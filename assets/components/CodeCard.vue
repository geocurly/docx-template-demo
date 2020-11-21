<template>
    <card title="Template" min-height="400px">
        <template v-slot:code-content>
            <code-content :editable="true" min-height="400px" :code="content" :view="view" @change="build"/>
        </template>
    </card>
</template>

<script>
    import highlight from "../plugins/highlight/highligter";
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

<style lang="scss">
    @import "../plugins/highlight/style/theme.scss";
</style>