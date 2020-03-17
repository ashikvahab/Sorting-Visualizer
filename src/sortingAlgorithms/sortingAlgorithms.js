export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations // for animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]); // for turning red
    animations.push([i, j]); // for reverting back
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]); // for turning red
    animations.push([i, i]); // for reverting back
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]); // for turning red
    animations.push([j, j]); // for reverting back
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function bubbleSort(array) {
  const comp = [];
  const swap = [];
  const sorted = [];
  let count = array.length - 1;
  let unsorted = true;
  while (unsorted) {
    unsorted = false;
    for (let i = 0; i < count; i++) {
      comp.push([i, i + 1]);
      comp.push([i, i + 1]);
      swap.push([false]);
      swap.push([false]);
      sorted.push([false]);
      sorted.push([false]);
      if (array[i] > array[i + 1]) {
        unsorted = true;
        swap.splice(-2, 1, [i, i + 1, array[i + 1], array[i]]);
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
      }
    }

    sorted.splice(-1, 1, count);
    --count;
  }
  // console.log(count);
  return [comp, swap, sorted, count];
}

export function quickSort(array) {
  const comp = [];
  const swaped = [];
  const sorted = [];
  quickSortHelper(array, 0, array.length - 1, comp, swaped, sorted);
  const animations = [comp, swaped, sorted];
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, comp, swaped, sorted) {
  if (startIdx >= endIdx) return;
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    comp.push([leftIdx, pivotIdx, rightIdx]);
    comp.push([leftIdx, pivotIdx, rightIdx]);
    // swaped.push([false]);
    // swaped.push([false]);
    sorted.push([false]);
    sorted.push([false]);
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      // swaped.splice(-2, 1, [
      //   leftIdx,
      //   rightIdx,
      //   array[rightIdx],
      //   array[leftIdx]
      // ]);
      swaped.push([leftIdx, rightIdx, array[rightIdx], array[leftIdx]]);
      swap(leftIdx, rightIdx, array);
    }
    if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
    if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
  }

  swaped.push([pivotIdx, rightIdx, array[rightIdx], array[pivotIdx]]);
  // swaped.splice(-2, 1, [pivotIdx, rightIdx, array[rightIdx], array[pivotIdx]]);
  swap(pivotIdx, rightIdx, array);
  sorted.splice(-1, 1, rightIdx);
  // sorted.push(rightIdx);
  const leftSubarrayIsSmaller =
    rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1, comp, swaped, sorted);
    quickSortHelper(array, rightIdx + 1, endIdx, comp, swaped, sorted);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx, comp, swaped, sorted);
    quickSortHelper(array, startIdx, rightIdx - 1, comp, swaped, sorted);
  }
}

function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
