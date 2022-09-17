


export const getMergeSortAnimation = (arr) => {
    const animations = [];
    if (arr.length <= 1) return arr;
    const auxiliaryArr = arr.slice()
    mergeSortHelper(arr, 0, arr.length - 1, auxiliaryArr, animations)
    return animations;

}

const mergeSortHelper = (mainArr, startIdx, endIdx, auxiliaryArr, animations) => {
    if (startIdx === endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx) / 2)

    mergeSortHelper(auxiliaryArr, startIdx, midIdx, mainArr, animations)
    mergeSortHelper(auxiliaryArr, midIdx + 1, endIdx, mainArr, animations)
    doMerge(mainArr, startIdx,  midIdx, endIdx, auxiliaryArr, animations)
}

const doMerge = (mainArray, startIdx, midIdx, endIdx, auxiliaryArray, animations) => {
    let k = startIdx;
    let i = startIdx;
    let j = midIdx + 1;
    while (i <= midIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= midIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}