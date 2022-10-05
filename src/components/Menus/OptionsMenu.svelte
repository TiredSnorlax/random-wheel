<script lang="ts">
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";
  import type { ISectorItem, ISectorParams } from "../../interfaces";
  export let sectorList: ISectorItem[];

  export let addSector: (newOption: string) => void;
  export let removeSector: (index: number) => void;

  let animationDuration = 600;
  let animationDelay = animationDuration + 100;

  let isClosed = false;

  let newOptionList: string[] = [""];

  const addOption = () => {
    addSector(newOptionList[0]);
    newOptionList[0] = "";
    setTimeout(() => {}, animationDelay);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && newOptionList[0]) {
      addOption();
    }
  }

</script>

<div class="container">
  <div class="addOptionContainer">
    <h3>New Option</h3>
    <div>
      {#each newOptionList as _ (sectorList.length)}
        <div transition:scale animate:flip class="optionItem">
          <p>{sectorList.length + 1}.</p>
          <div>
            <input type="text" bind:value={newOptionList[0]} on:keydown={onKeyDown} />
          </div>
        </div>
      {/each}
      <button disabled={!newOptionList[0]} on:click={addOption}>Add</button>
    </div>
  </div>
  <h2>
    <span
      class="material-icons"
      style={`transform: rotate(${
        isClosed ? "0" : "180"
      }deg); transition:0.3s;`}
      on:click={() => (isClosed = !isClosed)}
    >
      expand_more
    </span>
  </h2>
  <div class="optionList">
    {#if !isClosed}
      {#each [...sectorList].reverse() as { params: { title }, id }, i (id)}
        <div transition:scale animate:flip class="optionItem">
          <p>{sectorList.length - i}.</p>
          <div>
            <input type="text" bind:value={title} />
            <span />
          </div>
          <button on:click={() => removeSector(sectorList.length - i - 1)}
            ><span class="material-icons"> close </span></button
          >
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  button {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
  }
  h2,
  h3 {
    text-align: center;
    padding: 1rem;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .addOptionContainer {
    width: 100%;
  }

  .addOptionContainer > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
  }

  .addOptionContainer button {
    color: rgb(0, 217, 255);
    padding: 0.5rem;
  }

  .addOptionContainer input {
    width: 100%;
  }

  .addOptionContainer button:disabled {
    color: grey;
  }

  .optionList {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    transition: 0.5s;
    width: 100%;
  }

  .optionItem {
    width: 100%;
    max-width: 300px;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: rgb(220, 220, 220);
    border-radius: 1rem;

    color: black;
  }

  .optionItem > div {
    position: relative;
    width: 100%;
  }

  .optionItem > div > span {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .optionItem span::after {
    content: "";
    width: 0;
    height: 2px;

    background: blue;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    transition: 0.5s;
  }

  .optionItem input:focus + span::after {
    width: 100%;
  }

  .optionItem input {
    margin: 0;
    padding: 0.5rem;
    position: relative;
    background: none;
    outline: none;
    border: none;

    z-index: 2;
  }

  .optionItem button {
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
  }

  .optionItem button:hover {
    color: red;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .addOptionContainer > div {
      gap: 0;
    }
  }

</style>
