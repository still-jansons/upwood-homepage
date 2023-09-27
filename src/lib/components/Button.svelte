<script lang="ts">
    import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";

    export let blok: StoryblokComponent;
</script>

{#key blok}
    <a
        use:storyblokEditable       = {blok}
        type                        = "button"
        class                       = "btn uppercase shadow"
        class:sm                    = {blok.size === "small"}
        class:lg                    = {blok.size === "large"}
        class:bg-primary-gradient   = {blok.color === "primary"}
        class:bg-secondary-gradient = {blok.color === "secondary"}
        href                        = {blok.link.url.length> 0 ? blok.link.url : '#'}
    >{blok.title}</a>
{/key}
