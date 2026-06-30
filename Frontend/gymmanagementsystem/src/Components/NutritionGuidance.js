import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import './NutritionGuidance.css';

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
  const [activeDay, setActiveDay] = useState("Monday");

  // Helper to parse "Breakfast: X, Lunch: Y, Dinner: Z" into an object
  const parseMeals = (planStr) => {
    const meals = { Breakfast: '', Lunch: '', Dinner: '' };
    const parts = planStr.split(', ');
    parts.forEach(part => {
      if (part.startsWith('Breakfast: ')) {
        meals.Breakfast = part.replace('Breakfast: ', '');
      } else if (part.startsWith('Lunch: ')) {
        meals.Lunch = part.replace('Lunch: ', '');
      } else if (part.startsWith('Dinner: ')) {
        meals.Dinner = part.replace('Dinner: ', '');
      }
    });
    return meals;
  };

  const parsedMeals = parseMeals(dietPlan[activeDay]);

  const mealDescriptions = {
    Breakfast: "Start your morning with complex carbs and protein to fuel your active metabolism.",
    Lunch: "Lean protein and high fiber veggies to maintain energy levels throughout the afternoon.",
    Dinner: "Nutrient-dense proteins and healthy fats to support overnight recovery and tissue repair."
  };

  return (
    <div className="nutrition-page">
      <Navigation />
      
      <section className="nutrition-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="nutrition-title">
              Weekly <span className="text-gradient-primary">Nutrition</span> Plan
            </h1>
            <p className="nutrition-subtitle">
              Fuel your training, optimize your recovery, and build healthy nutritional habits with our chef-curated weekly guidelines.
            </p>
          </motion.div>
        </Container>
      </section>

      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* Day Selector Navigation Tabs */}
            <div className="day-selector-nav mb-4">
              {Object.keys(dietPlan).map((day) => (
                <button
                  key={day}
                  className={`day-tab-btn ${activeDay === day ? 'active' : ''}`}
                  onClick={() => setActiveDay(day)}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* Meal Plan Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="meal-plan-card border-0">
                  <Card.Header className="card-header-day">
                    <h3>{activeDay}'s Schedule</h3>
                    <span className="calendar-badge">Nutrition Plan</span>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {/* Breakfast Row */}
                    <div className="meal-item">
                      <div className="meal-type-container">
                        <span className="meal-badge breakfast">Breakfast</span>
                      </div>
                      <div className="meal-details">
                        <h4 className="meal-title">{parsedMeals.Breakfast || "Oatmeal & Fruit"}</h4>
                        <p className="meal-description">{mealDescriptions.Breakfast}</p>
                      </div>
                    </div>

                    {/* Lunch Row */}
                    <div className="meal-item">
                      <div className="meal-type-container">
                        <span className="meal-badge lunch">Lunch</span>
                      </div>
                      <div className="meal-details">
                        <h4 className="meal-title">{parsedMeals.Lunch || "Lean Protein Bowl"}</h4>
                        <p className="meal-description">{mealDescriptions.Lunch}</p>
                      </div>
                    </div>

                    {/* Dinner Row */}
                    <div className="meal-item">
                      <div className="meal-type-container">
                        <span className="meal-badge dinner">Dinner</span>
                      </div>
                      <div className="meal-details">
                        <h4 className="meal-title">{parsedMeals.Dinner || "Salmon & Greens"}</h4>
                        <p className="meal-description">{mealDescriptions.Dinner}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default NutritionGuidance;
