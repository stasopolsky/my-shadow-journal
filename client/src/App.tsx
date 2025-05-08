import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button"; //
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans">
      <header className="text-3xl font-bold mb-6">🕯️ Shadow Journal</header>

      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-lg mb-4">
            "Чи є в мені щось, що я боюсь побачити або прийняти сьогодні?"
          </p>
          <Button variant="default">Додати відповідь</Button>
        </CardContent>
      </Card>

      <section className="bg-muted p-4 rounded-xl">
        <p className="text-sm text-muted-foreground">
          Цей журнал — простір для інтеграції Тіні. Будь чесним, не ідеальним.
        </p>
      </section>
    </div>
  );
}
