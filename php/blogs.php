<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "blog_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = $_POST['action'];

if ($action == "create") {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $sql = "INSERT INTO blogs (title, content) VALUES ('$title', '$content')";
    $conn->query($sql);
} elseif ($action == "fetch") {
    $sql = "SELECT * FROM blogs ORDER BY created_at DESC";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        echo "<div class='blog-item'>";
        echo "<h3>" . $row['title'] . "</h3>";
        echo "<p>" . $row['content'] . "</p>";
        echo "<div class='actions'>";
        echo "<button onclick=\"editBlog(" . $row['id'] . ", '" . $row['title'] . "', '" . $row['content'] . "')\">Edit</button>";
        echo "<button onclick=\"deleteBlog(" . $row['id'] . ")\">Delete</button>";
        echo "</div>";
        echo "</div>";
    }
} elseif ($action == "update") {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $sql = "UPDATE blogs SET title='$title', content='$content' WHERE id=$id";
    $conn->query($sql);
} elseif ($action == "delete") {
    $id = $_POST['id'];
    $sql = "DELETE FROM blogs WHERE id=$id";
    $conn->query($sql);
}

$conn->close();
?>
