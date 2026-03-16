import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export type CourseCard = {
  id: number;
  title: string;
  subtitle: string;
  instructor: string;
  priceUsd: number;
  rating: number;
};

type CourseWithInstructor = Prisma.CourseGetPayload<{
  include: {
    instructor: {
      include: {
        user: true;
      };
    };
  };
}>;

export async function getFeaturedCourses(limit = 6): Promise<CourseCard[]> {
  const records: CourseWithInstructor[] = await prisma.course.findMany({
    orderBy: [{ rating: 'desc' }, { id: 'asc' }],
    take: limit,
    include: {
      instructor: {
        include: {
          user: true
        }
      }
    }
  });

  return records.map((record: CourseWithInstructor) => ({
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    instructor: record.instructor.user.fullName,
    priceUsd: Number(record.priceUsd),
    rating: Number(record.rating)
  }));
}
