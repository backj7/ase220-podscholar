$(document).ready(() => {
    $.ajax({
        url: pod_list_url,
        type:'GET',
        contentType: "application/json; charset=utf-8",
        dataType:'json',
        success: function (urls) {
            urls.forEach((url) => {
                $.ajax({
                    url: url,
                    type:'GET',
                    contentType: "application/json; charset=utf-8",
                    dataType:'json',
                    success: function (podObject) {
                        var header = $('<h3>').text(podObject.title);
                        var authors = $('<p>').text(podObject.authors);
                        var journal = $('<p>').text(podObject.journal);
                        var year = $('<p>').text(podObject.pubdate);
                        var doi = $('<p>').text(podObject.doi);
                        var player = $('<audio controls>')
                        player.append($('<source src=' + podObject.podurl + '>'));
                        var article = $('<article>');
                        article.append(header, authors, journal, year, doi, player);
                        $('#podbox').append(article);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
});