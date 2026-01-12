import { supabase } from './supabase';

export interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  enrolled: number;
  rating: number;
  instructor: string;
  image: string;
  description: string;
  progress: number;
  tags: string[];
}

export async function enrollInCourse(userId: string, courseId: number) {
  try {
    // Check if user is already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingEnrollment) {
      return { success: false, message: 'Already enrolled in this course' };
    }

    // Create new enrollment
    const { error: enrollError } = await supabase
      .from('user_courses')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        enrolled_at: new Date().toISOString()
      });

    if (enrollError) throw enrollError;

    // Update course enrollment count
    const { error: updateError } = await supabase.rpc('increment_course_enrollment', {
      course_id: courseId
    });

    if (updateError) throw updateError;

    return { success: true };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return { success: false, error };
  }
}

export async function getUserCourses(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_courses')
      .select(`
        *,
        course:course_id (
          id,
          title,
          category,
          level,
          duration,
          enrolled,
          rating,
          instructor,
          image,
          description,
          tags
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    return { success: true, courses: data };
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return { success: false, error };
  }
}

export async function updateCourseProgress(userId: string, courseId: number, progress: number) {
  try {
    const { error } = await supabase
      .from('user_courses')
      .update({ progress })
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating course progress:', error);
    return { success: false, error };
  }
} 