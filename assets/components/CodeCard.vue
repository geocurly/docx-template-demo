<script>
    import TemplateCard from "./TemplateCard";
    export default {
        name: "CodeCard",
        extends: TemplateCard,
        components: {TemplateCard},
        mounted() {
            this.$store.dispatch('change', this.content);

            const self = this;
            this.$refs.pre.addEventListener(
                "input",
                function() {
                    self.$store.dispatch('change', this.innerHTML);
                }
            );
        },
        data: () => ({
            content: '${ \n\tdocx-template ? \n\tdocx-template | parse(`OpenXMLDocument`) : \n\tsaySorry( `:(` )\n}\n',
            title: "Template",
            editable: true,
        }),
    }
</script>

<style scoped>

</style>