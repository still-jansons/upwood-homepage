<script lang="ts">
    import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";

    export let blok: any;
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="relative py-20 px-10">
        {#if blok.backgroundImage && blok.backgroundImage.filename}
            <img
                src   = {blok.backgroundImage.filename}
                alt   = {blok.backgroundImage.alt}
                class = "inset-0 absolute h-full w-full object-cover object-center z-0"
            />
        {/if}
        <h2 class="relative text-4xl lg:text-[42px] leading-[52px] text-white max-w-[300px] md:max-w-[450px] lg:max-w-[900px] font-header font-bold text-center mx-auto mb-8 uppercase">{blok.title}</h2>
        <div class="relative flex justify-center gap-4">
            {#each blok.buttons as button}
                <StoryblokComponent blok={button} />
            {/each}
        </div>
    </div>
{/key}
