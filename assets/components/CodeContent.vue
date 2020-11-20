<template>
    <div :class="['code-content', editable ? 'code-content--editable' : '']" :style="`min-height: ${minHeight}`">
        <textarea class="code-content__text" :hidden="!editable" v-model="textareaContent" ref="textarea"/>
        <pre class="code-content__text" v-html="code" ref="code"/>
    </div>
</template>

<script>
export default {
    name: "CodeContent",
    props: {
        editable: {
            type: Boolean,
            default: false,
        },
        code: {
            type: String,
            default: "",
        },
        view: {
            type: String,
            default: "",
        },
        minHeight: {
            type: String,
            default: "400px"
        }
    },
    mounted() {
        this.textareaContent = this.view;
        const textarea = this.$refs.textarea;
        const code = this.$refs.code;
        const self = this;
        textarea.addEventListener('input', function () {
            this.style.height = code.scrollHeight + "px";
            self.$emit('change', self.textareaContent);
        });

        textarea.style.minHeight = "400px";
        this.$emit('change', this.textareaContent);
    },
    data: () => ({
        textareaContent: ''
    }),
}
</script>

<style>
    .code-content {
        height: auto;
        width: 100%;
    }

    .code-content--editable {
        background: #232323;
        border-radius: 5px;
    }

    .code-content--editable:hover {
        background: #242424;
    }

    .code-content textarea {
        color: rgba(0, 0, 0, 0) !important;
        position: absolute;
        width: 100%;
        caret-color: aqua;
        overflow: auto;
        outline: none;
        resize: none;
        z-index: 1;
    }

    .code-content pre {
        z-index: 0;
    }

    .code-content__text {
        position: relative;
        color: white;
        padding: 12px 12px;
        font-size: 16px;
        font-weight: 400;
        font-family: Roboto sans-serif;
        line-height: 1.375rem;
        letter-spacing: normal;

    }
</style>