items = [];
$().ready(function () {
    for (var i = 0; i < 5; i++) {
        items.push('images/img' + i + '.jpg');
    }
    $('#imageGrid').imageGrid({
        items: items,
        columns: 2,
        rows: 2,
        repeatItemsToFillLastPage: true
    });
    $('#pagerPrev').click(function (e) {
        $('#imageGrid').imageGrid('prevPage');
    });
    $('#pagerNext').click(function (e) {
        $('#imageGrid').imageGrid('nextPage');
    });
    $(document).on('mouseenter', '#imageGrid .image-grid-cell', function () {
        var $cell = $(this);
        var item = $cell.data('image-grid-item');
        var $hoverCell = $('<div class="image-grid-cell-hover"><h3>' + item + '</h3><img src="images/' + item.replace(/.jpg/, '_hover.jpg') + '"></img></div>');

        var position = $cell.next().length
            ? $cell.offset()
            : $cell.prev().length
                ? $cell.prev().offset()
                : $cell.offset();

        $hoverCell
            .width($cell.width() * 2)
            .height($cell.height())
            .css('left', position.left + 'px')
            .css('top', position.top + 'px')
            .css('position', 'absolute')
            .appendTo($('#imageGrid'))
            .mouseleave(function () {
                $hoverCell.remove();
            });
    });
});