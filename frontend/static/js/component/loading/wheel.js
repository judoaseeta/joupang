
export default function wheel(width) {
    return `
        <svg 
        class="loading_wheel will_change"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200"
        width=${width}
        height=${width}
        >
            <circle
                cx="100"
                cy="100"
                r="80"
                fill="#4285f4"
            ></circle>
            <path d="M 110,95 L 180,95 L 180,105 L 110,105 Z" fill="white" stroke="none"/>
            <path d="M 95,110 L 95,180 L 105,180 L 105,110 Z" fill="white" stroke="none"/>
            <path d="M 20,95 L 90,95 L 90,105 L 20,105 Z" fill="white" stroke="none"/>
            <path d="M 95,20 L 95,90 L 105,90 L 105,20 Z" fill="white" stroke="none"/>
        </svg>
    `
}