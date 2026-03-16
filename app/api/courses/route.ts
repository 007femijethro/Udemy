import { NextResponse } from 'next/server';
import { getFeaturedCourses } from '@/lib/course-service';

export async function GET() {
  const courses = await getFeaturedCourses(12);
  return NextResponse.json({ data: courses });
}
