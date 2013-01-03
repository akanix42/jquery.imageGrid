items = [];
$().ready(function () {
    for (var n = 0; n < 5; n++) 
        for (var i = 0; i < 5; i++) {
        items.push({
            src: 'images/img' + i + '.jpg',
            text: '<h3>Some html ' + i + '</h3>'
        });
    }
    $('#imageGrid').imageGrid({
        items: items,
        columns: 3,
        rows: 2,
        repeatItemsToFillLastPage: true,
        formatter: function (item, grid) {
            return '<img class="image-grid-cell" height="' + grid.options.cellHeight + '" width="' + grid.options.cellWidth + '" src="' + item.src + '" alt="">';
        }
    });
    var imageGrid = $('#imageGrid').data('image-grid');
    $('.pager').pager({
        pages: imageGrid.getPageCount(),
        onUpdated: function($pager, pager) {
            $('#imageGrid').imageGrid('page', pager.page);
        }
    });
    createHoverOverlay($('#imageGrid'), 3);
    
    function createHoverOverlay($grid, columnsToSpan) {
        $(document).on('mouseenter', $grid.selector + ' .image-grid-cell', function () {
            var grid = $grid.data('image-grid');
            var $cell = $(this);
            var item = $cell.data('image-grid-item');
            var $hoverCell = $('<div class="image-grid-cell-hover">' +
                '<img  height="' + grid.options.cellHeight + '" width="' + grid.options.cellWidth + '" src="' + item.src + '"></img>' +
                '<div class="image-grid-cell-hover-text">' + item.text + '</div>' +
                '</div>');

            var position = $cell.offset();
            var cellsAfter = $cell.nextAll().length;
            if (cellsAfter < columnsToSpan - 1) {
                var cellsToReverse =columnsToSpan-1-(cellsAfter + 1);
                var $prevCell = $cell.prevAll(':eq(' + cellsToReverse + ')');
                if (!$prevCell.length)
                    return;
                position = $prevCell.offset();
            }

            $hoverCell
                .width($cell.width() * columnsToSpan)
                .height($cell.height())
                .css('left', position.left + 'px')
                .css('top', position.top + 'px')
                .css('position', 'absolute')
                .appendTo($('#imageGrid'))
                .mouseleave(function () {
                    $hoverCell.remove();
                });
        });
    }
});