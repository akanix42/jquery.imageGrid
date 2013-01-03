items = [];
$().ready(function () {
    for (var i = 0; i < 5; i++) {
        items.push('images/img' + i + '.jpg');
    }
    $('.imageGrid').imageGrid({
        items: items,
        columns: 2,
        rows: 2
    });
});