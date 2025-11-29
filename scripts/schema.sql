CREATE TABLE IF NOT EXISTS routine_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  series_id VARCHAR(36),
  time_of_day VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  valid_from DATE DEFAULT '2023-01-01',
  valid_to DATE DEFAULT '9999-12-31',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  routine_item_id INT,
  status BOOLEAN DEFAULT FALSE,
  notes TEXT,
  FOREIGN KEY (routine_item_id) REFERENCES routine_items(id),
  UNIQUE KEY unique_log (date, routine_item_id)
);

-- Seed data
INSERT IGNORE INTO routine_items (time_of_day, description, category) VALUES
('08:00 AM', 'L-Citrulline 3000 mg', 'Supplement'),
('08:05 AM', 'Shilajit in warm water', 'Supplement'),
('08:10 AM', 'Tea', 'Diet'),
('09:00 AM', 'Breakfast (1 whole egg, 3 egg whites, Avocado toast, Coffee)', 'Diet'),
('11:00 AM', 'Optional coffee', 'Diet'),
('01:00 PM', 'Lunch (Protein, Sabzi, Carbs, Salad, Dahi)', 'Diet'),
('01:30 PM', 'Omega-3 (1000-2000 mg)', 'Supplement'),
('01:30 PM', 'Multivitamin', 'Supplement'),
('03:30 PM', 'Afternoon Snack (Tea, Almonds, Walnut)', 'Diet'),
('04:00 PM', 'Evening Workout (Strength/Cardio/Steps)', 'Exercise'),
('06:15 PM', 'Post-workout (Protein shake + creatine)', 'Diet'),
('07:30 PM', 'Dinner (Chicken/Salmon, Salad/Veg, No Rice)', 'Diet'),
('09:00 PM', 'Ashwagandha', 'Supplement'),
('09:15 PM', 'Magnesium glycinate', 'Supplement'),
('09:40 PM', 'Psyllium husk', 'Supplement'),
('10:30 PM', 'Sleep Target (7.5-8 hours)', 'Lifestyle');
