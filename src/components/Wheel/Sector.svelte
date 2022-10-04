<script lang="ts">
  import { onMount } from "svelte";
  import { draw } from "svelte/transition";
  import type { ISectorParams } from "../../interfaces";

  export let CENTER: number;
  export let STROKE_WIDTH: number;

  export let totalSectors: number;

  export let index: number;

  export let params: ISectorParams;
  let pathString: string;

  $: ({ angle, rotation, color, title } = params);

  $: pathString =
    createSector(CENTER, angle, STROKE_WIDTH) + `L${CENTER}, ${CENTER}`;

  const create_PathString = (
    CENTER: number,
    radius: number,
    _angle: number,
    _pathString: string
  ) => {
    let endX = CENTER + radius * Math.cos((_angle * Math.PI) / 180);
    let endY = CENTER + radius * Math.sin((_angle * Math.PI) / 180);

    return _pathString + `A${radius},${radius} 1 0,1 ${endX},${endY} `;
  };

  const createSector = (CENTER: number, angle: number, strokeWidth: number) => {
    const radius = CENTER - strokeWidth;
    const _angle = angle - 90;

    let _pathString = `M${CENTER},${CENTER} L${CENTER},${strokeWidth}`;

    if (angle > 180) {
      _pathString = create_PathString(CENTER, radius, 90, _pathString);
    }
    _pathString = create_PathString(CENTER, radius, _angle, _pathString);
    return _pathString;
  };

  onMount(() => {
    pathString =
      createSector(CENTER, angle, STROKE_WIDTH) + `L${CENTER}, ${CENTER}`;
    console.log(pathString);
  });
</script>

<div
  class="container"
  style={`transform: rotate(${rotation}deg); z-index: ${-index}; `}
>
  <svg viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}>
    {#if pathString}
      <path
        transition:draw={{ duration: 1000 }}
        d={pathString}
        style={`fill: ${color}; stroke: rgb(30, 30, 30); stroke-width: 3px; fill-opacity: 0`}
      />
    {/if}
  </svg>
  <div
    class="textContainer"
    style={`transform: rotate(${angle / 2 - 90}deg) translate(0, -${totalSectors > 5 ? "25" : "50"}%) ; `}
  >
    <p>
      {title}
    </p>
  </div>
</div>

<style>
  .container {
    position: absolute;
    width: 100%;
    height: auto;
  }

  svg {
    display: flex;
    justify-content: center;
    align-content: center;
    transition: 0.5s;
  }

  path {
    animation: sectorColorAnim 0.3s forwards;
  }

  .textContainer {
    top: 50%;

    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .textContainer p {
    color: white;
    text-shadow: 1px 1px 0 black;
    font-size: 1.2rem;

    width: 100px;
    text-align: center;


    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 400px) {
    .textContainer p {
      font-size: 0.8rem;
    }
  }

  @keyframes sectorColorAnim {
    to {
      fill-opacity: 1;
    }
  }
</style>
