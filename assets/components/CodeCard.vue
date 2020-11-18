<script>
    import TemplateCard from "./TemplateCard";
    import docxHighlight from "../plugins/highlight";
    export default {
        name: "CodeCard",
        extends: TemplateCard,
        components: {TemplateCard},
        mounted() {
            this.content = this.getDefault();
            this.contentEditable = this.getDefault();

            const self = this;
            this.$refs.edit.addEventListener('input', function () {
                self.build(this.value);
            });

            self.build(this.content);
        },
        data: () => ({
            content: '',
            contentEditable: '',
            title: "Template",
            editable: true,
        }),
        methods: {
            getDefault() {
                return '${ \n' +
                    '\tdocx-template ? \n' +
                    '\tdocx-template | parse(`OpenXMLDocument`) : \n' +
                    '\tsaySorry( `:(` )' +
                    '\n}' +
                    '\n'
            },
            highlight(content) {
                const ast = this.$store.getters.ast;
                if (Array.isArray(ast)) {
                    this.content = docxHighlight(content, ast);
                } else {
                    this.content = content;
                }
            },
            build(content) {
                const self = this;
                this.$store.dispatch('buildAst', content).then(() => {
                    self.highlight(content);
                });
            }
        }
    }
</script>

<style scoped>

</style>