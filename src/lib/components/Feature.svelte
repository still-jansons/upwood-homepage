<script lang="ts">
    import { storyblokEditable } from "@storyblok/svelte";

    export let blok: any;
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="bg-white/20 backdrop-blur rounded-2xl p-7 max-w-[400px] shadow-xl">
        <h3 class="text-4xl lg:text-[42px] leading-[52px] text-white font-header font-bold">{blok.title}</h3>
        <p class="mt-6 text-xl lg:text-2xl leading-7">{blok.content}</p>
    </div>
{/key}

