function readUserData() {
    const jsonData = localStorage.getItem("user");

    if (jsonData) {
        const userData = JSON.parse(jsonData);

        const fullNameElement = document.getElementById("fullName");
        fullNameElement.innerText = `${userData.firstName} ${userData.lastName}`;

        const fullNamePreviewElement =
            document.getElementById("fullNamePreview");
        fullNamePreviewElement.innerText = `${userData.firstName} ${userData.lastName}`;

        const userNameElement = document.getElementById("userName");
        userNameElement.innerText = userData.userName;

        const emailElement = document.getElementById("email");
        emailElement.innerText = userData.email;

        const passwordElement = document.getElementById("password");
        passwordElement.innerText = userData.password;
    } else {
        window.location = "/";
    }
}

function addCommentHandler() {
    const commentInput = document.getElementById("commentText");
    const commentText = commentInput.value;
    if (commentText && commentText.trim().length > 0) {
        const comments = document.getElementById("comments");
        comments.innerHTML += `<div class="row mt-1">
                                        <div class="col-sm-9">
                                            <p class="mb-0">${commentText}</p>
                                        </div>
                                        <div onclick="removeComment('${commentText}')" class="col-sm-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </div>
                                    </div>`;
        commentInput.value = "";

        saveComment(commentText);
    }
}

function saveComment(comment) {
    // read
    const commentsJson = localStorage.getItem("comments");
    let comments = [];
    if (commentsJson) {
        comments = JSON.parse(commentsJson);
    }

    // edit
    comments.push(comment);

    // write
    const resultJson = JSON.stringify(comments);
    localStorage.setItem("comments", resultJson);
}

function readComments() {
    const commentsJson = localStorage.getItem("comments");

    if (commentsJson) {
        const comments = JSON.parse(commentsJson);

        for (const comment of comments) {
            const comments = document.getElementById("comments");
            comments.innerHTML += `<div class="row mt-1">
                                        <div class="col-sm-9">
                                            <p class="mb-0">${comment}</p>
                                        </div>
                                        <div onclick="removeComment('${comment}')" class="col-sm-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </div>
                                    </div>`;
        }
    }
}

function removeComment(comment) {
    const commentsJson = localStorage.getItem("comments");

    if(commentsJson) {
        // remove in local storage
        let comments = JSON.parse(commentsJson);
        comments = comments.filter(c => c != comment);
        const jsonResult = JSON.stringify(comments);
        localStorage.setItem("comments", jsonResult);

        // remove in html
        const commentsContainer = document.getElementById("comments");
        for (const child of commentsContainer.children) {
            const div = child.firstElementChild;
            const p = div.firstElementChild;
            const text = p.innerHTML;
            if(text === comment) {
                commentsContainer.removeChild(child);
                break;
            }
        }
    }
}

readUserData();
readComments();
