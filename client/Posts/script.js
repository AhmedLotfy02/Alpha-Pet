var settingsmenu = document.querySelector(".settings-menu");
var darkBtn = document.getElementById("dark-btn");

function settingsMenuToggle() {
    settingsmenu.classList.toggle("settings-menu-height");
}

function SeeProfile() {
    
}

function GotoHome() {

}

function ReturntoSignup() {

}

darkBtn.onclick = function() {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");
    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
}

if (localStorage.getItem("theme") == "light") {
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");    
}
else if (localStorage.getItem("theme") == "dark") {
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");    
}
else {
    localStorage.setItem("theme", "light");
}

function AddPost() {
	let postText = document.getElementById('concerns').value;
	if(postText == "") return;
	
	document.getElementById('concerns').value = "";
    let newPost = document.querySelector(".post-container.hidden").cloneNode(true);
	newPost.childNodes[3].innerHTML = postText;
	newPost.classList.remove('hidden');
	
	let token = localStorage.getItem("token");
	let type = localStorage.getItem("type");
	
	$.ajax({
	   url: `http://localhost:5000/${type}Posts/`,
	   type: 'POST',
	   contentType: 'application/json',
	   data: JSON.stringify({
		   content: postText
	   }),
	   headers: {
		  'Authorization': `Bearer ${token}"`
	   },
	   success: function (result) {
		   console.log(result.data.insertId);
		   newPost.setAttribute('data-id', `id${result.data.insertId}`);
		   newPost.setAttribute('data-type', `${type}`);
		   newPost.setAttribute('data-expanded', `0`);
		   let mainContent = document.querySelector(".main-content");
		   newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('id'+result.data.insertId);
		   newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add(type);
		   newPost.children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
		   newPost.children[0].children[0].children[1].children[0].innerHTML = `${localStorage.getItem("fName")} ${localStorage.getItem("lName")}`;
		   newPost.children[3].children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
		   mainContent.insertBefore(newPost, mainContent.childNodes[4]);
	   },
	   error: function (error) {
			console.log(error);
	   }
	});
}

function AddComment(e) {
	let post = e.parentElement.parentElement.parentElement;
	let postId = e.parentElement.parentElement.parentElement.getAttribute('data-id');
	let postType = e.parentElement.parentElement.parentElement.getAttribute('data-type');
	post.setAttribute('data-expanded', `1`);
	
	console.log(`.${postId} .${postType}`);
	console.log(post);
	let commentText = document.querySelector(`.${postId}.${postType}`).value;
	if(commentText == "") return;
	
	document.querySelector(`.${postId}.${postType}`).value = "";
    let newComment = document.querySelector(".comment.hidden").cloneNode(true);
	newComment.children[1].children[1].innerHTML = commentText;
	newComment.classList.remove('hidden');
	// console.log(newComment);
	
	let token = localStorage.getItem("token");
	let type = localStorage.getItem("type");
	
	$.ajax({
	   url: `http://localhost:5000/${type}Comments?postType=${postType}`,
	   type: 'POST',
	   contentType: 'application/json',
	   data: JSON.stringify({
			content: commentText,
			postId: postId.substring(2)
	   }),
	   headers: {
			'Authorization': `Bearer ${token}"`
	   },
	   success: function (result) {
		   post.children[3].insertBefore(newComment, post.children[3].children[post.children[3].children[length-1]]);
		   newComment.children[0].setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
		   newComment.children[1].children[0].innerHTML = `${localStorage.getItem("fName")} ${localStorage.getItem("lName")}`;
	    },
	    error: function (error) {
			console.log(error);
	   }
	});
}

