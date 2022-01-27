document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('i').forEach(e => {
        e.addEventListener('click', () => changeLikes(e))
        e.cla
    })

});

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

function changeLikes(element) {
    const is_liked = element.className == 'bi bi-heart like' ? true : false;
    const csrftoken = getCookie('csrftoken');
    fetch(`likes/${element.id}`, {
        method: 'PUT',
        headers: {'X-CSRFToken': csrftoken},
        body: JSON.stringify({
            liked: is_liked
        })
    })
        .then(responce => responce.json())
        .then(post => {
            console.log(post.likes);
            let likes = post.likes.length;

            if (is_liked) {
                element.classList.replace("bi-heart", "bi-heart-fill");
                element.nextElementSibling.innerHTML = likes;
            } else {
                element.classList.replace("bi-heart-fill", "bi-heart");
                element.nextElementSibling.innerHTML = likes > 0 ? likes : '';
            }
            
            console.log("Count:", post.likes.length);
        })
       

        
        
    
    // if (element.className == 'bi bi-heart like') {
    //     fetch(`/likes/${element.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             liked: true
    //         })
    //     })
    //         .then(responce => responce.json())
    //         .then(post => {
    //             console.log(post.likes.length);
    //         })
    //         .then(function() {
    //             element.classList.replace("bi-heart", "bi-heart-fill");
    //         })
        
    // } else {
    //     fetch(`/likes/${element.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             liked: false
    //         })
    //     })
    //         .then(function() {
    //             element.classList.replace("bi-heart-fill", "bi-heart");
    //         })
    // }
}