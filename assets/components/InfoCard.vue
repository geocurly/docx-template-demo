<script>
    import formatHighlight from 'json-format-highlight';
    import TemplateCard from "./TemplateCard";
    export default {
        name: "InfoCard",
        extends: TemplateCard,
        computed: {
            content: function() {
                return formatHighlight(
                    this.$store.getters.ast,
                    {
                        numberColor: "#80D8FF",
                        stringColor: "#8BC34A",
                        trueColor: "#EF6C00",
                        falseColor: "#EF6C00",
                        nullColor: "#EF6C00",
                        keyColor: "#B39DDB",
                    }
                );
            }
        },
        data: () => ({
            title: "Abstract Syntax Tree",
            contentEditable: '',
        }),
    }
</script>

<style scoped>

</style>