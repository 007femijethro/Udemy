import { prisma } from '@/lib/prisma';

export type CourseCard = {
  id: number;
  title: string;
  subtitle: string;
  instructor: string;
  priceUsd: number;
  rating: number;
};

export async function getFeaturedCourses(limit = 6): Promise<CourseCard[]> {
  const records = await prisma.course.findMany({
    orderBy: [{ rating: 'desc' }, { id: 'asc' }],
    take: limit
  });

  return records.map((record) => ({
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    instructor: record.instructor,
    priceUsd: Number(record.priceUsd),
    rating: Number(record.rating)
  }));
}
