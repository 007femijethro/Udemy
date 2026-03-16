<?php

declare(strict_types=1);

final class Database
{
    public static function connect(): PDO
    {
        $databaseUrl = getenv('DATABASE_URL');

        if ($databaseUrl !== false && $databaseUrl !== '') {
            return self::connectFromUri($databaseUrl);
        }

        $host = getenv('DB_HOST') ?: 'localhost';
        $port = getenv('DB_PORT') ?: '5432';
        $dbname = getenv('DB_NAME') ?: 'udemy_clone';
        $user = getenv('DB_USER') ?: 'postgres';
        $password = getenv('DB_PASSWORD') ?: '';

        $dsn = sprintf('pgsql:host=%s;port=%s;dbname=%s', $host, $port, $dbname);

        return new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }

    private static function connectFromUri(string $databaseUrl): PDO
    {
        $parts = parse_url($databaseUrl);

        if ($parts === false || !isset($parts['host'], $parts['path'])) {
            throw new InvalidArgumentException('Invalid DATABASE_URL provided.');
        }

        $host = $parts['host'];
        $port = (string)($parts['port'] ?? 5432);
        $dbname = ltrim($parts['path'], '/');
        $user = isset($parts['user']) ? rawurldecode($parts['user']) : '';
        $password = isset($parts['pass']) ? rawurldecode($parts['pass']) : '';

        $dsn = sprintf('pgsql:host=%s;port=%s;dbname=%s', $host, $port, $dbname);

        return new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
}
