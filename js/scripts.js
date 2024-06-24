document.addEventListener("DOMContentLoaded", function() {
    const createBlogForm = document.getElementById("createBlogForm");
    const blogList = document.getElementById("blogList");

    createBlogForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/blogs.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                fetchBlogs();
                createBlogForm.reset();
            }
        };
        xhr.send(`action=create&title=${title}&content=${content}`);
    });

    function fetchBlogs() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/blogs.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                blogList.innerHTML = xhr.responseText;
            }
        };
        xhr.send("action=fetch");
    }

    window.editBlog = function(id, title, content) {
        const newTitle = prompt("Edit Title:", title);
        const newContent = prompt("Edit Content:", content);

        if (newTitle !== null && newContent !== null) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/blogs.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    fetchBlogs();
                }
            };
            xhr.send(`action=update&id=${id}&title=${newTitle}&content=${newContent}`);
        }
    };

    window.deleteBlog = function(id) {
        if (confirm("Are you sure you want to delete this blog?")) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/blogs.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    fetchBlogs();
                }
            };
            xhr.send(`action=delete&id=${id}`);
        }
    };

    fetchBlogs();
});
