function ajaxNews(settings){
  if(settings.mode === 'on'){
    const xhr = new XMLHttpRequest();
    const parser = new DOMParser();
    var dom;
    let loc = window.location.href;

    history.pushState(null, null, settings.link)
    xhr.open('GET', settings.link, true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
          dom = parser.parseFromString(xhr.responseText, 'text/html');
          dom = dom.querySelector('article');
          dom.classList.add('fixed');

          if(document.querySelector('.modalera')){
            document.querySelector('.modalera').appendChild(dom)

          }else{
            let div = document.createElement('div');
            div.className = 'modalera';
            document.querySelector('main').after(div);
            document.querySelector('.modalera').appendChild(dom);
          }

          setTimeout(function(){
            document.body.className = 'mode-read';
            document.querySelector('.modalera').scrollTo(0,0)
          }, 90)



          document.querySelector('.modalera').addEventListener('click',function(e){
            let target = e.target;
            if(target.className === 'modalera' ){
              history.pushState(null, null, loc)
              document.body.className = ''
              target.innerHTML = '';
            }
          })
      }
    }
  }
}
