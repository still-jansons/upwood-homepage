<script lang="ts">
    import { page } from '$app/stores';

    let currentPath: string;
    let underline  : HTMLElement;
    let linkRefs   : HTMLElement[] = [];
    let drawerOpen = false;
    let linkExist  = true;

    const links = [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'About us',
            url: '/about-us',
        },
        {
            name: 'Contacts',
            url: '/contacts',
        },
    ];

    $: {

        if (currentPath !== $page.url.pathname && linkRefs.length > 0) {
            currentPath = $page.url.pathname;
            linkExist   = links.some(link => link.url === currentPath);

            if (!drawerOpen && linkExist) {
                setUnderline();
            } else {
                drawerOpen = false;
            }

        }
    }

    const setUnderline = () => {

        drawerOpen = false;
        let activeLink: HTMLElement | undefined = linkRefs.find(link => link.getAttribute('href') === currentPath);

        if (activeLink) {
            underline.style.width = `${activeLink.offsetWidth}px`;
            underline.style.left  = `${activeLink.offsetLeft}px`;
        }
    }
</script>
<div class="sticky top-0 md:relative inset-0 z-50">
    <div class="absolute top-0 left-0 right-0 flex items-center gap-5 h-20 px-5 md:px-8 2xl:container z-50">
        <div class="z-10">
            <a href="/">
                <img alt="Upwood" class="h-8 md:h-9" src="./images/upwood.svg">
            </a>
        </div>
        <nav
            class="absolute md:relative top-20 pt-20 md:pt-0 md:top-0 left-0 right-0 md:ml-auto md:flex flex-col md:flex-row gap-9 md:gap-8 {
                !drawerOpen ? 'hidden' : 'flex'
            }"
        >
            <ul class="relative flex flex-col md:flex-row gap-9 md:gap-8 items-center">
                {#each links as link, i}
                    <li>
                        <a href         = {link.url}
                           class        = "text-[22px] leading-6 md:text-lg {link.url === currentPath ? 'underline underline-offset-8 md:no-underline' : 'no-underline'}"
                           bind:this    = {linkRefs[i]}
                        >{link.name}</a>
                    </li>
                {/each}
                <li
                    bind:this       = {underline}
                    class           = "hidden md:block h-0.5 rounded-full bg-black absolute bottom-2 transition-all ease-in-out duration-300"
                    class:invisible = {!linkExist}
                ></li>
            </ul>
            <a class="btn lg md:sm bg-primary-gradient w-max mx-auto" href="/#waitlist-form-section" type="button">Join waitlist</a>
        </nav>
        <button class="md:hidden ml-auto flex" on:click={() => (drawerOpen = !drawerOpen)}>
            {#if !drawerOpen}
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.40625 12C5.40625 11.1716 6.07782 10.5 6.90625 10.5H42.9062C43.7347 10.5 44.4062 11.1716 44.4062 12C44.4062 12.8284 43.7347 13.5 42.9062 13.5H6.90625C6.07782 13.5 5.40625 12.8284 5.40625 12ZM5.40625 24C5.40625 23.1716 6.07782 22.5 6.90625 22.5H42.9062C43.7347 22.5 44.4062 23.1716 44.4062 24C44.4062 24.8284 43.7347 25.5 42.9062 25.5H6.90625C6.07782 25.5 5.40625 24.8284 5.40625 24ZM5.40625 36C5.40625 35.1716 6.07782 34.5 6.90625 34.5H42.9062C43.7347 34.5 44.4062 35.1716 44.4062 36C44.4062 36.8284 43.7347 37.5 42.9062 37.5H6.90625C6.07782 37.5 5.40625 36.8284 5.40625 36Z" fill="url(#paint0_linear_256_1038)"/>
                    <defs>
                        <linearGradient id="paint0_linear_256_1038" x1="5.40625" y1="10.5" x2="48.4948" y2="21.5341" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#00AA81"/>
                            <stop offset="1" stop-color="#0EB400"/>
                        </linearGradient>
                    </defs>
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M36 12.0005L12 36.0005M12 12.0005L36 36.0005" stroke="url(#paint0_linear_249_795)" stroke-width="2.5" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_249_795" x1="12" y1="12.0005" x2="39.3939" y2="16.857" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#00AA81"/>
                            <stop offset="1" stop-color="#0EB400"/>
                        </linearGradient>
                    </defs>
                </svg>
            {/if}
        </button>
    </div>
    {#if drawerOpen}
        <div class="h-screen md:hidden bg-secondary-gradient absolute inset-0"></div>
    {/if}
</div>
