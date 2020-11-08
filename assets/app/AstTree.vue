<template>
    <codemirror :code="ast" :options="options"/>
</template>

<script>
import "codemirror/mode/javascript/javascript.js";

export default {
    name: "AstTree",
    computed: {
        ast: function() {
            return JSON.stringify(this.$store.getters.ast, null, 2);
        }
    },
    data: () => ({
        options: {
            tabSize: 4,
            readOnly: true,
            mode: {
                name: "javascript",
                json: true,
                statementIndent: 2
            },
        }
    })
}
</script>

<style scoped>

</style>