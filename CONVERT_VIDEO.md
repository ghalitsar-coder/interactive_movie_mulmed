# Video Conversion Guide

## Problem

Browser tidak mendukung format `.MOV` dengan baik. Video perlu dikonversi ke `.MP4` untuk kompatibilitas maksimal.

## Solution: Convert MOV to MP4

### Opsi 1: Using FFmpeg (Recommended - Gratis & Cepat)

#### Install FFmpeg

**Windows:**

1. Download dari https://ffmpeg.org/download.html
2. Extract dan tambahkan ke PATH
3. Atau install via Chocolatey: `choco install ffmpeg`

**Mac:**

```bash
brew install ffmpeg
```

#### Convert Single File

```bash
ffmpeg -i "input-file.MOV" -vcodec h264 -acodec aac "output-file.mp4"
```

#### Convert All MOV Files in Folder

**Windows (PowerShell):**

```powershell
Get-ChildItem *.MOV | ForEach-Object {
    ffmpeg -i $_.Name -vcodec h264 -acodec aac ($_.BaseName + ".mp4")
}
```

**Mac/Linux:**

```bash
for i in *.MOV; do ffmpeg -i "$i" -vcodec h264 -acodec aac "${i%.MOV}.mp4"; done
```

### Opsi 2: Online Converter (Mudah, Tidak Perlu Install)

1. **CloudConvert** - https://cloudconvert.com/mov-to-mp4
2. **FreeConvert** - https://www.freeconvert.com/mov-to-mp4
3. **Online-Convert** - https://www.online-convert.com/

### Opsi 3: VLC Media Player (Gratis)

1. Buka VLC
2. Media → Convert/Save
3. Add file MOV
4. Convert
5. Profile: Video - H.264 + MP3 (MP4)
6. Save

## Your Files to Convert

```
public/videos/video-ke-1.mov → public/videos/video-ke-1.mp4
public/videos/1.a alur cerita kelas.MOV → public/videos/1.a alur cerita kelas.mp4
public/videos/1.b alur cerita nongkrong.MOV → public/videos/1.b alur cerita nongkrong.mp4
public/videos/2.pergi.MOV → public/videos/2.pergi.mp4
```

## Quick FFmpeg Commands for Your Project

```bash
cd "public/videos"

# Convert all your files
ffmpeg -i "video-ke-1.mov" -vcodec h264 -acodec aac "video-ke-1.mp4"
ffmpeg -i "1.a alur cerita kelas.MOV" -vcodec h264 -acodec aac "1.a alur cerita kelas.mp4"
ffmpeg -i "1.b alur cerita nongkrong.MOV" -vcodec h264 -acodec aac "1.b alur cerita nongkrong.mp4"
ffmpeg -i "2.pergi.MOV" -vcodec h264 -acodec aac "2.pergi.mp4"
```

## After Conversion

Update file extensions in `src/data/story-data.ts`:

- Change `.mov` and `.MOV` to `.mp4`

## Video Optimization (Optional)

For better performance:

```bash
# Compress video (smaller file size)
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset fast -acodec aac output.mp4

# Resize to 720p (faster loading)
ffmpeg -i input.mp4 -vf scale=-1:720 -vcodec h264 -acodec aac output.mp4
```
