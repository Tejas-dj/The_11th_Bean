# Instagram Feed — Content Guide

How to update the "From the Feed" section on the homepage.

---

## What You Need Each Time

1. The **photo** from the Instagram post (screenshot or download)
2. The **link** to the post (open post on desktop, copy URL from address bar)
3. The **date** it was posted
4. A short **caption** (1–2 lines from the Instagram caption)

---

## Step-by-Step

### Step 1 — Save the photo

Save the Instagram photo into:
```
public/instagram/
```

Name it clearly — no spaces, lowercase:
```
matcha_run_apr26.jpg
counter_morning.jpg
pickleball_apr26.jpg
```

Recommended format: `.jpg` or `.webp` (not `.png` unless it has transparency)
Recommended size: 1080×1080px or larger. The site will crop it automatically.

---

### Step 2 — Open `data/instagram.ts`

The file lives at:
```
data/instagram.ts
```

---

### Step 3 — Add your new post at the TOP

Copy this block and paste it **above** the first entry:

```ts
{
  image: '/instagram/YOUR_FILENAME.jpg',
  caption: 'First 1–2 sentences from your Instagram caption.',
  link: 'https://www.instagram.com/p/PASTE_POST_URL_HERE/',
  date: 'YYYY-MM-DD',
},
```

---

### Step 4 — Remove the oldest entry

Keep the array at **6 entries** total.
Delete the last entry (the oldest one at the bottom of the array) and remove its image from `public/instagram/` if you want to keep things tidy.

---

### Step 5 — Done

Save the file. The homepage updates automatically on the next page load or deploy.

---

## Rules

| ✅ Do | ❌ Don't |
|---|---|
| Keep 6 entries in the array | Leave placeholder entries in once you have real photos |
| Name files with no spaces | Use spaces in filenames (`my photo.jpg` will break) |
| Use `https://www.instagram.com/p/XXXXX/` links | Link to the profile page for individual posts |
| Keep captions short (1–2 sentences) | Paste the full caption — it gets cut off on hover anyway |
| Add newest post at the top | Add new posts at the bottom |

---

## Example Entry (Real)

```ts
{
  image: '/instagram/matcha_run_may3.jpg',
  caption: 'Run. Matcha. Music. A Sunday morning we will not forget.',
  link: 'https://www.instagram.com/p/ABC123xyz/',
  date: '2026-05-03',
},
```
