$(document).ready(function () {
    let page = 1;
    let query = '';
    let pageParam = `&page=${page}`;
    const numberOfElements = 28;
    const clientId = 'dZEYgROYfU4jFbuJefupEjAqd9mNWMlNi-9YVuEKm';
    const url = `https://api.unsplash.com/photos/random/?count=${numberOfElements}&client_id=${clientId}&query=`;
    let tempUrl = url;

    getData();

    $("#search-button").click(function () {
        search($("#search").val());
    });

    $(".common-value").click(function () {
        search($(this).text())
    });

    function search(keyWord) {
        page = 1;
        pageParam = `&page=${page}`;
        query = keyWord;
        $("#search-query").text(query);
        $(".current-result").empty();
        getData();
    }

    $("#search").keypress(function(e){
        if(e.which == 13){
            search($("#search").val());
        }
    });

    // $(window).on('wheel', function (event) {
    //     if (event.originalEvent.deltaY > 0) {
    //         const documentHeight = $(document).height();
    //         const scrollTop = $(window).scrollTop();
    //         if (scrollTop + document.body.clientHeight == documentHeight) {
    //             loadNextPage();
    //         }
    //     }
    // });

    $(window).scroll(function () {
        const documentHeight = $(document).height();
        const scrollTop = $(window).scrollTop();
        if (scrollTop + document.body.clientHeight == documentHeight) {
            loadNextPage();
        }
    });

    function getData() {
        tempUrl = url + query + pageParam;
        $.getJSON(tempUrl, function (data, status) {
            if (status == 'success') {
                $.each(data, function (i) {
                    let div = $("<div></div>").addClass('pic').append('<img src=' + data[i].urls.regular + '/>');
                    $(".current-result").append(div);
                });
                prepareModalFunction();
            } else {
                $(".current-search").html("<b>Server not available, try again later</b>");
            }
        });
    }

    function loadNextPage() {
        page++;
        pageParam = `&page=${page}`;
        getData();
    }

    function prepareModalFunction() {
        $("img").click(function () {
            const img = $(this).attr('src');
            $("#show-img").attr('src', img);
            $("#imgmodal").modal('show');
        });
    }
});
