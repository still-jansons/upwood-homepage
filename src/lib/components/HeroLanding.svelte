<script lang="ts">
    import {StoryblokComponent, storyblokEditable} from "@storyblok/svelte";

    export let blok: StoryblokComponent;

    console.log(blok);
</script>

{#key blok}
    <div
        use:storyblokEditable = {blok}
        class                 = "min-h-[inherit] h-full flex items-center md:pl-8 lg:pl-20"
    >
        <div class="flex flex-col gap-12 justify-center w-full lg:max-w-[540px] min-w-[360px] lg:min-w-0 pt-32 md:pt-20 pb-20">
            <div class="flex flex-col gap-6">
                <h1 class="text-[59px] leading-[58px] lg:text-[68px] lg:leading-[68px] font-bold font-header text-primary-gradient px-5 md:px-0">{blok.title}</h1>
                {#if blok.image.filename}
                    <div class="block md:hidden mx-auto max-w-[500px]">
                        <img src={blok.image.filename} alt={blok.image.alt} class="w-full h-auto object-contain"/>
                    </div>
                {/if}
                <p class="max-w-[540px] md:max-w-full text-xl lg:text-2xl font-bold px-5 md:px-0">{blok.subtitle}</p>
                <div class="flex px-5 md:px-0">
                    {#each blok.buttons as button}
                        <StoryblokComponent blok={button}/>
                    {/each}
                </div>
            </div>
            {#if blok.show_whitepaper_button}
                <a
                    href  = {blok.whitepaper_button_link.cached_url || '#'}
                    class = "uppercase text-2xl inline-flex items-center gap-9 pl-4 border w-fit rounded-xl bg-secondary-gradient drop-shadow-xl mx-5 md:mx-0"
                >
                    <span class="max-w-[160px] text-green-600">{blok.whitepaper_button_title}</span>
                    <img src="/images/files.svg" alt="Document icon"/>
                </a>
            {/if}
        </div>
        <div class="hidden md:block pt-20">
            {#if blok.image.filename}
                <img src={blok.image.filename} alt={blok.image.alt} class="w-full h-auto object-contain"/>
            {/if}
        </div>
    </div>
{/key}
