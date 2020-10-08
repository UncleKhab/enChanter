function d(selector){
    return document.querySelector(selector);
}

let like = document.querySelectorAll(".liked");
let edit = document.querySelectorAll(".edit");

edit.forEach((element) => {
    edit_handler(element);
});

like.forEach((element) => {
    like_handler(element);
});


function like_handler(element) {
    element.addEventListener("click", () =>{
        
        let id = element.getAttribute("data-post_id")
        let like_count = d(`#like_count_${id}`)
        let like_button = d(`#like_button_${id}`)
        
        fetch("/like", {
            method:"POST",
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.json())
        .then(result => {
            like_count.innerText = result.likes
            if (result.liked === false){
                like_button.innerText = 'Like';
            } else {
                like_button.innerText = 'Unlike';
            }
        })
    })
}

function edit_handler(element){
    element.addEventListener("click", () => {
        let post_id = element.getAttribute("data-post_id")
        let content_container = d(`#content_container_${post_id}`)
        let content = d(`#post_content_${post_id}`)
        let button = d(`#edit_button_${post_id}`)
        
        if (button.innerText === "Edit"){
            let input = document.createElement('input')
            input.setAttribute("id", `post_input_${post_id}`);
            input.setAttribute("value", `${content.innerText}`);
            content.style.display = "none";
            content_container.append(input)
            button.innerText = "Save"
        } else {
            let edit_content = d(`#post_input_${post_id}`).value
            fetch("/edit", {
                method:"POST",
                body: JSON.stringify({
                    post_id: post_id,
                    edit_content: edit_content,
                })
            })
            .then(response => response.json())
            .then(result => {
                content.innerText = edit_content
                content.style.display = "block"
                d(`#post_input_${post_id}`).remove()
                button.innerText = "Edit"
            })
            }
        
        
    })
}