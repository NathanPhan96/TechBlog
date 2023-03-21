const deleteBtn = document.getElementById("delete");
const post = document.getElementById("post")


const deletePost = async (event) =>{
    event.preventDefault();
    const id = post.getAttribute("post.id");

    const response = await fetch(`/dashboard/${id}`, {
        method: "DELETE"
    })


    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert("Failed to delete the post!");
    }
}

deleteBtn.addEventListener("click", deletePost);