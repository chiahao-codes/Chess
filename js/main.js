document.addEventListener("readystatechange", () => {
    if (document.readyState == "loading") {
        console.log("DOM is still loading.");
    } else {
        console.log("main.js readyState:",document.readyState);
    }
});
