getCookie('token')

/* function getCookie(name) {
    var value = ": " + document.cookie;
    console.log(value);
    var parts = value.split(": " + name + "=");
    console.log(parts);
    console.log(parts.length);
    if (parts.length == 2) return parts.pop().split(":").shift();
  } */

function getCookie(name){
    let data = '; '+document.cookie;
    let cookies = data.split('; '+name+'=').pop();
    console.log(cookies);
    let value = cookies.split('; ').shift();
    return value
}