import ValentineCard from "./components/ValentineCard";
import { motion } from "framer-motion";
import "./app.css"; 
function App() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500 text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* การ์ดวาเลนไทน์ */}
      <ValentineCard />
    </div>
  );
}

export default App;
