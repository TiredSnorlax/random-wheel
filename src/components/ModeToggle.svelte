<script lang="ts">
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";


  export let toggleDarkMode: () => void;
  export let darkMode: boolean;
</script>

<div on:click={toggleDarkMode} class:dark={darkMode} >
  {#if darkMode}
    <span in:scale={{}} out:scale class="material-icons"> light_mode </span>
  {:else}
    <span in:scale={{}} out:scale class="material-icons"> dark_mode </span>
  {/if}
</div>

<style>
    div {
        position: absolute;
        top: 2rem;
        right: 2rem;
        color: blue;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
    }

    .dark {
        color: yellow;
    }

    span {
        position: absolute;
        font-size: 2rem;
    }

</style>
