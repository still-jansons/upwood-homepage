<script lang="ts">
    import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";

    export let blok: any;
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="px-5 md:px-8 lg:px-0 pt-16 lg:pt-20">
        <h2 class="text-4xl lg:text-[42px] leading-[52px] text-white max-w-[900px] font-header font-bold text-center mx-auto">{blok.title}</h2>
        <div class="flex flex-wrap justify-center pt-12 lg:px-16 gap-12">
            {#each blok.features as feature}
                <StoryblokComponent blok={feature} />
            {/each}
        </div>
    </div>
{/key}
