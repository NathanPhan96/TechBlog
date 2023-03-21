const newComment = async (event) => {
    event.preventDefault();

    const commentTextEl = document.querySelector("#comment-text");
    const content = commentTextEl.value.trim()
    const post_id = window.location.pathname.replace("/", "");

    if(!content){
        alert("You must fill in text for your comment!")
    } else{
        const response = await fetch("/commentRoutes",
        {
            method: "POST",
            body: JSON.stringify({body, post_id}),
            headers: {"Content-Type": "application/json"}
        })

        if(response.ok){
            location.reload()            
        }else{
            alert("Failed to create the comment!")
        }
    }
}
const form = document.querySelector("#comment-form");

form.addEventListener("submit", newComment)