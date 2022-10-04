<script lang="ts">
  import OptionsMenu from "./components/Menus/OptionsMenu.svelte";
  import Wheel from "./components/Wheel/Wheel.svelte";
  import ResultsMenu from "./components/Menus/ResultsMenu.svelte";
  import type { ISectorItem, ISectorParams } from "./interfaces";
  import PresetMenu from "./components/Menus/PresetMenu.svelte";
  import { onMount } from "svelte";
  import ModeToggle from "./components/ModeToggle.svelte";

  let picked: number[] = [];

  let presetMenuOpen = false;

  const COLORS = ["red", "blue", "green", "yellow", "purple", "pink"];

  let darkMode = false;

  let sectorList: ISectorItem[] = [
    {
      params: {
        title: "first",
        angle: 180,
        rotation: 0,
        color: "rgb(255, 0, 0)",
      },
      id: 0,
    },
    {
      params: {
        title: "second",
        angle: 180,
        rotation: 180,
        color: "rgb(0, 0, 255)",
      },
      id: 1,
    },
  ];
  const calculateSectors = (_sectorList: ISectorItem[]) => {
    const newAngle = 360 / _sectorList.length;
    _sectorList.map((_, i) => {
      let sector = [..._sectorList][i];
      sector.params.angle = newAngle;
      sector.params.rotation = i * newAngle;
      sector.id = i;
    });

    return _sectorList;
  };

  const addSector = (newOption: string) => {
    let _sectorList = [
      ...sectorList,
      {
        params: {
          title: newOption,
          angle: 0,
          rotation: 0,
          color: COLORS[sectorList.length % COLORS.length],
        },
        id: sectorList.length + 1,
      },
    ];
    sectorList = [...calculateSectors(_sectorList)];
    newOption = "";
  };

  const removeSector = (index: number) => {
    sectorList = calculateSectors(sectorList.filter((_, i) => index !== i));
  };

  const toggleDarkMode = () => {
    window.document.body.classList.toggle("dark");
    darkMode = !darkMode;
  };

  onMount(() => {
    toggleDarkMode();
  });
</script>

<svelte:head
  ><link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</svelte:head>
<main>
  <ModeToggle {darkMode} {toggleDarkMode} />
  <h1>Random Picker</h1>
  <Wheel {sectorList} CENTER={115} STROKE_WIDTH={5} bind:picked />
  <button
    class="presetToggleBtn"
    on:click={() => (presetMenuOpen = !presetMenuOpen)}>Load Presets</button
  >
  <OptionsMenu bind:sectorList {addSector} {removeSector} />
  {#if typeof picked[0] === "number"}
    <ResultsMenu bind:picked {sectorList} {removeSector} {darkMode} />
  {/if}
  {#if presetMenuOpen}
    <PresetMenu bind:presetMenuOpen bind:sectorList {addSector} {darkMode} />
  {/if}
</main>

<style>
  :global(:root) {
    --darkModeBg: rgb(50, 50, 50);
  }

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: white;
    transition: 0.3s;
  }

  :global(body.dark) {
    background: var(--darkModeBg);
  }

  :global(body p) {
    color: black;
  }

  :global(body.dark > *) {
    color: white;
  }

  main {
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin-top: 1rem;
  }

  .presetToggleBtn {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;

    background: rgb(122, 122, 247);
    color: white;

    cursor: pointer;
  }

  .presetToggleBtn:hover {
    background: blue;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
