import type { Course } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export type CourseCard = {
  id: number;
  title: string;
  subtitle: string;
  instructor: string;
  priceUsd: number;
  rating: number;
};

const fallbackCourses: CourseCard[] = [
  {
    id: 1,
    title: 'Build a Modern Web App with Next.js 14',
    subtitle: 'Routing, data fetching, and deployment essentials',
    instructor: 'Platform Team',
    priceUsd: 19.99,
    rating: 4.8
  },
  {
    id: 2,
    title: 'TypeScript for Production Applications',
    subtitle: 'Type-safe architecture patterns and tooling',
    instructor: 'Platform Team',
    priceUsd: 24.99,
    rating: 4.7
  },
  {
    id: 3,
    title: 'PostgreSQL Fundamentals for Developers',
    subtitle: 'Modeling, indexing, and query optimization',
    instructor: 'Platform Team',
    priceUsd: 21.99,
    rating: 4.6
  },
  {
    id: 4,
    title: 'Caching Strategies with Redis',
    subtitle: 'Practical caching patterns for scale',
    instructor: 'Platform Team',
    priceUsd: 17.99,
    rating: 4.5
  },
  {
    id: 5,
    title: 'Stripe Payments Integration',
    subtitle: 'Checkout flows, webhooks, and subscriptions',
    instructor: 'Platform Team',
    priceUsd: 22.99,
    rating: 4.7
  },
  {
    id: 6,
    title: 'CI/CD for Full-Stack Teams',
    subtitle: 'Automated testing and release workflows',
    instructor: 'Platform Team',
    priceUsd: 18.99,
    rating: 4.6
  }
];

export async function getFeaturedCourses(limit = 6): Promise<CourseCard[]> {
  try {
    const records = await prisma.course.findMany({
      orderBy: [{ rating: 'desc' }, { id: 'asc' }],
      take: limit
    });

    return records.map((record: Course) => ({
      id: record.id,
      title: record.title,
      subtitle: record.subtitle,
      instructor: record.instructor,
      priceUsd: Number(record.priceUsd),
      rating: Number(record.rating)
    }));
  } catch (error) {
    console.error('Failed to load courses from database, serving fallback data.', error);
    return fallbackCourses.slice(0, limit);
  }
}
