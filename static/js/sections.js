String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
$(document).ready(function () {
    var links = "";
    var sectionBlock = $('#section-links');
    $("h1").each(function(){
        var link = '#' + $(this).attr('id');
        var label = $(this).attr('id').toProperCase();
        var htm = "<a class='page-link' href='" + link + "'>" + label + "</a>";
        links += htm;
    });
    $('#section-links').html(links);
});
