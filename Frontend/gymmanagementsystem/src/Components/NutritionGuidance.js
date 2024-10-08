import React, { useState } from 'react';

const NutritionGuidance = () => {
  const initialPlan = {
    Monday: "Breakfast: Oatmeal, Lunch: Grilled Chicken Salad, Dinner: Salmon with Quinoa",
    Tuesday: "Breakfast: Greek Yogurt, Lunch: Turkey Wrap, Dinner: Stir-fried Veggies with Tofu",
    Wednesday: "Breakfast: Smoothie, Lunch: Quinoa Bowl, Dinner: Beef Tacos",
    Thursday: "Breakfast: Scrambled Eggs, Lunch: Lentil Soup, Dinner: Baked Cod with Broccoli",
    Friday: "Breakfast: Chia Pudding, Lunch: Chicken Caesar Salad, Dinner: Shrimp Stir-fry",
    Saturday: "Breakfast: Protein Pancakes, Lunch: Tuna Salad, Dinner: Veggie Pizza",
    Sunday: "Breakfast: Fruit Bowl, Lunch: Grilled Veggie Sandwich, Dinner: Roast Chicken with Sweet Potatoes",
  };

  const [dietPlan] = useState(initialPlan);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Weekly Nutrition Guidance</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Object.keys(dietPlan).map((day) => (
          <li key={day} style={{ marginBottom: '20px' }}>
            <h4>{day}</h4>
            <p>{dietPlan[day]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionGuidance;
