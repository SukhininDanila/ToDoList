$(document).ready(function() {

  function initialState(){
    if (localStorage.getItem('cards') == null) {
      $('#empty').show();
    } else {
      $('#empty').hide();
      $('.list').html(localStorage.getItem('cards'));
    }
  }

  initialState();

  function addToStorage() {
    let content = $('.list').html();
    localStorage.setItem('cards', content);
  }

  function addCard() {
    let name = $('input').val();
    let decl = $('textarea').val();
    if (name.length !== 0 && decl.length !==0) {
      $('input').removeClass('error');
      $('textarea').removeClass('error');
      $('#empty').hide();
      $('.list').append(`
        <div class="card">
          <div class="card-header">
            <h3>${name}</h3>
            <img src="img/close.png" class="card-close">
            <img src="img/show.png" class="card-show">
          </div>
          <div class="declaration">
            <p class="card-declaration">${decl}</p>
          </div>
        </div>
      `);

      name = $('.form-text').val();
      decl = $('.form-textarea').val();
      addToStorage();
    } else {
      $('input').addClass('error');
      $('textarea').addClass('error');
    }
  }

  function deleteCard(item) {
    item.remove();
    let items = $('.card');
    addToStorage();
    if (items.length == 0) {
      $('#empty').show();
      localStorage.removeItem('cards');
    }
  }

  $('.button').on('click', addCard);

  $('body').on('click', '.card-close', function(){
    let item = $(this).parents('.card');
    deleteCard(item);
  });

  function showCard (){
    let showItem = $(this).parent().next('.declaration');
    $(showItem).slideToggle();
  }

  $('.card-show').on('click', function(){
    $(this).toggleClass('arrow');
  });

  $('.card-show').on('click', showCard);

});
