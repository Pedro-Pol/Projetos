export function ajustPixelPerfectness(variable, zoom) {
    for (let i = 0; i < variable.length; i++) {
        for (let ii = 0; ii < zoom; ii++) {
            if (variable[i].x % zoom != 0) {variable[i].x--};
            if (variable[i].y % zoom != 0) {variable[i].y--};
        };
    };
    return variable;
};

export function getCoordinates(element, event) {
    const elementCoordinates = element.getBoundingClientRect();
    return {
        x: (event.clientX - elementCoordinates.left),
        y: (event.clientY - elementCoordinates.top)
    };
}