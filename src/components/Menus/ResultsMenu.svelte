<script lang="ts">
  import { scale } from "svelte/transition";
  import type { ISectorItem } from "../../interfaces";

  export let picked: number[];
  export let sectorList: ISectorItem[];
  export let removeSector: (index: number) => void;
  export let darkMode: boolean;

  const pickedItem = sectorList[picked[0]];

  const remove = () => {
    removeSector(picked[0]);
    picked = [];
  };
</script>

<div class="container">
  <div transition:scale class="menu" class:dark={darkMode}>
    <h2>Results</h2>
    <p
      style={`border-color: ${pickedItem.params.color};color: ${pickedItem.params.color}`}
    >
      {pickedItem.params.title}
    </p>
    <div class="btnContainer">
      <button class="removeBtn" on:click={remove}>Remove</button>
      <button class="closeBtn" on:click={() => (picked = [])}>Close</button>
    </div>
  </div>
</div>

<style>
  button {
    cursor: pointer;

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
    padding: 2rem;
    padding-bottom: 1rem;
    border-radius: 1rem;

    max-width: 300px;

    background: white;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  .menu.dark {
    background: var(--darkModeBg);
  }

  .menu p {
    font-size: 1.2rem;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    border: 2px solid transparent;
    background: white;
  }

  .btnContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    margin-top: 1rem;
  }

  .removeBtn {
    background: red;
    color: white;
    border: none;
    border-radius: 0.5rem;
    outline: none;
  }

  .closeBtn {
    background: none;
    outline: none;
    border: none;
    color: grey;
  }

</style>
