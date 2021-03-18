export default function clearElement(element) {
    while(element.firstChild) {
        element.firstChild.remove();
    }
}