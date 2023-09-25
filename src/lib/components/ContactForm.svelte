<script lang="ts">
    import {StoryblokComponent, storyblokEditable} from "@storyblok/svelte";
    export let blok: StoryblokComponent;

    const form = {
        name    : {
            value   : '',
            required: true,
            error   : ''
        },
        email   : {
            value   : '',
            required: true,
            error   : ''
        },
        message : {
            value   : '',
            required: true,
            error   : ''
        }
    };

    const resetErrors = () => {
        ['name', 'email', 'message'].forEach(key => {
            form[key as keyof typeof form].error = '';
        })
    }

    let submission_status = {
        submitting   : false,
        submitted    : false,
        success      : false
    };

    let valid = false;
    $: {
        valid = Object.values(form).every((field) => {
            if (field.required) {
                return field.value.length > 0;
            }

            return true;
        });
    }

    const handleSubmit = async (event: Event) => {
        resetErrors();
        submission_status.submitting = true;
        submission_status.submitted  = false;

        const data = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.value]));

        const response = await fetch('/api/forms/contact-us', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const response_data = await response.json();

        if (!response_data.success && response_data.errors) {
            response_data.errors.issues.forEach((issue: {
                path   : string[];
                message: string;
            }) => {
                form[issue.path[0] as keyof typeof form].error = issue.message;
            });
        }

        submission_status.success    = response_data.success;
        submission_status.submitted  = true;
        submission_status.submitting = false;
    }
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
            <form class="flex items-start flex-wrap gap-6" on:submit|preventDefault={handleSubmit}>
                <div class="flex-1">
                    <label class="text-lg leading-5 font-bold">
                        Full name
                        <input
                            bind:value  = {form.name.value}
                            type        = "text"
                            name        = "name"
                            class       = "w-full p-6 border-[#EFF2F6] rounded-lg mt-3 text-black placeholder:text-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder = "John Carter"
                            disabled    = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                            required    = {form.name.required}
                        />
                    </label>
                    <span
                        class        = "text-sm text-white/80 mt-1 block"
                        class:hidden = {form.name.error.length === 0}
                    >{form.name.error}</span>
                </div>
                <div class="min-w-full md:min-w-fit flex-1">
                    <label class="text-lg leading-5 font-bold">
                        E-mail
                        <input
                            bind:value  = {form.email.value}
                            type        = "email"
                            name        = "email"
                            class       = "block w-full p-6 border-[#EFF2F6] rounded-lg mt-3 text-black placeholder:text-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder = "example@email.com"
                            disabled    = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                            required    = {form.email.required}
                        />
                    </label>
                    <span
                        class        = "text-sm text-white/80 mt-1 block"
                        class:hidden = {form.email.error.length === 0}
                    >{form.email.error}</span>
                </div>
                <div class="min-w-full flex-1">
                    <label class="w-full flex-1 text-lg leading-5 font-bold">
                        Message
                        <textarea
                            bind:value  = {form.message.value}
                            name        = "message"
                            class       = "block w-full p-6 border-[#EFF2F6] rounded-lg mt-3 text-black placeholder:text-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder = "Type here..."
                            disabled    = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                            required    = {form.message.required}
                        ></textarea>
                    </label>
                    <span
                        class        = "text-sm text-white/80 mt-1 block"
                        class:hidden = {form.message.error.length === 0}
                    >{form.message.error}</span>
                </div>
                {#if (submission_status.submitted && submission_status.success)}
                    <div class="text-center text-white font-bold w-full text-xl mt-2">Thank you, we will be in touch soon!</div>
                {:else}
                    <div class="ml-auto">
                        <button
                            type     = "submit"
                            class    = "bg-white text-black font-bold rounded-md px-7 py-4 text-base leading-4 uppercase min-w-[130px] disabled:opacity-50 disabled:text-[#086200] disabled:cursor-not-allowed"
                            disabled = {submission_status.submitting || !valid}
                        >{submission_status.submitting ? '...sending' : 'send' }</button>
                    </div>
                {/if}
            </form>
        </div>
    </div>
{/key}
