

require('dotenv').config()
// const {generateInterviewReport} = require('./src/services/ai.service')
const app = require("./src/app.js")
const connectDB = require('./src/config/database')

connectDB()

// generateInterviewReport({resume, selfDescription, jobDescription})
//     .then((report) => {
//         console.log("Report generated successfully:")
//         console.log(JSON.stringify(report, null, 2))
//     })
//     .catch((error) => {
//         console.error("Failed to generate report:", error.message)
//     })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

