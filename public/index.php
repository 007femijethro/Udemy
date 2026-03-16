<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/CourseRepository.php';

$courses = [];
$error = null;

try {
    $repository = new CourseRepository(Database::connect());
    $courses = $repository->featured();
} catch (Throwable $exception) {
    $error = $exception->getMessage();
}

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LearnHub - Udemy Style</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="topbar">
    <h1>LearnHub</h1>
    <nav>
        <a href="#">Categories</a>
        <a href="#">My Learning</a>
        <a href="#">Teach on LearnHub</a>
    </nav>
</header>

<main>
    <section class="hero">
        <h2>Skill up to advance your career</h2>
        <p>Learn from world-class instructors with practical courses.</p>
    </section>

    <section class="courses">
        <h3>Featured courses</h3>

        <?php if ($error !== null): ?>
            <p class="error">Database not connected yet: <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></p>
        <?php elseif (count($courses) === 0): ?>
            <p>No courses yet. Run <code>database/schema.sql</code> to seed demo data.</p>
        <?php else: ?>
            <div class="grid">
                <?php foreach ($courses as $course): ?>
                    <article class="card">
                        <h4><?= htmlspecialchars((string)$course['title'], ENT_QUOTES, 'UTF-8'); ?></h4>
                        <p class="subtitle"><?= htmlspecialchars((string)$course['subtitle'], ENT_QUOTES, 'UTF-8'); ?></p>
                        <p><?= htmlspecialchars((string)$course['instructor'], ENT_QUOTES, 'UTF-8'); ?></p>
                        <p><?= htmlspecialchars((string)$course['category'], ENT_QUOTES, 'UTF-8'); ?></p>
                        <div class="meta">
                            <span>⭐ <?= htmlspecialchars((string)$course['rating'], ENT_QUOTES, 'UTF-8'); ?></span>
                            <strong>$<?= htmlspecialchars((string)$course['price_usd'], ENT_QUOTES, 'UTF-8'); ?></strong>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </section>
</main>
</body>
</html>
