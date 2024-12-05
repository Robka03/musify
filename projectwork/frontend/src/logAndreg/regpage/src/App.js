import React from "react";
import Navbar from "./Navbar"; // Importáld a Navbar komponenst
import RegistrationForm from "./RegistrationForm"; // Importáld a RegistrationForm komponenst

function App() {
  return (
    <div>
      {/* Navbar megjelenítése */}
      <Navbar />
      
      {/* Regisztrációs form megjelenítése */}
      <div style={styles.pageContainer}>
        <RegistrationForm />
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    marginTop: "20px", // Kicsit lejjebb tolja a formot a Navbar alatt
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;
