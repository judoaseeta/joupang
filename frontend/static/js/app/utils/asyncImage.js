export default function asyncImage(imgUrlorUrls) {
    if(typeof imgUrlorUrls==='string') {
        return new Promise((res,rej) => {
            const img = new Image();
            img.src = imgUrlorUrls;
            img.onload = res(img)

        });
        // if array of urls;
    } else {
        return Promise.all(imgUrlorUrls.map(url => {
            return new Promise((res,rej) => {
                const img = new Image();
                img.src = url;
                img.onload = res(img)
    
            })
        }))
    }
}