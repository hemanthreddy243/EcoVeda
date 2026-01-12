-- Create fitness_tracking table
CREATE TABLE IF NOT EXISTS fitness_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    steps INTEGER DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    active_minutes INTEGER DEFAULT 0,
    distance_km DECIMAL(10,2) DEFAULT 0,
    heart_rate INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create fitness_goals table
CREATE TABLE IF NOT EXISTS fitness_goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    daily_steps_goal INTEGER DEFAULT 10000,
    daily_calories_goal INTEGER DEFAULT 500,
    daily_active_minutes_goal INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create fitness_history table
CREATE TABLE IF NOT EXISTS fitness_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    steps INTEGER DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    active_minutes INTEGER DEFAULT 0,
    distance_km DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create RLS policies
ALTER TABLE fitness_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitness_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitness_history ENABLE ROW LEVEL SECURITY;

-- Policies for fitness_tracking
CREATE POLICY "Users can view their own fitness tracking data"
    ON fitness_tracking FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own fitness tracking data"
    ON fitness_tracking FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fitness tracking data"
    ON fitness_tracking FOR UPDATE
    USING (auth.uid() = user_id);

-- Policies for fitness_goals
CREATE POLICY "Users can view their own fitness goals"
    ON fitness_goals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own fitness goals"
    ON fitness_goals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fitness goals"
    ON fitness_goals FOR UPDATE
    USING (auth.uid() = user_id);

-- Policies for fitness_history
CREATE POLICY "Users can view their own fitness history"
    ON fitness_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own fitness history"
    ON fitness_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fitness history"
    ON fitness_history FOR UPDATE
    USING (auth.uid() = user_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_fitness_tracking_updated_at
    BEFORE UPDATE ON fitness_tracking
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fitness_goals_updated_at
    BEFORE UPDATE ON fitness_goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fitness_history_updated_at
    BEFORE UPDATE ON fitness_history
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 