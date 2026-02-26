const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve vendor assets from node_modules
app.use('/vendor/bootstrap.min.css', express.static(
  path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css')
));
app.use('/vendor/chart.umd.js', express.static(
  path.join(__dirname, 'node_modules/chart.js/dist/chart.umd.js')
));

// Sample meeting data (replace with WorkIQ integration)
function getMeetingData() {
  // This will be replaced with actual WorkIQ MCP data
  // For now, using sample data based on your actual meeting stats
  return {
    weekOf: 'Feb 16-22, 2026',
    totalScheduled: 42,
    attended: 11,
    missed: 31,
    totalAttendedTime: '5h 6m',
    dailyBreakdown: [
      { day: 'Mon', scheduled: 8, attended: 2 },
      { day: 'Tue', scheduled: 7, attended: 2 },
      { day: 'Wed', scheduled: 9, attended: 3 },
      { day: 'Thu', scheduled: 10, attended: 2 },
      { day: 'Fri', scheduled: 8, attended: 2 }
    ]
  };
}

// Dashboard route
app.get('/', (req, res) => {
  const meetingData = getMeetingData();
  res.render('index', { meetingData });
});

// API endpoint for meeting data (for future async updates)
app.get('/api/meetings', (req, res) => {
  const meetingData = getMeetingData();
  res.json(meetingData);
});

app.listen(PORT, () => {
  console.log(`Dashboard running at http://localhost:${PORT}`);
});
