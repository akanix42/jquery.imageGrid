

(function ($) {
    $.imageGrid = $.imageGrid || {};
    $.imageGrid.cellHoverOverlay = function (grid, item, $cell, options) {
        var defaultOptions = {
            columnsToSpan: 1,
            formatter: defaultCellFormatter
        };
        options = $.extend({}, defaultOptions, options);
        var columnsToSpan = options.columnsToSpan;
        var $hoverCell = $(options.formatter(grid, item, $cell, options));

        var position = $cell.offset();
        var cellsAfter = $cell.nextAll().length;
        if (cellsAfter < columnsToSpan - 1) {
            var cellsToReverse = columnsToSpan - 1 - (cellsAfter + 1);
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

        function defaultCellFormatter(grid, item, $cell, options) {
            return $('<div class="image-grid-cell-hover">' +
                '<img  height="' + grid.options.cellHeight + '" width="' + grid.options.cellWidth + '" src="' + item.src + '"></img>' +
                '<div class="image-grid-cell-hover-text">' + item.text + '</div>' +
                '</div>');
        }
    };
})(jQuery);