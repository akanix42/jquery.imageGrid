

(function ($) {
    $.fn.imageGrid = function (arg1, arg2, arg3) {
        var defaultOptions = {
            repeatItemsToFillLastPage: false,
            rows: 1,
            columns: 1,
            cellHeight: 100,
            cellWidth: 100,
            formatter: defaultCellFormatter
        };
        if ($.type(arg1) == 'string') {
            var returnValue = this;
            this.each(function () {
                var $grid = $(this);
                var grid = $grid.data('image-grid');
                if (!grid)
                    return;
                if (arg1 == 'page') {
                    if (arg2 === undefined) {
                        returnValue = grid.page;
                        return false;
                    } else if (isNaN(parseInt(arg2))) {
                        return false;
                    } else {
                        grid.renderPage(parseInt(arg2));
                    }
                }
                else if (arg1 == 'nextPage') {
                    grid.renderPage(grid.page + 1);
                    if (grid.pager)
                        grid.pager.update();
                    return false;
                }
                else if (arg1 == 'prevPage') {
                    grid.renderPage(grid.page - 1);
                    if (grid.pager)
                        grid.pager.update();
                    return false;
                }
            });
            return returnValue;
        } else if ($.isArray(arg1) && !arg2 && !arg3) {
            throw 'Not yet implemented!';
        } else if ($.isPlainObject(arg1) && !arg2 && !arg3) {
            var options = $.extend({}, defaultOptions, arg1);

            return this.each(function () {
                // Using return allows for chainability
                if (!('items' in options))
                    throw 'ImageGrid - An array called \'items\' must be a property on the options object.';
                if (!options.items || !$.isArray(options.items))
                    return false;

                var $grid = $(this);
                if ($grid.data('image-grid'))
                    // Grid already exists - return.
                    return;

                var grid = new Grid($grid);
            });

        } else {
            throw 'Incorrect options specified.';
        }
        function defaultCellFormatter(item, grid) {
            return '<img class="image-grid-cell" height="' + grid.options.cellHeight + '" width="' + grid.options.cellWidth + '" src="' + item + '" alt="">';
        }

        function getNextId() {
            if (!window._nextImageGridId)
                window._nextImageGrid = 0;
            return window._nextImageGrid++;
        }

        function Grid($grid) {
            var grid = {
                $grid: $grid,
                id: getNextId(),
                options: options,
                page: 0,

                // functions
                createPager: createPager,
                getPageCount: getPageCount,
                renderPage: renderPage
            };
            $grid.data('image-grid', grid);
            grid.renderPage(grid.page);
            createPager();

            function createPager() {
                if ($.isPlainObject(grid.options.pager)) {
                    $(grid.options.pager.selector).pager($.extend({},
                        grid.options.pager, {
                        pages: grid.getPageCount(),
                        onUpdated: function ($pager, pager) {
                            grid.renderPage(pager.page);
                        }
                        }));
                    grid.pager = $(grid.options.pager.selector).data('pager');
                }
            }
            
            function getPageCount() {
                return Math.ceil(grid.options.items.length / (grid.options.rows * grid.options.columns));
            }

            function renderPage(page) {
                if (page < 0)
                    return;

                var options = grid.options;
                var row = 0, col = 0, $row;
                var numberOfItemsToRender = options.rows * options.columns;
                var firstItemIndex = page * numberOfItemsToRender;
                if (firstItemIndex >= options.items.length)
                    return false;
                $grid.empty();
                var lastItemIndex = firstItemIndex + numberOfItemsToRender;
                var itemsToRender = options.items.slice(firstItemIndex, lastItemIndex);
                if (options.repeatItemsToFillLastPage && lastItemIndex >= options.items.length)
                    for (var i = 0; i < numberOfItemsToRender - (options.items.length - firstItemIndex) ; i++)
                        itemsToRender.push(options.items[i]);
                for (var i = 0; i < itemsToRender.length; i++) {
                    if (i % options.columns == 0)
                        $row = $('<div class="image-grid-row" id="ig_imageGrid' + grid.id + '_row' + row++ + '"></div>')
                            .appendTo($grid);
                    var item = itemsToRender[i];
                    var $cell = $(options.formatter(item, grid));
                    if ($.isArray(options.cellEvents)) {
                        $.each(options.cellEvents, function (i, eventOptions) {
                            $cell.bind(eventOptions.event, function (e) {
                                var $cell = $(this);
                                var item = $cell.data('image-grid-item');
                                eventOptions.callback(grid, item, $cell, eventOptions.options);
                            });
                        });
                    }
                    $cell
                        .appendTo($row)
                        .data('image-grid-item', item);

                }
                grid.page = page;
            }

            return grid;
        }
    };
})(jQuery);