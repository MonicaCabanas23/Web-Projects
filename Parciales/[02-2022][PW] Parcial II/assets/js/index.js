//Include booster.js
function loadScript(url, type = 'text/javascript'){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = type;
    script.src = url;
    script.defer;
    head.appendChild(script);
}

loadScript("/assets/js/booster.js");
loadScript("/assets/js/deck.js");
loadScript("/assets/js/modal.js");
loadScript("/assets/js/localStorage.js");


