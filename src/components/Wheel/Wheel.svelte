<script lang="ts">
  import type { ISectorParams, ISectorItem } from "../../interfaces";
  import Sector from "./Sector.svelte";

  export let sectorList: ISectorItem[];
  export let CENTER: number;
  export let STROKE_WIDTH: number;

  export let picked: number[] = [];

  const SPIN_DURATION = 3;

  let currentRotation = 0;
  let rotation = 0;
  let spinning = false;

  const pickOption = () => {
    const _randomAngle = Math.random() * 360;
    rotation = Math.floor(_randomAngle + 5 * 360);
    const displacedAngle = _randomAngle + (currentRotation % 360);

    spinning = true;
    setTimeout(() => {
      picked = [
        sectorList.length -
          Math.floor((displacedAngle % 360) / (360 / sectorList.length)) -
          1,
      ];
      console.log(picked);
      spinning = false;
      currentRotation += rotation;
    }, SPIN_DURATION * 1000);
  };
</script>

<div class="container">
  <span class="picker" />
  <div
    class={`circleContainer`}
    style={`--currentRotation: ${currentRotation}deg; --rotation: ${rotation}deg; transform: rotate(${currentRotation}deg) `}
    class:spinning
  >
    {#each sectorList as { params, id }, i (id)}
      <Sector {CENTER} {STROKE_WIDTH} index={i} bind:params totalSectors={sectorList.length} />
    {/each}
  </div>
  <button on:click={pickOption}
    ><span class="material-icons"> loop </span>
  </button>
</div>

<style>
  .container {
    padding: 3rem;
    max-width: 500px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
  }

  .container button {
    box-sizing: content-box;
    padding: 1rem;
    height: 2rem;
    width: 2rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    background: rgb(230, 230, 230);

    cursor: pointer;
    border: none;
  }

  .container button span {
    margin: 0;
    padding: 0;
    font-size: 2rem !important;
  }

  .container button:hover {
    background: rgb(50, 50, 50);
    color: whitesmoke;
  }

  .circleContainer {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circleContainer::before {
    content: "";
    z-index: 10;
    height: 20px;
    width: 20px;

    border: 2px solid black;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .picker {
    position: absolute;
    z-index: 10;
    top: 4rem;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 0;
    height: 0;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-top: 2rem solid black;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .picker::before {
    content: "";
    display: block;
    transform: translateY(-110%);

    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 1rem solid white;
  }

  .circleContainer.spinning {
    animation: spin 3s forwards;
  }

  @keyframes spin {
    from {
      transform: rotate(var(--currentRotation));
    }
    to {
      transform: rotate(calc(var(--currentRotation) + var(--rotation)));
    }
  }

  .container button {
    z-index: 10;
  }
</style>
