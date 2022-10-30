const fs = require('fs')
const ytdl = require('ytdl-core')
const ytpl = require('ytpl')

const PLAYLIST_URL = ''
const DIST_FOLDER = './files/'

async function getPlaylistVideos() {
    try {
        const playlist = await ytpl(PLAYLIST_URL)
        return playlist.items;
    } catch (error) {
        return false;
    }
}

async function downloadVideo(title, url) {
    const options = { quality: 'highest', filter: 'audioandvideo' }
    try {
        await ytdl(url, options).pipe(fs.createWriteStream(`.${DIST_FOLDER}${title}.mp3`))
        return true
    } catch (error) {
        return false
    }
}

(async () => {
    const videos = await getPlaylistVideos()

    const downloadPromises = Array.from(videos).map(async video => {
        downloadVideo(video.title, video.shortUrl)
    })
    
    await Promise.all(downloadPromises)

    console.log('You are done downloading')
})()
