<script>
    import { onMount } from "svelte";
    import { useStoryblokBridge, StoryblokComponent } from "@storyblok/svelte";

    export let data;

    const meta_title       = data.story.content.meta && data.story.content.meta.title.length > 0 ? data.story.content.meta.title : data.story.name;
    const meta_description = data.story.content.meta && data.story.content.meta.description.length > 0 ? data.story.content.meta.description : 'Socially responsible investment in highly profitable nature preservation project digital shares.';

    onMount(() => {
        if (data.story) {
            useStoryblokBridge(
                data.story.id,
                (newStory) => (data.story = newStory)
            );
        }
    });

</script>
<svelte:head>
    <title>{meta_title} | Upwood</title>
    <meta name="description" content="{meta_description}" />
</svelte:head>

{#key data.story.id}
    <div>
        {#if data.story}
            <StoryblokComponent blok={data.story.content} />
        {/if}
    </div>
{/key}
