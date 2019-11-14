$(function(){
  function buildHTML(message){
    // var date = message.date
    // console.log(message)
    var image = message.image.url?`<img src="${message.image.url}">` : " " ;
      var html =
       `<div class="message" data-id="${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
      return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      });
      return false;
    });
    var reloadMessages = function() {
      if(document.URL.match("/messages")){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('id');
      var url = location.href.replace("messages","api/messages");
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages){
        messages.forEach(function(message){
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        
      })
      .fail(function() {
        alert('error');
      });
      }
    };     
    setInterval(reloadMessages, 7000);
})
