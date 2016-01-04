var leForm = document.forms["url"],
    container = document.getElementById('container'),
    message = document.getElementById('message') ;

leForm.addEventListener('submit', handleSubmit);

function handleSubmit(e){
  var url = leForm['url'].value;
  sendURL(url, submitCallback);
  e.preventDefault()
}

function submitCallback(data){
  var longUrlElem = document.getElementById('long-url')
  var longUrl = window.location.origin + data.uri;
  message.classList.remove('hidden');
  longUrlElem.setAttribute('href', longUrl);
  longUrlElem.innerHTML = longUrl;

}

function sendURL(url, callback, stuff) {
  var xhr = new XMLHttpRequest();

  data = {url: url, customKey: false}

  xhr.open('POST', '/api/v1/url', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    // do something to response
    var responseData = JSON.parse(this.responseText)
    callback(responseData)
  };
  xhr.send(JSON.stringify(data));
}
