export const swap = (ele1, ele2, speed) => {

    return new Promise ((resolve) => {
        // For exchanging styles of two blocks
        let temp = ele1.style.transform;
        // temp = 'translate(29.91px)'
        let container = document.getElementById('arr-wrap')
        ele1.style.transform = ele2.style.transform;
        ele2.style.transform = temp

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(ele2, ele1);
                resolve();
            }, speed * 10)
        })
    })
    
}

export const bubbleSort = async (primeColor, secondColor, animationSpeed) => {
    let bars = document.getElementsByClassName('bar')

    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            let barOneStyle = bars[j].style
            let barTwoStyle = bars[j + 1].style

            barOneStyle.backgroundColor = secondColor
            barTwoStyle.backgroundColor = secondColor

            const bar1 = bars[j].style.height
            const val1 = Number(bar1.slice(0, bar1.indexOf('p')))
            const bar2 = bars[j + 1].style.height
            const val2 = Number(bar2.slice(0, bar2.indexOf('p')))

            if (val1 > val2) {
                await swap(bars[j], bars[j + 1], animationSpeed)
                bars = document.getElementsByClassName('bar')
            }

            bars[j].style.backgroundColor = primeColor
            bars[j + 1].style.backgroundColor = primeColor
        }

        bars[bars.length - i - 1].style.backgroundColor = secondColor
    }
}