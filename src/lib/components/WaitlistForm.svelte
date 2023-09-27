<script lang="ts">
    import {storyblokEditable, StoryblokComponent} from "@storyblok/svelte";

    let valid_form = false;
    let form       = {
        first_name: {
            value   : "",
            error   : "",
            required: true
        },
        last_name: {
            value   : "",
            error   : "",
            required: true
        },
        email: {
            value   : "",
            error   : "",
            required: true
        },
        terms: {
            value   : false,
            error   : "",
            required: true
        }
    };

    const resetErrors = () => {
        ['first_name', 'last_name', 'email', 'terms'].forEach(key => {
            form[key as keyof typeof form].error = '';
        })
    }

    let submission_status = {
        submitting   : false,
        submitted    : false,
        success      : false
    };

    $: {
        valid_form = form.first_name.value.trim().length > 0
            && form.last_name.value.trim().length > 0
            && form.email.value.trim().length > 0
            && form.terms.value;
    }

    const handleSubmit = async (event: Event) => {
        resetErrors();
        submission_status.submitting = true;
        submission_status.submitted  = false;

        const data = {
            first_name: form.first_name.value,
            last_name : form.last_name.value,
            email     : form.email.value,
            terms     : form.terms.value
        }

        const response = await fetch('/api/forms/waitlist', {
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

    export let blok: StoryblokComponent;
</script>

{#key blok}
    <div
        use:storyblokEditable={blok}
        class = "min-h-[inherit] h-full py-9 md:py-20 pl-5 pr-5 md:pl-8 md:pr-8 lg:pl-20 lg:pr-0"
        id    = "waitlist-form-section"
    >
        <h2 class="text-4xl lg:text-[42px] text-white max-w-[920px] font-header font-bold">{blok.title}</h2>
        <div class="flex flex-col md:flex-row">
            <div class="z-10 w-full pt-12 max-w-[600px]">
                <form class="text-white font-bold flex flex-col gap-12" on:submit|preventDefault={handleSubmit}>
                    <div class="flex flex-col">
                        <input
                            bind:value  = {form.first_name.value}
                            type        = "text"
                            class       = "text-xl lg:text-2xl bg-transparent border-t-0 border-l-0 border-r-0 border-white/60 py-2 placeholder:text-white/70 focus:outline-0 focus:ring-0 focus:border-white transition-all duration-200 ease-in-out"
                            placeholder = "First name"
                            required    = {form.first_name.required}
                            disabled    = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                        >
                        <span
                            class        = "text-sm text-white/80 mt-1 block"
                            class:hidden = {form.first_name.error.length === 0}
                        >{form.first_name.error}</span>
                    </div>
                    <div class="flex flex-col">
                        <input
                            bind:value  = {form.last_name.value}
                            type        = "text"
                            class       = "text-xl lg:text-2xl bg-transparent border-t-0 border-l-0 border-r-0 border-white/60 py-2 placeholder:text-white/70 focus:outline-0 focus:ring-0 focus:border-white transition-all duration-200 ease-in-out"
                            placeholder = "Last name"
                            required    = {form.last_name.required}
                            disabled    = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                        >
                        <span
                            class        = "text-sm text-white/80 mt-1 block"
                            class:hidden = {form.last_name.error.length === 0}
                        >{form.last_name.error}</span>
                    </div>
                    <div class="flex flex-col">
                        <input
                            bind:value  = {form.email.value}
                            type        = "email"
                            class       = "text-xl lg:text-2xl bg-transparent border-t-0 border-l-0 border-r-0 border-white/60 py-2 placeholder:text-white/70 focus:outline-0 focus:ring-0 focus:border-white transition-all duration-200 ease-in-out"
                            placeholder = "Email"
                            required    = {form.email.required}
                            disabled    = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                        >
                        <span
                            class        = "text-sm text-white/80 mt-1 block"
                            class:hidden = {form.email.error.length === 0}
                        >{form.email.error}</span>
                    </div>
                    <div>
                        <div class="flex gap-4">
                            <input
                                bind:checked = {form.terms.value}
                                id           = "terms"
                                type         = "checkbox"
                                class        = "shrink-0 border bg-transparent text-transparent border-white h-5 w-5 rounded checked:border-white focus:outline-0 focus:hover:border-transparent checked:hover:border-white focus:ring-0 transition-all"
                                required     = {form.terms.required}
                                disabled     = {submission_status.submitting || (submission_status.submitted && submission_status.success)}
                            >
                            <label
                                for   = "terms"
                                class = "text-white text-sm lg:text-base font-normal leading-normal"
                            >{blok.terms}</label>
                        </div>
                        <span
                            class        = "text-sm text-white/80 mt-1 block"
                            class:hidden = {form.terms.error.length === 0}
                        >{form.terms.error}</span>
                    </div>
                    <div>
                        {#if (submission_status.submitted && submission_status.success)}
                            <div class="max-w-[350px] text-white text-xl lg:text-2xl font-bold">Thank you for signing up! We'll be in touch soon.</div>
                        {:else}
                            <button
                                class    = "btn bg-secondary-gradient drop-shadow-lg disabled:drop-shadow-none transition-all duration-300"
                                disabled = {!valid_form || submission_status.submitting}
                            >{submission_status.submitting ? '...submitting' : blok.submitButtonTitle}</button>
                        {/if}
                    </div>
                </form>
            </div>
            <div class="z-0 flex-1 relative">
                {#if blok.image.filename}
                    <img
                        src   = {blok.image.filename}
                        alt   = "Trees"
                        class = "w-full h-full object-cover object-center md:absolute overflow-visible -scale-x-100 -top-[10%]"
                    />
                {/if}
            </div>
        </div>
    </div>
{/key}
