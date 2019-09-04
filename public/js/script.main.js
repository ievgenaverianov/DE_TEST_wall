(function($) {

    var nightModeActive = false;
    var commentDate;

    function deleteBlock() {
        $(".event-footer .delete-icon").click(function(event) {
            event.preventDefault();
            $(this).closest('.event-block').remove();
        });

        $(".comment-footer .delete-icon").click(function(event) {
            event.preventDefault();
            var commentsNumber = $(this).closest('.note-event__comments').children('.note-events__comments-item').length;
            var currentNoteBlock = $(this).closest('.note-event');
            $(this).closest('.note-events__comments-item').remove();
            if (commentsNumber === 1) {
                currentNoteBlock.remove();
            }
        });
    }

    function getDate() {
        var today = new Date();
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var weekDay = days[today.getDay()];
        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        commentDate = weekDay + ' ' +  (month) + "/" + (day) + "/" + today.getFullYear();
    }

    $('.comment-btn').click(function() {
        var text = $('textarea').val();
        if (text.length !== 0) {
            createComment(text);
            $('textarea').val('');
        }
        else {
            console.log('not filled!');
        }
    });

    $('.cancel-btn').click(function() {
            $('textarea').val('');
    });

    function createComment(comval) {
        getDate();
        var sDarkThemeClass = nightModeActive ? "dark-theme" : "";
        temp = '   <section class="event-block note-event ' + sDarkThemeClass + '">\n' +
            '        <div class="event-content">\n' +
            '            <div class="event-icon"><i class="icon note-event-icon"></i></div>\n' +
            '            <div class="note-event__comments">\n' +
            '                <div class="note-events__comments-item">\n' +
            '                    <img src="img/Guy.jpg">\n' +
            '                    <span class="comment-title blue-title">Note by Guy Mariano</span>\n' +
            '                    <p class="comment-content">' + comval + '</p>\n' +
            '                    <div class="comment-footer">\n' +
            '                        <ul>\n' +
            '                            <li><i class="icon insightful-icon"></i>Insightful</li>\n' +
            '                            <li><i class="icon share-comment-icon"></i>Share</li>\n' +
            '                            <li class="comment-date">' + commentDate + '</li>\n' +
            '                        </ul>\n' +
            '                        <i class="icon edit-icon"></i>\n' +
            '                        <i class="icon delete-icon"></i>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="clear_float"></div>\n' +
            '        <div class="event-footer">\n' +
            '            <ul>\n' +
            '                <li><i class="icon reply-icon"></i>Reply</li>\n' +
            '                <li><i class="icon follow-icon"></i>Follow</li>\n' +
            '            </ul>\n' +
            '            <i class="icon delete-icon"></i>\n' +
            '        </div>'
        $( temp ).insertAfter( ".manage-block" );
        deleteBlock();
    }

    $(".night-mode").click(function(event) {
        event.preventDefault();
        $('section').toggleClass('dark-theme');
        $('.manage-block textarea').toggleClass('dark-theme');
        $('body').toggleClass('dark-theme');
        nightModeActive = !nightModeActive;
    });

    deleteBlock();

})(jQuery);
