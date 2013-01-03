items = [];
$().ready(function () {
    for (var n = 0, counter = 0; n < 5; n++)
        for (var i = 0; i < 5; i++, counter++) {
            items.push({
                src: 'images/img' + i + '.jpg',
                text: '<h3>Some html ' + counter + '</h3>'
            });
        }
    $('#imageGrid').imageGrid({
        items: items,
        columns: 4,
        rows: 2,
        repeatItemsToFillLastPage: true,
        cellEvents: [
            {
                event: 'mouseenter',
                options: { columnsToSpan: 3 },
                callback: $.imageGrid.cellHoverOverlay
            }],
        formatter: function(item, grid) {
            return '<img class="image-grid-cell" height="' + grid.options.cellHeight + '" width="' + grid.options.cellWidth + '" src="' + item.src + '" alt="">';
        },
        pager: {
            selector: '.pager'
        }
    });
});