document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button.follow').addEventListener('click', event => manageFollow(event.currentTarget));
});

function manageFollow(element) {
    console.log(element.id);
}