<script lang="ts">
    import {StoryblokComponent, storyblokEditable} from "@storyblok/svelte";

    export let blok: StoryblokComponent;
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="relative">
        {#if blok.background !== 'null'}
            <div
                class                       = "absolute top-0 left-0 w-full h-full z-0"
                class:bg-primary-gradient   = {blok.background === 'primary'}
                class:bg-secondary-gradient = {blok.background === 'secondary'}
                style                       = "clip-path: polygon(100% 0, 100% 90%, 0 100%, 0 10%);"
            ></div>
        {/if}
        <div
            class="
                2xl:container mx-auto relative flex flex-col lg:flex-row lg:gap-16 lg:items-center
                {blok.overflowImage === 'null' && !blok.isVerticalPadding ? 'py-12' : ''}
                {blok.overflowImage === 'null' && blok.isVerticalPadding ? 'py-36 md:py-40 ' : ''}
                {blok.overflowImage === 'bottom' ? 'pt-36 md:pt-40' : ''}
                {blok.overflowImage === 'top' ? 'pb-36 md:pb-40' : ''}
            "
        >
            <div
                class="
                    flex-1 lg:max-w-[40%]
                    {blok.isTextFirst ? 'lg:order-1 px-5 md:px-8 lg:pl-20 lg:pr-0' : 'lg:order-2 px-5 md:px-8 lg:pr-20 lg:pl-0'}
                "
            >
                <div class="w-full max-w-[500px] flex flex-col gap-6 {blok.isTextFirst ? 'lg:ml-auto' : 'lg:mr-auto'}">
                    <h2
                        class                       = "text-4xl md:text-[42px] md:leading-[52px] font-header font-bold"
                        class:text-primary-gradient = {blok.titleColor === 'primary'}
                        class:text-black            = {blok.titleColor === 'dark'}
                        class:text-white            = {blok.titleColor === 'secondary'}
                    >{blok.title}</h2>
                    <p
                        class                       = "text-base leading-5"
                        class:text-primary-gradient = {blok.contentColor === 'primary'}
                        class:text-black            = {blok.contentColor === 'dark'}
                        class:text-white            = {blok.contentColor === 'secondary'}
                    >{blok.content}</p>
                    {#if blok.buttons}
                        <div>
                            {#each blok.buttons as button}
                                <StoryblokComponent blok={button} />
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
            <div
                class="
                    flex-1 w-full max-w-[80%] md:max-w-[60%] lg:max-w-[40%] aspect-square mx-auto
                    {blok.isTextFirst ? 'lg:order-2' : 'lg:order-1'}
                    {blok.overflowImage === 'bottom' ? '-mb-[25%] sm:-mb-[20%] md:-mb-[15%] lg:-mb-[10%]' : ''}
                    {blok.overflowImage === 'top' ? '-mt-[25%] sm:-mt-[20%]  md:-mt-[15%] lg:-mt-[10%]' : ''}
                "
            >
                {#if blok.image.filename}
                    <img
                        src   = {blok.image.filename}
                        alt   = {blok.image.alt}
                        class = "relative z-10 h-full max-w-full w-auto aspect-square"
                    />
                {/if}
            </div>
        </div>
    </div>
{/key}
