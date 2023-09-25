<script lang="ts">
    import type { PageData } from './$types';

    import { onMount } from "svelte";
    import { useStoryblokBridge, StoryblokComponent } from "@storyblok/svelte";

    export let data: PageData;

    onMount(() => {
        useStoryblokBridge(
            data.story.id,
            (newStory) => (data.story = newStory)
        );
    });
</script>

<div>
    {#if data.story}
        <StoryblokComponent blok={data.story.content} />
    {/if}
</div>
