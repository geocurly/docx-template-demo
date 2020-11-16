<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title>DocxTemplate</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn href="https://github.com/geocurly/docx-template" target="_blank">
                github
                <v-icon right medium>mdi-github-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="6">
                        <code-card/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <info-card/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <v-footer app>
            <div class="email">geocurly@gmail.com</div>
        </v-footer>
    </v-app>
</template>

<script>
import CodeCard from "../components/CodeCard";
import InfoCard from "../components/InfoCard";
export default {
    name: "App",
    components: {InfoCard, CodeCard},
}
</script>

<style scoped>
    .email {
        color: #777777;
    }
</style>