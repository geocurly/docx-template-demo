<template>
    <card title="Abstract Syntax Tree" min-height="400px">
        <template v-slot:code-content>
            <code-content :editable="false" min-height="400px" :code="content"/>
        </template>
    </card>
</template>

<script>
    import formatHighlight from 'json-format-highlight';
    import CodeContent from "./CodeContent";
    import Card from "./Card";
    export default {
        name: "InfoCard",
        components: {Card, CodeContent},
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
        }
    }
</script>