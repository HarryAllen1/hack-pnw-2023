let defaulturl = "https://www.google.com";

export default function openNewTab(url: string) {
    window.open(url ? url : defaulturl, "_blank");
}