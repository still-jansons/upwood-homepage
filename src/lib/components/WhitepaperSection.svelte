<script lang="ts">
    import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";
    import { renderRichText } from "@storyblok/svelte";

    let articleHTML: string;
    // let headings   : string[] = [];
    // $: {
    //     let heading_index = 1;
    //     let subheading_index = 1;
    //     headings = blok.content.content.filter((item: any) => item.type === "heading").map((item: any) => {
    //
    //     });
    //     console.log(headings);
    //     articleHTML = renderRichText(blok.content);
    // }

    export let blok: any;
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="max-w-2xl mx-auto pt-28 pb-10 lg:py-32 px-5 md:px-8">
        <div class="flex flex-col gap-6 mb-6">
            <h1 class="text-4xl lg:text-[42px] leading-[52px] text-primary-gradient font-header font-bold">{blok.title}</h1>
            <p class="text-base lg:text-[18px] leading-[28px] text-primary font-bold">{blok.subtitle}</p>
        </div>
        <div class="prose lg:prose-lg prose-p:my-4 prose-hr:my-6 prose-a:text-primary-gradient prose-blockquote:not-italic prose-blockquote:py-5 prose-blockquote:border-l-[#9BDEB4] prose-blockquote:bg-[#D9E9DF] prose-blockquote:px-7">{@html articleHTML}</div>
    </div>
{/key}
