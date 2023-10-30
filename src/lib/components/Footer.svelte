<script lang="ts">
    export let config: {
        facebookUrl : string
        linkedInUrl : string
        telegramUrl : string
        instagramUrl: string
    };

    $: socials = [
        {
            name: 'facebook',
            icon: '/images/facebook.svg',
            url : config.facebookUrl
        },
        {
            name: 'linkedIn',
            icon: '/images/linkedin.svg',
            url : config.linkedInUrl
        },
        {
            name: 'telegram',
            icon: '/images/telegram.svg',
            url : config.telegramUrl
        },
        {
            name: 'instagram',
            icon: '/images/instagram.svg',
            url : config.instagramUrl
        }
    ];
</script>

<div class="py-12 lg:py-8 px-5 md:px-10 lg:px-20 bg-dark-gradient flex flex-col items-center gap-8">
    <img src="/images/upwood-white.svg" alt="upwood logo" height="32" width="140" class="h-8">
    <div class="flex items-center gap-10">
        {#each socials as social}
            {#if social.url}
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <img src={social.icon} alt={social.name} height="40" width="40" class="h-10">
                </a>
            {/if}
        {/each}
    </div>
    <div class="flex flex-col items-center md:flex-row gap-6 md:gap-4 text-base leading-[18px] font-bold">
        <p class="order-3 md:order-1 opacity-50">© All Rights Reserved 2023</p>
        <span class="order-2 h-1 w-1 bg-white rounded-full opacity-30 hidden md:block"></span>
        <a data-sveltekit-reload href="/privacy-policy" class="order-1 md:order-3">Privacy policy</a>
    </div>
    <div class="flex justify-center items-center opacity-30">
        <p class="font-normal">SIA “Upwood” </p>
        <span class="mx-2.5">|</span>
        <p class="font-normal">Reg. No. 4445554465</p>
    </div>
</div>
