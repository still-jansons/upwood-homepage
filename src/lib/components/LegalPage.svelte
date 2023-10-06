<script lang="ts">
    import { storyblokEditable } from "@storyblok/svelte";
    import { marked } from 'marked'
    export let blok: any;

    $: updated_at = new Date(blok.updated_at);
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="max-w-2xl mx-auto pt-28 pb-10 lg:py-32 px-5 md:px-8">
        <div class="flex flex-col gap-6 mb-6">
            <h1 class="text-4xl lg:text-[42px] leading-[52px] text-primary-gradient font-header font-bold">{blok.title}</h1>
            <time class="text-base lg:text-[18px] leading-[28px] text-primary font-bold" datetime={ updated_at.toISOString() }>Last updated: { updated_at.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }) }</time>
        </div>
        <div class="prose lg:prose-lg prose-p:my-4 prose-hr:my-6 prose-a:text-primary-gradient prose-blockquote:not-italic prose-blockquote:py-5 prose-blockquote:border-l-[#9BDEB4] prose-blockquote:bg-[#D9E9DF] prose-blockquote:px-7">{@html marked(blok.content)}</div>
    </div>
{/key}
