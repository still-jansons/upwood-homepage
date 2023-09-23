<script lang="ts">
    import { storyblokEditable, StoryblokComponent } from "@storyblok/svelte";

    export let blok: StoryblokComponent;
</script>

<script context="module">
    export const prerender = true;
</script>

{#key blok}
    <div
        use:storyblokEditable = {blok}
        class                 = "relative min-h-screen flex flex-col justify-center items-center pt-32 pb-12 lg:py-24 gap-12 lg:gap-7 px-5 md:px-8 lg:px-10"
    >
        <div>
            <h1 class="text-4xl lg:text-[42px] leading-[52px] text-primary-gradient font-header font-bold">{blok.title}</h1>
        </div>
        <div class="rounded-3xl bg-primary-gradient py-9 px-10 drop-shadow-lg max-w-[640px]">
            <form name="test" method="POST" netlify netlify-honeypot="bot-field" class="flex items-center flex-wrap gap-6">
                <input type="hidden" name="form-name" value="test" />
                <div class="flex-1">
                    <label class="text-lg leading-5 font-bold">
                        Name
                        <input type="text" name="name" class="w-full p-6 border-[#EFF2F6] rounded-lg mt-3 text-black placeholder:text-black/50" placeholder="John Carter"/>
                    </label>
                </div>
                <div class="min-w-full md:min-w-fit flex-1">
                    <label class="text-lg leading-5 font-bold">
                        E-mail
                        <input type="email" name="email" class="block w-full p-6 border-[#EFF2F6] rounded-lg mt-3 text-black placeholder:text-black/50" placeholder="example@email.com"/>
                    </label>

                </div>
                <div class="min-w-full flex-1">
                    <label class="w-full flex-1 text-lg leading-5 font-bold">
                        Message
                        <textarea name="message" class="block w-full p-6 border-[#EFF2F6] rounded-lg mt-3 text-black placeholder:text-black/50" placeholder="Type here..."></textarea>
                    </label>
                </div>
                <div class="ml-auto">
                    <button type="submit" class="bg-white text-black font-bold rounded-md px-7 py-4 text-base leading-4 uppercase min-w-[130px]">Send</button>
                </div>
            </form>
        </div>
    </div>
{/key}
