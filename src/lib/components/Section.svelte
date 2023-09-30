<script lang="ts">
    import {StoryblokComponent, storyblokEditable} from "@storyblok/svelte";

    export let blok: StoryblokComponent;
</script>

{#key blok}
    <div
        use:storyblokEditable       = {blok}
        class                       = "relative min-h-screen"
        class:bg-primary-gradient   = {blok.background === 'primary'}
        class:bg-secondary-gradient = {blok.background === 'secondary'}
        id                          = {blok.anchor}
    >
        {#if blok.backgroundImage && blok.backgroundImage.filename}
            <img
                src   = {blok.backgroundImage.filename}
                alt   = {blok.backgroundImage.alt}
                class = "absolute h-full w-full object-cover object-center z-0"
            />
        {/if}
        <div class="h-full relative min-h-[inherit] flex flex-col justify-center">
            {#each blok.body as body}
                <StoryblokComponent blok={body}/>
            {/each}
        </div>
    </div>
{/key}
