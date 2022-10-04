<script lang="ts">
  import { fade, fly, scale, slide } from "svelte/transition";
  import { onMount } from "svelte";
  import type { IPresets, ISectorItem } from "../../interfaces";
  import { presets } from "./presets";

  export let presetMenuOpen: boolean;
  export let sectorList: ISectorItem[];
  export let addSector: (newOption: string) => void;

  export let darkMode:boolean;

  let allPresets = presets;
  let selected = -1;

  let currentPage = 0;
  let newTitle = "";

  const setSelected = (index: number) => {
    if (selected === index) {
      selected = -1;
    } else {
      selected = index;
    }
  };

  const importPreset = () => {
    if (selected < 0) return;
    sectorList = [];
    presetMenuOpen = false;
    setTimeout(() => {
      allPresets[selected].paramTitles.map((title) => addSector(title));
    }, 1200);
  };

  const addNewPreset = () => {
    const savedPresets = loadPresets();

    const paramTitles = sectorList.map((sector) => sector.params.title);

    let _presets: IPresets[] = [];

    if (savedPresets) {
      _presets = [...savedPresets];
    }
    _presets.push({ title: newTitle, paramTitles, id: _presets.length });

    window.localStorage.setItem("presets", JSON.stringify(_presets));

    _presets.push(...presets);

    allPresets = _presets;

    currentPage = 0;
  };

  const loadPresets = () => {
    const existingPresets = window.localStorage.getItem("presets");
    if (existingPresets) {
      return JSON.parse(existingPresets);
    }
    return null;
  };

  onMount(() => {
    const storedPresets = loadPresets();
    if (!storedPresets) return;
    allPresets = [...allPresets, ...storedPresets];
    console.log(allPresets);
  });
</script>

<div class="container" transition:fade>
  <div class="menu" class:dark={darkMode} transition:scale>
    <button class="closeBtn" on:click={() => (presetMenuOpen = false)}
      ><span class="material-icons"> close </span></button
    >
    <div class="offset" style={`margin-left: -${currentPage * 100}% `} />
    <div class="page">
      <h2>Presets</h2>
      <div class="presetItems">
        {#each allPresets as { title, paramTitles, id }, i (id)}
          <div class="presetItem" on:click={() => setSelected(i)}>
            <h3>{i + 1}. {title}</h3>
            {#if selected === i}
              {#each paramTitles as paramTitle}
                <p transition:slide>{paramTitle}</p>
              {/each}
            {/if}
          </div>
        {/each}
      </div>
      <button class="newBtn" on:click={() => (currentPage = 1)}
        ><div><span class="material-icons"> add </span></div>
        <p>New</p></button
      >
      <button on:click={importPreset} disabled={selected < 0} class="importBtn"
        >Import</button
      >
    </div>
    <div class="page">
      <h2>New preset</h2>
      <p>Save current options as a preset</p>
      <input type="text" placeholder="Title..." bind:value={newTitle} />
      <button on:click={addNewPreset} disabled={!newTitle}>Save</button>
    </div>
  </div>
</div>

<style>
  h2 {
    font-size: 1.8rem;
  }

  button {
    background: none;
    border: none;
    outline: none;
    color: grey;
  }
  .container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .menu {
    width: 100%;
    margin: 1rem;
    max-width: 300px;
    max-height: 600px;
    overflow: hidden;

    display: flex;
    position: relative;

    border-radius: 1rem;
    background: white;
  }

  .menu.dark {
    background: var(--darkModeBg);
    color: white !important;
    text-align: center;
  }


  .offset {
    width: 0;
    height: 0;
    transition: 0.5s;
  }

  .page {
    padding: 3rem;
    padding-bottom: 1rem;

    width: 100%;
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    position: relative;
  }

  .newBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border-radius: 2rem;
    padding: 0.5rem 1rem;

    cursor: pointer;

    font-size: 1.2rem;
    background: rgb(230, 230, 230);
  }

  .newBtn:hover {
    background: rgb(200, 200, 200);
  }

  .newBtn > div {
    aspect-ratio: 1;
    padding: 0.5rem;
    border-radius: 50%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .closeBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;

    color: grey;
    cursor: pointer;
    z-index: 10;
  }

  .closeBtn:hover {
    color: red;
  }

  .presetItems {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    width: 100%;
  }

  .presetItem {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: rgb(230, 230, 230);
    max-width: 200px;

    cursor: pointer;
  }

  .presetItem h3 {
    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .presetItem p {
    text-align: center;
  }

  .menu.dark .presetItem h3,
  .menu.dark .presetItem p {
    color: var(--darkModeBg);
  }

  .presetItem:hover {
    background: rgb(200, 200, 200);
  }

  .importBtn {
    color: rgb(109, 109, 255);

    font-weight: bold;

    opacity: 1;

    transition: 0.3s;
  }

  button:disabled {
    opacity: 0;
  }
</style>
