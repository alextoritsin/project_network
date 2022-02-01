document.addEventListener('DOMContentLoaded', () => {

    // add event listeners to all like icons
    document.querySelectorAll('i').forEach(e => {
        e.addEventListener('click', () => changeLikes(e));
    })

    const button = document.querySelector('button.follow')
    if (button) {
        button.addEventListener('click', event => manageFollow(event.currentTarget));
    }
    
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


function manageFollow(element) {
    // check button
    const is_followed = element.classList.contains('btn-outline-danger')
    
    // get subs element
    let subs = document.querySelector('b.subs')
    console.log(subs.innerHTML);

    // get csrf token
    const token = getCookie('csrftoken');
    
    fetch(`following/${element.id}`, {
        method: 'PUT',
        headers: {'X-CSRFToken': token},
        body: JSON.stringify({
            followed: is_followed
        })
    })
        .then(response => response.json())
        .then(user => {
            console.log(user.followers);
            if (is_followed) {
                element.classList.replace('btn-outline-danger', 'btn-outline-primary');
                element.innerHTML = 'Follow';
            } else {
                element.classList.replace('btn-outline-primary', 'btn-outline-danger');
                element.innerHTML = 'Unfollow';
            }
            subs.innerHTML = user.followers.length;
        })
}

// export default getCookie;