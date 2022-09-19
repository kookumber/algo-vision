// const quickSort = (arr) => {
//     if (arr.length <= 1) {
//         return arr
//     } 

//     let left = []
//     let right = []
//     let newArr = []
//     let pivot = arr.pop()
//     let length  = arr.length

//     for (let i = 0; i < length; i++) {
//         if (arr[i] <= pivot) {
//             left.push(arr[i])
//         } else {
//             right.push(arr[i])
//         }
//     }

//     return newArr.concat(quickSort(left), pivot, quickSort(right))
// }


// Pivot
let pivotColor = "#00ffd2" //Seafoam Green
// To be compared
let compareColor = "#F9BD25" //Yellow
// Less than pivot
let lowerColor = "#0DD3FE" //Blue
let greaterColor = "#39FF14" //Neon Green
// Pivot moved positions
let pivotMovedColor = "#fa1593" //Pink
// Greater than pivot //
let tokyoLighPurple = '#cc00ff'


export const quickSort = async (left, right, delay = 100) => {
    if (left < right) {
        // Storing the index of pivot element after partition
        let pivotIdx = await lometo_partition(left, right, delay);
        // Recursively calling quicksort for left partition
        await quickSort(left, pivotIdx - 1, delay);
        // Recursively calling quicksort for right partition
        await quickSort(pivotIdx + 1, right, delay)
    }
} 

export const lometo_partition = async (left, right, delay) => {
    const bars = document.getElementsByClassName('bar')

    // Store the value of the pivot element - Lometo's partition uses last element
    let lastBar = bars[right].style.height
    let pivot = Number((lastBar).slice(0, lastBar.indexOf('p')))

    // Change color of the pivot element
    bars[right].style.backgroundColor = pivotColor
    
    let i = left - 1;

    for (let j = left; j <= right - 1; j++) {
        let barStyle = bars[j].style
        // Change background color of blocks to be compared
        barStyle.backgroundColor = compareColor

        // Set delay so we can adjust animation speed
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, delay)
        })

        // Get the value of the current bar we're looping and checking against pivot
        let val =  Number((barStyle.height).slice(0, barStyle.height.indexOf('p')))
        
        // To compare value of two blocks
        if (val < pivot) {
            i += 1

            let temp1 = bars[i].style.height
            
            //Switch the heights of the bars we're comparing if bar at index j
            // is less than the pivot
            bars[i].style.height = bars[j].style.height
            bars[j].style.height = temp1

            // Style the bar indicating its lower smaller value
            bars[i].style.backgroundColor = lowerColor

            if (i !== j) bars[j].style.backgroundColor = tokyoLighPurple

            await new Promise((resolve) => 
                setTimeout(() => {
                    resolve()
                }, delay)    
            )
        } else {
            bars[j].style.backgroundColor = tokyoLighPurple
        }
    }
    
    // Swapping the ith element with the pivot
    i += 1

    let temp1 = bars[i].style.height
    bars[i].style.height = bars[right].style.height
    bars[right].style.height = temp1

    bars[right].style.backgroundColor = tokyoLighPurple
    // Color to show pivot element has moved 
    bars[i].style.backgroundColor = pivotMovedColor

    // This is for reverting the bars back to their original color after finishing initial sort
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = pivotMovedColor
    }


    return i
}




// let arr = [5, 4, 2, 6, 8, 22, 4, 99, 422, 53, 23, 1, 60, 19]


// async function lometo_partition(l, r, delay = 700) {
//     var blocks = document.querySelectorAll(".block");

//     // Storing the value of pivot element
//     var pivot =
//         Number(blocks[r].childNodes[0].innerHTML);
//     var i = l - 1;
//     blocks[r].style.backgroundColor = "red";
//     document.
//         getElementsByClassName("range")[0].innerText = `[${l},${r}]`;

//     for (var j = l; j <= r - 1; j++) {
//         // To change background-color of the
//         // blocks to be compared
//         blocks[j].style.backgroundColor = "yellow";
//         // To wait for 700 milliseconds
//         await new Promise((resolve) =>
//             setTimeout(() => {
//                 resolve();
//             }, delay)
//         );
//         var value =
//             Number(blocks[j].childNodes[0].innerHTML);

//         // To compare value of two blocks
//         if (value < pivot) {
//             i++;
//             var temp1 = blocks[i].style.height;
//             var temp2 = blocks[i].childNodes[0].innerText;
//             blocks[i].style.height = blocks[j].style.height;
//             blocks[j].style.height = temp1;
//             blocks[i].childNodes[0].innerText =
//                 blocks[j].childNodes[0].innerText;
//             blocks[j].childNodes[0].innerText = temp2;
//             blocks[i].style.backgroundColor = "orange";
//             if (i != j) blocks[j].style.backgroundColor = "pink";
//             //To wait for 700 milliseconds
//             await new Promise((resolve) =>
//                 setTimeout(() => {
//                     resolve();
//                 }, delay)
//             );
//         } else blocks[j].style.backgroundColor = "pink";
//     }
//     // Swapping the ith with pivot element
//     i++;
//     var temp1 = blocks[i].style.height;
//     var temp2 = blocks[i].childNodes[0].innerText;
//     blocks[i].style.height = blocks[r].style.height;
//     blocks[r].style.height = temp1;
//     blocks[i].childNodes[0].innerText =
//         blocks[r].childNodes[0].innerText;
//     blocks[r].childNodes[0].innerText = temp2;
//     blocks[r].style.backgroundColor = "pink";
//     blocks[i].style.backgroundColor = "green";

//     // To wait for 2100 milliseconds
//     await new Promise((resolve) =>
//         setTimeout(() => {
//             resolve();
//         }, delay * 3)
//     );
//     document.getElementsByClassName("range")[0].innerText = "";
//     for (var k = 0; k < 20; k++)
//         blocks[k].style.backgroundColor = "#6b5b95";
//     return i;
// }