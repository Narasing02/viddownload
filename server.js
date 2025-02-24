
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
    res.send('Hello World!');
});

app.get('/download',async(req,res)=>{
    const url = req.query.url;
    if(!url){
        return res.status(400).json({error: 'Missing URL'});
    }
    try{
       
            const result = await alldl(url);
            console.log(result);// all response same
            res.json(result);
        
    }catch(error){
        console.error('AllDL Error:', error);
        return res.status(500).json({error: 'Failed to process video'});
    }
})

// YouTube Download Endpoint
// app.get('/download/youtube', async (req, res) => {
//     const videoUrl = req.query.url;

//     if (!videoUrl) {
//         return res.status(400).json({ error: 'Missing video URL' });
//     }

//     try {
//         const data = await youtube(videoUrl);
//         console.log('Youtube Response:', data);
//          // Debugging log

//         if (!data || data.length === 0) {
//             return res.status(400).json({ error: 'Could not retrieve download link' });
//         }

//         // Serve the Instagram video directly (if possible) or provide the download URL
//         res.header('Content-Disposition', 'attachment; filename="youtube_video.mp4"');
//         const downloadUrl = data[0].url;
//         const downloadStream = await fetch(downloadUrl);
//         downloadStream.body.pipe(res);
//     } catch (error) {
//         console.error('IGDL Error:', error);
//         return res.status(500).json({ error: 'Failed to process Instagram video' });
//     }
// });

// // Instagram Video Download Endpoint
// app.get('/download/instagram', async (req, res) => {
//     const videoUrl = req.query.url;

//     if (!videoUrl) {
//         return res.status(400).json({ error: 'Missing video URL' });
//     }

//     try {
//         const data = await igdl(videoUrl);
//         console.log('IGDL Response:', data); // Debugging log

//         if (!data || data.length === 0) {
//             return res.status(400).json({ error: 'Could not retrieve download link' });
//         }

//         // Serve the Instagram video directly (if possible) or provide the download URL
//         res.header('Content-Disposition', 'attachment; filename="instagram_video.mp4"');
//         const downloadUrl = data[0].url;
//         const downloadStream = await fetch(downloadUrl);
//         downloadStream.body.pipe(res);
//     } catch (error) {
//         console.error('IGDL Error:', error);
//         return res.status(500).json({ error: 'Failed to process Instagram video' });
//     }
// });

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
