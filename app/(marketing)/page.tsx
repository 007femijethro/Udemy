import { getFeaturedCourses } from '@/lib/course-service';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const courses = await getFeaturedCourses(6);

  return (
    <main className="container">
      <header className="topbar">
        <h1>Ud Platform</h1>
        <div className="nav">
          <span>Categories</span>
          <span>My Learning</span>
          <span>Instructor</span>
        </div>
      </header>

      <section className="hero">
        <h2>Next.js + PostgreSQL architecture for a Udemy-like platform</h2>
        <p className="muted">
          Ready for Redis caching, Stripe billing, and media delivery integrations.
        </p>
      </section>

      <section>
        <h3>
          Featured courses <span className="badge">ud.course</span>
        </h3>
        <div className="grid">
          {courses.map((course) => (
            <article className="card" key={course.id}>
              <h4>{course.title}</h4>
              <p className="muted">{course.subtitle}</p>
              <p>{course.instructor}</p>
              <div className="meta">
                <span>⭐ {course.rating.toFixed(2)}</span>
                <strong>${course.priceUsd.toFixed(2)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
