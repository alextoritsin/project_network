
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button.follow')
    if (button) {
        button.addEventListener('click', event => manageFollow(event.currentTarget));
    }
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


function manageFollow(element) {
    // check button
    const is_followed = element.classList.contains('btn-outline-warning')
    
    // get csrf token
    const csrftoken = getCookie('csfrtoken');
    console.log("Cookie", csrftoken);
    console.log(is_followed);

    
    // fetch(`following/${element.id}`, {
    //     method: 'PUT',
    //     headers: {'X-CSRFToken': csrftoken},
    //     body: JSON.stringify({
    //         followed: is_followed
    //     })
    // })
    //     .then(response => response.json())
    //     .then(() => {
    //         if (followed) {
    //             element.classList.replace('btn-outline-warning', 'btn-outline-primary');
    //             element.innerHTML = 'Follow';
    //         } else {
    //             element.classList.replace('btn-outline-primary', 'btn-outline-warning');
    //             element.innerHTML = 'Unfollow';
    //         }
    //     })
}

