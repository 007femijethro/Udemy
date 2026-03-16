CREATE SCHEMA IF NOT EXISTS ud;

CREATE TABLE IF NOT EXISTS ud.course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(140) NOT NULL,
    subtitle VARCHAR(220) NOT NULL,
    instructor VARCHAR(120) NOT NULL,
    category VARCHAR(80) NOT NULL,
    price_usd NUMERIC(6,2) NOT NULL,
    rating NUMERIC(3,2) NOT NULL
);

INSERT INTO ud.course (title, subtitle, instructor, category, price_usd, rating) VALUES
('PHP for Beginners', 'Build dynamic applications from scratch', 'Sarah Lane', 'Development', 39.99, 4.70),
('Mastering PostgreSQL', 'Queries, indexes, and optimization', 'Michael Verne', 'Databases', 44.99, 4.80),
('Full-Stack Web Bootcamp', 'Frontend + backend with real projects', 'Nina Patel', 'Web Development', 59.99, 4.75),
('UI Design Fundamentals', 'Design beautiful and usable interfaces', 'Oliver Gray', 'Design', 29.99, 4.60),
('Data Structures in Practice', 'Think and code like a software engineer', 'Priya Shah', 'Computer Science', 49.99, 4.90),
('API Development with PHP', 'Design, secure and ship REST APIs', 'David Chen', 'Backend', 42.99, 4.65)
ON CONFLICT DO NOTHING;
