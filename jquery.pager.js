

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
                    if (!arg2) {
                        returnValue = pager.page;
                        return false;
                    } else if (isNaN(parseInt(arg2))) {
                        return false;
                    } else {
                        pager.page = parseInt(arg2);
                        update($pager, pager);
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
                var pager = {
                    page: options.page
                };
                pager.options = options;
                $pager.data('pager', pager);
                create($pager, pager);
            });

        } else {
            throw 'Incorrect options specified.';
        }

        function create($pager, pager) {
            for (var i = 0; i < pager.options.pages; i++) {
                $pager.append(pager.options.formatter(i, $pager, pager));
            }
        }
        
        function defaultFormatter(page, $pager, pager) {
            var $html = $('<span class="pager-page" data-page="' + page + '">' + (page + 1) + '</span>');
            $html.click(function() {
                pager.page = parseInt($html.data('page'));
                update($pager, pager);
            });
            if (pager.page == page)
                $html.addClass('pager-page-selected');
            return $html;
        }

        function update($pager, pager) {
            $pager.find('.pager-page-selected').removeClass('pager-page-selected');
            $pager.find('[data-page="' + pager.page + '"]').addClass('pager-page-selected');
            if (pager.options.onUpdated)
                pager.options.onUpdated($pager, pager);
        }

    };
})(jQuery);