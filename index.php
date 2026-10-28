<?php
include 'db.php';

// Add Task Handler
if (isset($_POST['add_task'])) {
    $task_name = trim($_POST['task_name']);
    if (!empty($task_name)) {
        $stmt = $conn->prepare("INSERT INTO tasks (task_name) VALUES (?)");
        $stmt->bind_param("s", $task_name);
        $stmt->execute();
        $stmt->close();
        header("Location: index.php");
        exit();
    }
}

// Delete Task Handler
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $conn->query("DELETE FROM tasks WHERE id = $id");
    header("Location: index.php");
    exit();
}

// Fetch Tasks
$result = $conn->query("SELECT * FROM tasks ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Tracker (MySQL) | Ronamae Cerbito</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
        <h1 class="text-2xl font-bold mb-4 text-cyan-400">📝 Task Tracker (MySQL)</h1>
        
        <!-- Add Task Form -->
        <form method="POST" class="flex gap-2 mb-6">
            <input type="text" name="task_name" placeholder="Enter a new task..." required
                   class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400">
            <button type="submit" name="add_task" 
                    class="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-4 py-2 rounded-lg transition">
                Add
            </button>
        </form>

        <!-- Task List -->
        <div class="space-y-3">
            <?php if ($result->num_rows > 0): ?>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <div class="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                        <span class="break-all"><?php echo htmlspecialchars($row['task_name']); ?></span>
                        <a href="index.php?delete=<?php echo $row['id']; ?>" 
                           class="text-red-400 hover:text-red-300 text-sm font-medium px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition">
                            Delete
                        </a>
                    </div>
                <?php endwhile; ?>
            <?php else: ?>
                <p class="text-center text-slate-500 py-4">No tasks found. Add one above!</p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
