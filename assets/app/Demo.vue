<template>
    <div class="page-container">
        <md-toolbar class="md-primary">
            <span class="md-title">
                docx-template parser
            </span>
            <div class="md-toolbar-section-end">
                <md-button @click="github">
                    github
                </md-button>
            </div>
        </md-toolbar>
        <div class="md-layout">
            <div class="md-layout-item" style="padding: 20px">
                <demo-content/>
            </div>

            <div class="md-layout-item" style="padding: 20px">
                <ast-tree/>
            </div>
        </div>
    </div>
</template>

<script>
import DemoContent from "./DemoContent.vue";
import AstTree from "./AstTree.vue";
export default {
    name: "Demo",
    components: {AstTree, DemoContent},
    data: () => ({
        repo: "https://github.com/geocurly/docx-template"
    }),
    methods: {
        github() {
            window.open(this.repo, '_blank');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>