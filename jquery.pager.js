

(function ($) {
    $.fn.pager = function (arg1, arg2, arg3) {
        var defaultOptions = {
            pages: 1,
            page: 0,
            formatter: defaultFormatter

        };
        if ($.type(arg1) == 'string') {
            var returnValue = this;
            this.each(function () {
                var $pager = $(this);
                var pager = $pager.data('pager');
                if (!pager)
                    return;
                if (arg1 == 'page') {
                    if (arg2 === undefined) {
                        returnValue = pager.page;
                        return false;
                    } else if (isNaN(parseInt(arg2))) {
                        return false;
                    } else {
                        pager.page = parseInt(arg2);
                        pager.update();
                    }
                }

            });
            return returnValue;
        } else if ($.isArray(arg1) && !arg2 && !arg3) {
            throw 'Not yet implemented!';
        } else if ($.isPlainObject(arg1) && !arg2 && !arg3) {
            var options = $.extend({}, defaultOptions, arg1);

            return this.each(function () {
                var $pager = $(this);
                if ($pager.data('pager'))
                    // Grid already exists - return.
                    return;
                $pager.empty();
                var pager = new Pager($pager, options);
            });

        } else {
            throw 'Incorrect options specified.';
        }

        function defaultFormatter(page, pager) {
            var $html = $('<span class="pager-page" data-page="' + page + '">' + (page + 1) + '</span>');
            $html.click(function () {
                pager.page = parseInt($html.data('page'));
                pager.update();
            });
            if (pager.page == page)
                $html.addClass('pager-page-selected');
            return $html;
        }

        function Pager($pager, options) {
            var pager = {
                $pager: $pager,
                page: options.page,
                options: options,

                // methods
                goToPage: goToPage,
                render: render,
                update: update
            };
            $pager.data('pager', pager);
            render();

            return pager;

            function goToPage(page, skipOnUpdated) {
                pager.page = page;
                update(skipOnUpdated);
            }
            
            function render() {
                for (var i = 0; i < pager.options.pages; i++) {
                    $pager.append(pager.options.formatter(i, pager));
                }
            }
            function update(skipOnUpdated) {
                $pager.find('.pager-page-selected').removeClass('pager-page-selected');
                $pager.find('[data-page="' + pager.page + '"]').addClass('pager-page-selected');
                if (!skipOnUpdated && pager.options.onUpdated)
                    pager.options.onUpdated($pager, pager);
            }

        }

    };
})(jQuery);