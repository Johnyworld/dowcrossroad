var i = 0;
var readmore = '<br><span class="card-conditions-read-more">여기를 클릭</span>'

// 배열 제목과 번호 콘솔로그에 찍기
function titleNumber(thisArray) {
    for (var j=0; j<thisArray.length; j++) {
        console.log(j);
        console.log(thisArray[j].title);
    }
}

// 랜덤 셔플
function randomShuffle(ar) {
    var j, r, x;
    for (j = ar.length; j; j-=1) { 
        r = Math.floor(Math.random() * j); 
        // j는 배열의 총 길이야 총 길이를 3(0,1,2)으로 치면
        x = ar[j - 1]; // 빈 공간인 x의 자리에 2의 내용을 담았어
        ar[j - 1] = ar[r]; // 2의 자리에 랜덤 아무거나 담았어
        ar[r] = x; // 그 랜덤 아무거나 자리에 2의 내용을 담았어 즉, 서로 순서를 바꾼 것.
        // 그걸 총 길이만큼 반복해
    }
}

// 세팅 내용넣기
function settingsInit() {
    var $sts = $('.card-buttons-settings');
    for (var j=1; j<settingsArray.length; j++) {
        $sts
            .append('<li class="card-settings-list-item clickable">')
            .children('li').eq(j)
            .addClass(settingsArray[j].type)
            .html(settingsArray[j].text);
    }
}
settingsInit();

// 내용넣기
function init() {
    
    var bgAddress = 'url(images/' + crossRoadArray[i].name + '.jpg)';
    
    $('.card-number-now').text( i + 1 );
    $('.card-number-max').text(crossRoadArray.length);
    
    $('.card-title').html(crossRoadArray[i].title);
    $('.card-bg').css('background-image', bgAddress);
    $('.the-condition').html(crossRoadArray[i].condition + readmore);
    $('.card-choices-text').html(crossRoadArray[i].text);
    
    if ( crossRoadArray[i].choice2 != undefined ) {
        $('.card-choices-btns-item').eq(1).removeClass('hide');
    }
    
    if ( crossRoadArray[i].choice3 != undefined ) {
        $('.card-choices-btns-item').eq(2).removeClass('hide');
    }
    
    for ( var j = 0; j < 3; j++ ) {
        var nowChoice = [
            crossRoadArray[i].choice1, 
            crossRoadArray[i].choice2, 
            crossRoadArray[i].choice3
        ];
        $('.card-choices-btns-item').eq(j).html(nowChoice[j]);
    }
    
    for ( var j = 0; j < 3; j++ ) {
        var nowResult = [
            crossRoadArray[i].result1, 
            crossRoadArray[i].result2, 
            crossRoadArray[i].result3
        ];
        $('.card-results-text').eq(j).html(nowResult[j]);
    }
}

// 새 카드 뽑기 - 카드 리셋 
function cardReset() {
    // 카드 뽑는 페이지로 덮어씌우기
    $('.card-draw').removeClass('hide');
    
    // 회색 딤 지우기
    $('.card-main').removeClass('dim');
    
    // 진행화면 리셋
    $('.card-conditions').removeClass('hide');
    $('.card-choices').addClass('hide');
    $('.card-results').addClass('hide');
    $('.card-results-text').addClass('hide');
    
    // 1번 선택지만 빼고 가리기
    $('.card-choices-btns-item').eq(1).addClass('hide');
    $('.card-choices-btns-item').eq(2).addClass('hide');
}

// 카드 진행 (선택지 화면으로)
function showChoice() {
    $('.card-main').addClass('dim');
    $('.card-conditions').addClass('hide');
    $('.card-choices').removeClass('hide');
}

// 카드 결과
function showResult(index) {
    $('.card-choices').addClass('hide');
    $('.card-results').removeClass('hide');
    $('.card-results-text').eq(index).removeClass('hide');
}

// 클릭 이벤트 -----------------------------------------------------
$('.card-btns-start').click( function() {
    $('.card-settings').addClass('hide');
    for ( var j=0; j<settingsArray.length; j++ ) {
        var hasClass = $('.card-settings-list-item').eq(j).hasClass('checked');
        if ( hasClass == false ) {
            continue;
        }
        if ( hasClass == true ) {
            for ( var k=0; k<crossRoadArrayList.length; k++ ) {
                if ( crossRoadArrayList[k].type == settingsArray[j].type ) {
                    crossRoadArray.push( crossRoadArrayList[k] );
                }
            }
        }
    }
    randomShuffle(crossRoadArray); 
    titleNumber(crossRoadArray);
    init();
    $('.the-draw').removeClass('hide');
});

$('.card-settings-list-item.clickable').click( function() {
    var hasClass = $(this).hasClass('checked');
    if ( hasClass == false ) {
        $(this).addClass('checked');
    }
    else if ( hasClass == true ) {
        $(this).removeClass('checked');
    };
});

$('.the-draw').click( function() {
    $('.card-draw').addClass('hide');
});

$('.the-condition').click( function() {
    showChoice();
});

$('.card-choices-btns-item').click( function() {
    var index = $(this).index();
    showResult(index);
});

$('.btn-next-card').click( function() {
    i++;
    if ( i == crossRoadArray.length ) {
        i = 0;
    }
    cardReset();
    init();
});





