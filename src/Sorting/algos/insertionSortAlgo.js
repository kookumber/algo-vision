let tokyoBlue = '#0DD3FE';
let tokyoGreen = '#00ffd2';

export const insertionSort = async (animationSpeed = 300) => {

    let bars = document.getElementsByClassName('bar')

    // Color the first bar
    bars[0].style.backgroundColor = tokyoGreen


    for (let i = 1; i < bars.length; i += 1){
        
        // We store a const to reference for the bar's style
        let barStyle = bars[i].style
        let j = i - 1

        // Store value of ith bar to key. In this case, we're getting the height of the div
        let key = Number((barStyle.height).slice(0, barStyle.height.indexOf('p')))
        // We'll also store the bar's height as css element to reference when we're switching bars
        let height = bars[i].style.height

        // Bar we're looping through to compare gets blue color
        bars[i].style.backgroundColor = tokyoBlue

        await new Promise((resolve) => 
            setTimeout(() => {
                resolve()
            }, animationSpeed * 10)
        )

        // Now we want to place selected element at the correct position
        // While j greater than or equal to 0 and bar at j index is greater than bar at i index
        while (j >= 0 && Number(bars[j].style.height.slice(0, bars[j].style.height.indexOf('p'))) > key) {

            // Provide blue color for jth bar, which is the bar to the left of the ith bar
            bars[j].style.backgroundColor = tokyoBlue

            // For placing jth element of (j + 1)th element
            bars[j + 1].style.height = bars[j].style.height;
            
            // j was previously i - 1, now j is j - 1
            j = j - 1

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, animationSpeed * 10)
            );

            // Style bars that are sorted
            for (let k = i; k >= 0; k--){
                bars[k].style.backgroundColor = tokyoGreen
            }
        }

        // Placing selected element to its correct position. Basically switching bar[j + 1] with bar[i]
        bars[j + 1].style.height = height
        
        await new Promise((resolve) => 
            setTimeout(() => {
                resolve()
            }, animationSpeed)
        )

        bars[i].style.backgroundColor = tokyoGreen
    }
}

