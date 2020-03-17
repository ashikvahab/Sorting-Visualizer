import React from "react";
import "./SortingVisualizer.css";
import * as sortingAlgorithm from "../sortingAlgorithms/sortingAlgorithms.js";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

// color of array bars when sorted
const SORTED_COLOR = "purple";

// color of array bars when started
const ORIGINAL_COLOR = "pink";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    let array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 550));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = sortingAlgorithm.mergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      if (i === animations.length - 1) {
        for (let j = 0; j < this.state.array.length; j++) {
          setTimeout(() => {
            const arrayBars = document.getElementsByClassName("array-bar");
            const barSortedStyle = arrayBars[j].style;
            barSortedStyle.backgroundColor = SORTED_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  }

  bubbleSort() {
    const animations = sortingAlgorithm.bubbleSort(this.state.array);
    const comp = animations[0];
    const swap = animations[1];
    const sorted = animations[2];
    for (let i = 0; i < comp.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx] = comp[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
      if (swap[i][0] !== false) {
        setTimeout(() => {
          const arrayBars = document.getElementsByClassName("array-bar");
          const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = swap[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barOneHeight}px`;
          barTwoStyle.height = `${barTwoHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      if (sorted[i][0] !== false) {
        setTimeout(() => {
          const arrayBars = document.getElementsByClassName("array-bar");
          const barSortedStyle = arrayBars[sorted[i]].style;
          barSortedStyle.backgroundColor = SORTED_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      if (sorted[i] === sorted[sorted.length - 1]) {
        for (let count = animations[3]; count >= 0; count--) {
          setTimeout(() => {
            const arrayBars = document.getElementsByClassName("array-bar");
            const barSortedStyle = arrayBars[count].style;
            barSortedStyle.backgroundColor = SORTED_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  }

  quickSort() {
    const animations = sortingAlgorithm.quickSort(this.state.array);
    const comp = animations[0];
    console.log(comp);
    const swap = animations[1];
    console.log(swap);
    const sorted = animations[2];
    console.log(sorted);
    for (let i = 0; i < comp.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, barThreeIdx] = comp[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const barThreeStyle = arrayBars[barThreeIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        barThreeStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
      if (sorted[i][0] !== false) {
        setTimeout(() => {
          const arrayBars = document.getElementsByClassName("array-bar");
          const barSortedStyle = arrayBars[sorted[i]].style;
          barSortedStyle.backgroundColor = SORTED_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      if (sorted[i] === sorted[sorted.length - 1]) {
        setTimeout(() => {
          for (let i = 0; i < this.state.array.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const barSortedStyle = arrayBars[i].style;
            barSortedStyle.backgroundColor = SORTED_COLOR;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
    for (let i = 0; i < swap.length; i++) {
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = swap[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
      }, i * (ANIMATION_SPEED_MS * 5));
    }
  }

  heapSort() {}

  callingTwoFunctions() {
    this.resetArray();
    this.returnToOriginalColor();
  }

  returnToOriginalColor() {
    // console.log(this.state.array);
    for (let i = 0; i < this.state.array.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const barSortedStyle = arrayBars[i].style;
      barSortedStyle.backgroundColor = ORIGINAL_COLOR;
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.callingTwoFunctions()}>
          Generate New Array
        </button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortTesting() {
  const copiedArray = this.state.array.concat().sort(function(a, b) {
    return a - b;
  });
  const valueFromFunction = sortingAlgorithm.quickSort(this.state.array);
  console.log("sorted array from our funciton    " + valueFromFunction);
  const value =
    copiedArray.length === valueFromFunction.length &&
    copiedArray.sort().every(function(value, index) {
      return value === valueFromFunction.sort()[index];
    });
  console.log("sorted array    " + copiedArray);
  console.log(value);
}
