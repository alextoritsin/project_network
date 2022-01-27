document.addEventListener('DOMContentLoaded', () => {

    // add query selectors to all like icons
    document.querySelectorAll('i').forEach(e => {
        e.addEventListener('click', () => changeLikes(e));
    })

});

// get CSRF token cookie
// https://docs.djangoproject.com/en/4.0/ref/csrf/#acquiring-the-token-if-csrf-use-sessions-and-csrf-cookie-httponly-are-false
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// changing likes count
function changeLikes(element) {

    // define the action: was it like or dislike
    const is_liked = element.className == 'bi bi-heart like' ? true : false;
    
    // get csrftoken
    const csrftoken = getCookie('csrftoken');
    
    // send AJAX to change likes count
    fetch(`likes/${element.id}`, {
        method: 'PUT',
        headers: {'X-CSRFToken': csrftoken},
        body: JSON.stringify({
            liked: is_liked
        })
    })
        .then(responce => responce.json())
        .then(post => {

            // get the number of likes
            let likes = post.likes.length;

            // change icon appearance based on action
            if (is_liked) {
                element.classList.replace("bi-heart", "bi-heart-fill");
                element.nextElementSibling.innerHTML = likes;
            } else {
                element.classList.replace("bi-heart-fill", "bi-heart");
                element.nextElementSibling.innerHTML = likes > 0 ? likes : '';
            }
            
        })
}