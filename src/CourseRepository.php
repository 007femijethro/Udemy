<?php

declare(strict_types=1);

final class CourseRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function featured(int $limit = 6): array
    {
        $query = <<<'SQL'
            SELECT id, title, subtitle, instructor, category, price_usd, rating
            FROM ud.course
            ORDER BY rating DESC, id ASC
            LIMIT :limit
        SQL;

        $statement = $this->pdo->prepare($query);
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->execute();

        return $statement->fetchAll();
    }
}