function loadAllPosts() {
	
	document.getElementById('main-profile-image').setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
	document.getElementById('post-profile-image').setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
	document.getElementById('username-in-post').innerHTML = `${localStorage.getItem("fName")} ${localStorage.getItem("lName")}`;
	
	
	$.ajax({
	   url: `http://localhost:5000/ownerPosts`,
	   type: 'GET',
	   contentType: 'application/json',
	   headers: {
			
	   },
	   success: function (result) {
			result.data.forEach((post) => {
				let newPost = document.querySelector(".post-container.hidden").cloneNode(true);
				newPost.childNodes[3].innerHTML = post.Post_Content;
				newPost.classList.remove('hidden');
			    newPost.setAttribute('data-id', `id${post.P_Id}`);
				newPost.setAttribute('data-type', `owner`);
				newPost.setAttribute('data-expanded', `0`);
				newPost.children[0].children[0].children[1].children[0].innerHTML = `${post.fName} ${post.lName}`;
				
				let mainContent = document.querySelector(".main-content");
			    newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('id'+post.P_Id);
			    newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('owner');
				newPost.children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${post.email}.jpg`);
				newPost.children[3].children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
			    mainContent.insertBefore(newPost, mainContent.childNodes[4]);
			});
			console.log(result.data[0]);
	    },
	    error: function (error) {
			console.log(error);
	   }
	});
	
	$.ajax({
	   url: `http://localhost:5000/vetPosts`,
	   type: 'GET',
	   contentType: 'application/json',
	   headers: {
			
	   },
	   success: function (result) {
			result.data.forEach((post) => {
				let newPost = document.querySelector(".post-container.hidden").cloneNode(true);
				newPost.childNodes[3].innerHTML = post.Post_Content;
				newPost.classList.remove('hidden');
			    newPost.setAttribute('data-id', `id${post.P_Id}`);
				newPost.setAttribute('data-type', `vet`);
				newPost.setAttribute('data-expanded', `0`);
				newPost.children[0].children[0].children[1].children[0].innerHTML = `${post.fName} ${post.lName}`;
				
				let mainContent = document.querySelector(".main-content");
			    newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('id'+post.P_Id);
			    newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('vet');
				newPost.children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${post.email}.jpg`);
				newPost.children[3].children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
			    mainContent.insertBefore(newPost, mainContent.childNodes[4]);
			});
			console.log(result.data.length);
	    },
	    error: function (error) {
			console.log(error);
	   }
	});
	
	$.ajax({
	   url: `http://localhost:5000/pharmacistPosts`,
	   type: 'GET',
	   contentType: 'application/json',
	   headers: {
			
	   },
	   success: function (result) {
			result.data.forEach((post) => {
				let newPost = document.querySelector(".post-container.hidden").cloneNode(true);
				newPost.childNodes[3].innerHTML = post.Post_Content;
				newPost.classList.remove('hidden');
			    newPost.setAttribute('data-id', `id${post.P_Id}`);
				newPost.setAttribute('data-type', `pharmacist`);
				newPost.setAttribute('data-expanded', `0`);
				newPost.children[0].children[0].children[1].children[0].innerHTML = `${post.fName} ${post.lName}`;
				
				let mainContent = document.querySelector(".main-content");
			    newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('id'+post.P_Id);
			    newPost.children[3].children[newPost.children[3].children.length-1].children[1].classList.add('pharmacist');
				newPost.children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${post.email}.jpg`);
				newPost.children[3].children[0].children[0].children[0].setAttribute('src', `http://localhost:5000/images/${localStorage.getItem("email")}.jpg`);
			    mainContent.insertBefore(newPost, mainContent.childNodes[4]);
			});
			console.log(result.data.length);
	    },
	    error: function (error) {
			console.log(error);
	   }
	});
}

window.onload = loadAllPosts;

function loadCommentsOfPost(e) {
	let post = e.parentElement.parentElement.parentElement;
	let postId = e.parentElement.parentElement.parentElement.getAttribute('data-id');
	let postType = e.parentElement.parentElement.parentElement.getAttribute('data-type');
	
	if(post.getAttribute('data-expanded') == '1'){
		let l = post.children[3].children.length;
		while(post.children[3].children.length > 1) {
			post.children[3].removeChild(post.children[3].children[1]);
		}
		// post.children[3].innerHTML = post.children[3].children[0];
		post.setAttribute('data-expanded', `0`);
		return;
	}
	post.setAttribute('data-expanded', `1`);
	$.ajax({
	    url: `http://localhost:5000/${postType}Posts/comments/${postId.substring(2)}`,
	    type: 'GET',
	    contentType: 'application/json',
	    data: JSON.stringify({
		
	    }),
	    headers: {
		 
	    },
		success: function (result) {
		   result.data.forEach((comment) => {
				let newComment = document.querySelector(".comment.hidden").cloneNode(true);
				newComment.children[1].children[1].innerHTML = comment.COMMENT_CONTENT;
				newComment.classList.remove('hidden');
				newComment.children[1].children[0].innerHTML = `${comment.fName} ${comment.lName}`;
				newComment.children[0].setAttribute('src', `http://localhost:5000/images/${comment.email}.jpg`);
				console.log(comment);
				post.children[3].insertBefore(newComment, post.children[3].children[post.children[3].children[length-1]]);
			});
	    },
	    error: function (error) {
			console.log(error);
	   }
	});
}