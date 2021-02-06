
export default function body(x,y, width,height) {
    return `
        <svg 
        class="loading_body will_change"
        id="loading_body"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 300 150"
        x=${x}
        y=${y}
        width=${width}
        height=${height}
        >
            <path 
                d="M 20,140 L 20,50 L 100, 50 L 100,20 L 280, 20 L 280, 140 
                L 240,140 A 22 22 90 0 0 196,140 L 96, 140 A 22 22 90 0 0 52,140 Z"
                fill="#4285f4" />
                <rect 
                    x="30"
                    y="60"
                    width="30"
                    height="25"
                    fill="white"
                />
                <rect 
                    x="20"
                    y="120"
                    width="10"
                    height="5"
                    fill="white"
                />
                <path 
                d="M 99 50 L 99 80 L 101 80 L 101 50 Z"
                fill="white" />
        </svg>
    `
}