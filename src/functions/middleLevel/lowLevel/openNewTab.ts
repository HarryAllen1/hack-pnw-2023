let defaulturl = "https://www.google.com";

export default function openNewTab(url = defaulturl) { 
    window.open(url, "_blank");
}