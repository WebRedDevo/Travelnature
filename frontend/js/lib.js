(function(){
  var buttonClose = document.querySelector('.close');
  if(buttonClose){
    buttonClose.addEventListener('click', function(){
      window.history.go(-1)
    })
  }
}())


let articlePost = document.getElementsByClassName('article-post');

for(let i = 0, max = articlePost.length; i < max; i += 1){
  articlePost[i].onclick = function(){
    return false;
  }
  articlePost[i].addEventListener('click', function(){
    ajaxNews({
      mode: 'on',
      link: this.getElementsByTagName('a')[0].href
    })



  })
}
