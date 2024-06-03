import express from "express"; // ייבוא הספריה express
import bodyParser from "body-parser"; // ייבוא הספריה body-parser
import fs from "fs"; // ייבוא המודול fs לניהול קבצים

const app = express(); // יצירת אובייקט express
const port = 3000; // הגדרת הפורט שבו השרת יפעל

// Middleware לניתוח JSON
app.use(bodyParser.json()); // שימוש ב-body-parser לניתוח בקשות JSON

// טיפול בבקשת GET
app.get("/", (req, res) => {
  // יצירת נתיב GET ל-root
  res.send("Welcome to my server!"); // שליחת תגובה "Welcome to my server!"
});
--
// טיפול בבקשת POST
app.post("/data", (req, res) => {
  // יצירת נתיב POST ל-/data
  const receivedData = req.body; // קבלת נתוני JSON מבקשת ה-POST
  console.log("Received JSON data:", receivedData); // הדפסת הנתונים שהתקבלו ל-console

  // כתיבת הנתונים לקובץ חדש
  fs.writeFile(
    "receivedData.json", // שם הקובץ לכתיבה
    JSON.stringify(receivedData, null, 2), // המרת הנתונים ל-JSON עם עיצוב
    (err) => {
      // פונקציית callback לטיפול בשגיאות או הצלחה
      if (err) {
        // אם יש שגיאה בכתיבת הקובץ
        console.error("Error writing file:", err); // הדפסת שגיאה ל-console
        res.status(500).json({ message: "Error writing file" }); // שליחת תגובת שגיאה ללקוח
      } else {
        // אם הקובץ נכתב בהצלחה
        res.json({
          message: "Data successfully received and saved to file", // שליחת תגובה על הצלחה ללקוח
          data: receivedData, // הנתונים שהתקבלו
        });
      }
    }
  );
});

app.listen(port, () => {
  // הפעלת השרת להאזנה לפורט שהוגדר
  console.log(`Server is running on port ${port}`); // הדפסת הודעה ל-console שהשרת פועל
});
