<script lang="ts">
    import {storyblokEditable, StoryblokComponent} from "@storyblok/svelte";

    let valid_form = false;
    let form = {
        firstName: "",
        lastName: "",
        email: "",
        terms: false,
    };

    $: {
        valid_form = form.firstName.trim().length > 0 && form.lastName.trim().length > 0 && form.email.trim().length > 0 && form.terms;
    }

    export let blok: StoryblokComponent;
</script>

{#key blok}
    <div
        use:storyblokEditable={blok}
        class="min-h-[inherit] h-full py-9 md:py-20 pl-5 pr-5 md:pl-8 md:pr-8 lg:pl-20 lg:pr-0"
    >
        <h2 class="text-4xl lg:text-[42px] text-white max-w-[920px] font-header font-bold">{blok.title}</h2>
        <div class="flex flex-col md:flex-row">
            <div class="z-10 w-full pt-12 max-w-[600px]">
                <form class="text-white font-bold flex flex-col gap-12">
                    <div class="flex flex-col">
                        <input bind:value={form.firstName} type="text" id="firstName"
                               class="text-xl lg:text-2xl bg-transparent border-t-0 border-l-0 border-r-0 border-white/60 py-2 placeholder:text-white/70 focus:outline-0 focus:ring-0 focus:border-white transition-all duration-200 ease-in-out"
                               placeholder="First name">
                    </div>
                    <div class="flex flex-col">
                        <input bind:value={form.lastName} type="text" id="lastName"
                               class="text-xl lg:text-2xl bg-transparent border-t-0 border-l-0 border-r-0 border-white/60 py-2 placeholder:text-white/70 focus:outline-0 focus:ring-0 focus:border-white transition-all duration-200 ease-in-out"
                               placeholder="Last name">
                    </div>
                    <div class="flex flex-col">
                        <input bind:value={form.email} type="email" id="email"
                               class="text-xl lg:text-2xl bg-transparent border-t-0 border-l-0 border-r-0 border-white/60 py-2 placeholder:text-white/70 focus:outline-0 focus:ring-0 focus:border-white transition-all duration-200 ease-in-out"
                               placeholder="Email">
                    </div>
                    <div class="flex gap-4">
                        <input bind:checked={form.terms} type="checkbox" id="terms"
                               class="shrink-0 border bg-transparent text-transparent border-white h-5 w-5 rounded checked:border-white focus:outline-0 focus:hover:border-transparent checked:hover:border-white focus:ring-0 transition-all">
                        <label for="terms" class="text-white text-sm lg:text-base font-normal leading-normal">{blok.terms}</label>
                    </div>
                    <div>
                        <button
                            class="btn bg-secondary-gradient drop-shadow-lg disabled:drop-shadow-none transition-all duration-300"
                            disabled={!valid_form}>{blok.submitButtonTitle}</button>
                    </div>
                </form>
            </div>
            <div class="z-0 flex-1 relative">
                {#if blok.image.filename}
                    <img src={blok.image.filename} alt="Trees"
                         class="w-full h-full object-cover object-center md:absolute overflow-visible -scale-x-100 -top-[10%]"/>
                {/if}
            </div>
        </div>
    </div>
{/key}
