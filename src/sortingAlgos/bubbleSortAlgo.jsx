export const swap = (ele1, ele2) => {

    return new Promise ((resolve) => {
        // For exchanging styles of two blocks
        let temp = ele1.style.transform;
        let container = document.getElementById('arr-wrap')
        ele1.style.transform = ele2.style.transform;
        ele2.style.transform = temp

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(ele2, ele1);
                resolve();
            }, 250)
        })
    })
    
}