function addPointMarker(x, y) {
    var pointMarker = $('<div></div>');
    pointMarker.addClass('point');
    pointMarker.css({
        left: `${x}px`,
        top: `${y}px`
    });
    mapImageContainer.append(pointMarker);
    // mapImageContainer.appendChild(pointMarker);
}

