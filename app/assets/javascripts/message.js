$(function(){
  function buildHTML(message){
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
      last_message_id = $('.message:last').data('id');
      var url = location.href.replace("messages","api/messages");
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
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
