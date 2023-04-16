<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div v-if="editor">
        <button
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
        >
            bold
        </button>
        <button
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
        >
            italic
        </button>
        <button
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
        >
            strike
        </button>
        <button
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('code') }"
            @click="editor.chain().focus().toggleCode().run()"
        >
            code
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
            h1
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
            h2
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
            h3
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('heading', { level: 4 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
            h4
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
        >
            bullet list
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
        >
            ordered list
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
        >
            code block
        </button>
        <button
            :class="{ 'toolbarButton': true, 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()"
        >
            blockquote
        </button>
        <button class="toolbarButton" @click="editor.chain().focus().setHorizontalRule().run()">
            horizontal rule
        </button>
        <button class="toolbarButton" @click="editor.chain().focus().setHardBreak().run()">
            hard break
        </button>
        <button
            :disabled="!editor.can().chain().focus().undo().run()"
            class="toolbarButton"
            @click="editor.chain().focus().undo().run()"
        >
            undo
        </button>
        <button
            :disabled="!editor.can().chain().focus().redo().run()"
            class="toolbarButton"
            @click="editor.chain().focus().redo().run()"
        >
            redo
        </button>
    </div>
    <hr/>
    <div class="editorContainer">
        <editor-content :editor="editor" />
    </div>
</template>

<script>

import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image';
import { Editor, EditorContent } from "@tiptap/vue-3";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default {
    components: {
        EditorContent,
    },
    props: {
        modelValue: {
            type: String,
            required: true,
            default: `<h1>You shouldn't be seeing this!</h1>`
        }
    },
    emits: ["editorCreated", "update:modelValue"],
    data() {
        return {
            editor: null,
            storage: null,
            blogRef: null,
        };
    },
    watch: {
        modelValue(value) {
            // HTML
            const isSame = this.editor.getHTML() === value

            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
        }
    },
    mounted() {
        this.editor = new Editor({
            extensions: [StarterKit, Image],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
            editorProps: {
                handleDrop: async function (view, event, slice, moved) {
                    if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) { // if dropping external files
                        let file = event.dataTransfer.files[0]; // the dropped file
                        let filesize = ((file.size / 1024) / 1024).toFixed(4); // get the filesize in MB
                        if ((file.type === "image/jpeg" || file.type === "image/png") && filesize < 10) { // check valid image type under 10MB
                            const storage = getStorage();

                            const fileName = Math.random() + parseInt(Math.random()*10000) + file.name;
                            const imgRef = ref(storage, "blog/" + fileName);
                            await uploadBytes(imgRef, file)
                            let url = await getDownloadURL(imgRef);

                            const { schema } = view.state;
                            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                            const node = schema.nodes.image.create({ src: url }); // creates the image element
                            const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
                            return view.dispatch(transaction);
                        } else {
                            window.alert("Images need to be in jpg or png format and less than 10mb in size.");
                        }
                        return true; // handled
                    }
                    return false; // not handled use default behaviour
                }
            },
        });
        this.$emit("editorCreated", this.editor);
    },
    beforeUnmount() {
        this.editor.destroy();
    },
}

</script>

<style lang="scss">

.editorContainer {
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    div {
        display: flex;
        flex-grow: 1;
        flex-direction: column;

        .ProseMirror {
            flex-grow: 1;
            box-sizing: border-box;
            padding: 5px;
        }
    }
}


.is-active {
    background: black !important;
    color: #fff !important;
}

.toolbarButton {
    font-size: inherit !important;
    font-family: inherit !important;
    color: #000;
    margin: .1rem !important;
    border: 1px solid black !important;
    border-radius: .3rem !important;
    padding: .1rem .4rem !important;
    background: white;
    accent-color: black !important;

}
/* Basic editor styles */
.ProseMirror {
    > * + * {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0d0d0d;
        color: #fff;
        font-family: "JetBrainsMono", monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0d0d0d, 0.1);
        margin: 2rem 0;
    }
}
</style>
