const { alldl } = require('rahad-all-downloader');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Log incoming requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, it\'s my first deployment!');
});

app.get('/download', async (req, res) => {
    const url = req.query.url;

    // Check if URL is missing from query
    if (!url) {
        return res.status(400).json({ error: 'Missing URL' });
    }

    try {
        // Attempt to process the download with 'alldl'
        const result = await alldl(url);
        console.log(result); // Debugging: Log the result

        // Send back the result as JSON
        res.json(result);
    } catch (error) {
        console.error('AllDL Error:', error); // Log the error

        // Return a 500 status with a generic error message
        return res.status(500).json({ error: 'Failed to process video' });
    }
});

// YouTube Download Endpoint (Uncomment if needed)
// app.get('/download/youtube', async (req, res) => {
//     const videoUrl = req.query.url;
//     if (!videoUrl) {
//         return res.status(400).json({ error: 'Missing video URL' });
//     }

//     try {
//         const data = await youtube(videoUrl);
//         console.log('Youtube Response:', data);

//         if (!data || data.length === 0) {
//             return res.status(400).json({ error: 'Could not retrieve download link' });
//         }

//         res.header('Content-Disposition', 'attachment; filename="youtube_video.mp4"');
//         const downloadUrl = data[0].url;
//         const downloadStream = await fetch(downloadUrl);
//         downloadStream.body.pipe(res);
//     } catch (error) {
//         console.error('Youtube Error:', error);
//         return res.status(500).json({ error: 'Failed to process YouTube video' });
//     }
// });

// Instagram Video Download Endpoint (Uncomment if needed)
// app.get('/download/instagram', async (req, res) => {
//     const videoUrl = req.query.url;
//     if (!videoUrl) {
//         return res.status(400).json({ error: 'Missing video URL' });
//     }

//     try {
//         const data = await igdl(videoUrl);
//         console.log('Instagram Response:', data);

//         if (!data || data.length === 0) {
//             return res.status(400).json({ error: 'Could not retrieve download link' });
//         }

//         res.header('Content-Disposition', 'attachment; filename="instagram_video.mp4"');
//         const downloadUrl = data[0].url;
//         const downloadStream = await fetch(downloadUrl);
//         downloadStream.body.pipe(res);
//     } catch (error) {
//         console.error('Instagram Error:', error);
//         return res.status(500).json({ error: 'Failed to process Instagram video' });
//     }
// });

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
