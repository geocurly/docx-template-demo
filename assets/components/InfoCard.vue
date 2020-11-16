<script>
    import TemplateCard from "./TemplateCard";
    export default {
        name: "InfoCard",
        extends: TemplateCard,
        computed: {
            content: function() {
                return JSON.stringify(this.$store.getters.ast, null, 2);
            }
        },
        data: () => ({
           title: "Abstract Syntax Tree"
        }),
    }
</script>

<style scoped>

</style>