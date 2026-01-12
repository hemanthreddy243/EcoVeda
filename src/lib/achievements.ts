import { supabase } from './supabase';

export async function initializeUserAchievements(userId: string) {
  try {
    // Get all achievement types
    const { data: achievementTypes, error: typesError } = await supabase
      .from('achievement_types')
      .select('*');

    if (typesError) throw typesError;

    // Create initial achievements for each type
    const achievements = achievementTypes.map(type => ({
      user_id: userId,
      achievement_type: type.id,
      progress: 0,
      completed: false
    }));

    const { error: insertError } = await supabase
      .from('achievements')
      .insert(achievements);

    if (insertError) throw insertError;

    return { success: true };
  } catch (error) {
    console.error('Error initializing achievements:', error);
    return { success: false, error };
  }
}

export async function updateAchievement(userId: string, achievementType: string, progress: number) {
  try {
    // Get the achievement type details
    const { data: typeData, error: typeError } = await supabase
      .from('achievement_types')
      .select('*')
      .eq('id', achievementType)
      .single();

    if (typeError) throw typeError;

    // Update the achievement progress
    const { data: achievement, error: updateError } = await supabase
      .from('achievements')
      .update({ 
        progress,
        completed: progress >= typeData.required_progress
      })
      .eq('user_id', userId)
      .eq('achievement_type', achievementType)
      .select()
      .single();

    if (updateError) throw updateError;

    // If achievement was just completed, award points
    if (achievement.completed && progress === typeData.required_progress) {
      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ 
          points: supabase.raw('points + ?', [typeData.points])
        })
        .eq('id', userId);

      if (pointsError) throw pointsError;

      // Check if user should level up (every 100 points)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      const newLevel = Math.floor(profile.points / 100) + 1;
      
      if (newLevel > Math.floor((profile.points - typeData.points) / 100) + 1) {
        const { error: levelError } = await supabase
          .from('profiles')
          .update({ level: newLevel })
          .eq('id', userId);

        if (levelError) throw levelError;
      }
    }

    return { success: true, achievement };
  } catch (error) {
    console.error('Error updating achievement:', error);
    return { success: false, error };
  }
} 