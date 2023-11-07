<script lang="ts">
    import { storyblokEditable, renderRichText } from "@storyblok/svelte";
    import {onMount} from "svelte";

    export let blok: any;

    let articleHTML  : string;
    let headings     : any[] = [];
    let expandSection: number;

    let expandSections     = false;
    let activeHeading      = 0;
    let activeSubHeading   = '';

    $: {
        let headingCount    = 0;
        let subHeadingCount = 0;

        blok.content.content.forEach((item: any) => {
            if (item.type === 'heading') {
                if (item.attrs.level > 2) {
                    return;
                }

                if (item.attrs.level === 1) {
                    subHeadingCount = 0;
                    headingCount++;

                    headings.push({
                        name: item.content.filter((content: any) => content.type === 'text')[0].text,
                        id  : `section-${headingCount}`,
                        sub : []
                    });
                } else if (item.attrs.level === 2) {
                    subHeadingCount++;
                    headings[headingCount - 1].sub.push({
                        name: item.content.filter((content: any) => content.type === 'text')[0].text,
                        id  : `section-${headingCount}-${subHeadingCount}`
                    });
                }

                const textContentIndex = item.content.findIndex((content: any) => content.type === 'text');

                if (!item.content[textContentIndex].marks) {
                    item.content[textContentIndex].marks = [];
                } else {
                    item.content[textContentIndex].marks = item.content[textContentIndex].marks.filter((mark: any) => mark.type !== 'anchor');
                }

                item.content[textContentIndex].marks.push({
                    type: 'anchor',
                    attrs: {
                        id: item.attrs.level === 1 ? `section-${headingCount}` : `section-${headingCount}-${subHeadingCount}`
                    }
                });
            }
        });
        articleHTML = renderRichText(blok.content);
    }

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeHeading    = Number(entry.target.id.split('-')[1]);
                    activeSubHeading = entry.target.id
                }
            });
        }, {
            rootMargin: '0px 0px -70% 0px'
        });

        document.querySelectorAll('span[id]').forEach((span) => {
            observer.observe(span);
        });
    });
</script>

{#key blok}
    <div use:storyblokEditable={blok} class="max-w-2xl mx-auto pt-28 pb-10 lg:py-32 px-5 md:px-8">
        <div class="fixed md:top-28 lg:top-32 right-0 w-[320px] shadow-lg transition-all {expandSections ? 'max-w-[320px] duration-500 ease-in-out' : 'max-w-[130px] delay-500'}">
            <button class="bg-green-600 h-12 flex items-center pl-4 pr-2 w-full rounded-tl rounded-bl justify-between" class:rounded-bl={!expandSections} on:click={() => (expandSections = !expandSections)}>
                <span class="text-white font-semibold text-sm">Sections</span>
                <img
                    src   = "/images/hamburger.svg"
                    alt   = "Expand sections"
                    class = "
                        absolute ml-auto h-8 transition-all ease-in-out duration-200
                        {expandSections ? '-right-8 opacity-0' : 'right-3 delay-150 opacity-100'}
                    "
                />
                <img
                    src   = "/images/cross.svg"
                    alt   = "Collapse sections"
                    class = "
                        absolute ml-auto h-8 transition-all ease-in-out duration-200
                        {expandSections ? 'right-3 delay-150 opacity-100' : '-right-8 opacity-0'}
                    "
                />
            </button>
            <ul class="h-auto overflow-auto transition-all max-w-[320px] duration-500 ease-in-out rounded-bl {expandSections ? 'max-h-[460px] delay-300' : 'max-h-0' }">
                {#each headings as heading, index (index)}
                    <li class="bg-white border-b last:border-b-0 border-gray-200">
                        {#if activeHeading !== index + 1}
                            <a href={`#${heading.id}`} on:click={() => (expandSection = expandSection === index + 1 ? 0 : index + 1)} class="text-left block py-3 px-4 text-sm font-bold {activeHeading === (index + 1) ? 'text-primary-gradient' : 'text-black'}">{heading.name}</a>
                        {:else}
                            <button on:click={() => (expandSection = expandSection === index + 1 ? 0 : index + 1)} class="text-left block py-3 px-4 text-sm font-bold {activeHeading === (index + 1) ? 'text-primary-gradient' : 'text-black'}">{heading.name}</button>
                        {/if}
                        {#if heading.sub.length > 0}
                            <ul class="transition-all ease-in-out h-full duration-300 {expandSection === (index + 1) ? 'max-h-[1000px]' : 'max-h-0 overflow-hidden'}">
                                {#each heading.sub as subHeading}
                                    <li class="relative pl-6 flex items-center">
                                        <span class="absolute left-4 h-2 w-2 rounded-full transition-all bg-primary-gradient duration-200 delay-300 {activeSubHeading === subHeading.id ? 'opacity-100' : 'opacity-0'}"></span>
                                        <a href={`#${subHeading.id}`} class="text-left block py-3 px-4 text-sm transition-colors duration-200 delay-300 {activeSubHeading === subHeading.id ? 'text-black' : 'text-black/80'}">{subHeading.name}</a>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="flex flex-col gap-6 mb-6">
            <h1 class="text-4xl lg:text-[42px] leading-[52px] text-primary-gradient font-header font-bold">{blok.title}</h1>
            <p class="text-base lg:text-[18px] leading-[28px] text-primary font-bold">{blok.subtitle}</p>
        </div>
        <div class="prose lg:prose-lg prose-p:my-4 prose-hr:my-6 prose-a:text-primary-gradient prose-blockquote:not-italic prose-blockquote:py-5 prose-blockquote:border-l-[#9BDEB4] prose-blockquote:bg-[#D9E9DF] prose-blockquote:px-7 prose-headings:scroll-mt-10">{@html articleHTML}</div>
    </div>
{/key}
