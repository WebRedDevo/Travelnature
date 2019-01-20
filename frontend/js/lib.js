(function(){
  var buttonClose = document.querySelector('.close');
  if(buttonClose){
    buttonClose.addEventListener('click', function(){
      window.history.go(-1)
    })
  }
}())
