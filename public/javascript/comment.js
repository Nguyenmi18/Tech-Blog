async function createComment(event) {
	event.preventDefault();
  
	const postId = document.querySelector('input[name="postId"]').value;
	const body = document.querySelector('textarea[name="commentbody"]').value;
  
	const response = await fetch(`/api/comments`, {
	  method: "POST",
	  body: JSON.stringify({
		postId,
		body,
	  }),
	  headers: { "Content-Type": "application/json" },
	});
  
	if (response.ok) {
	  document.location.reload();
	} else {
	  alert(response.statusText);
	}
  }

  document
  .querySelector("#newComment")
  .addEventListener("submit", createComment);