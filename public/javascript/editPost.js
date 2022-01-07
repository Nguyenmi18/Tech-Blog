const postId = document.querySelector('input[name="postId"]').value;

async function updatePostHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('input[name="post-body"]').value;

  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

async function deleteHandler(){
	const response = await fetch(`/api/posts/${postId}`, {
	 method: 'DELETE'
 })

 if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", updatePostHandler);

  document
  .querySelector("#deleteBtn")
  .addEventListener("click", deleteHandler);

