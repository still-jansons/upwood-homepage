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
    <div class="flex flex-col items-center md:flex-row gap-3 md:gap-10 lg:gap-16 text-base leading-[18px] font-bold">
        <p class="order-2 md:order-1">© All Rights Reserved 2023</p>
        <a href="/privacy-policy" class="order-1 md:order-2">Privacy policy</a>
    </div>
</div>
