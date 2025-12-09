// This file is auto-generated based on the public/videos directory structure.
// In a real app, this would be fetched from an API or generated at build time.

export const VIDEO_GROUPS = {
    'Brainrot': ['brainrot', 'memes', 'mountains'],
    'Information': ['news', 'tech']
};

export const TOPICS = [
    'Brainrot', // derived from brainrot/brainrot
    'Mountains', // derived from brainrot/mountains
    'News',      // derived from information/news
    'Tech',      // derived from information/tech
    'Events'     // New Local Events
    // 'Memes' skipped as empty
];

export const VIDEOS_BY_CATEGORY = {
    'Brainrot': [
        '/videos/brainrot/brainrot/brainrot_1.mp4',
        '/videos/brainrot/brainrot/brainrot_2.mp4',
        '/videos/brainrot/brainrot/brainrot_3.mp4',
    ],
    'Mountains': [
        '/videos/brainrot/mountains/Caught the lights.—📍 Saxer Lücke, Switzerland 🇨🇭#switzerland #mountains #swissalps #hikingadv.mp4',
        '/videos/brainrot/mountains/Climb. Conquer. Repeat.🧗_♂️💯Missing those  kind of great adventures lately..😮_💨.for more 👉🀮mp4',
        '/videos/brainrot/mountains/Day six of the Lofoten Crossing 🌞🌞🌞🌞.mp4',
        '/videos/brainrot/mountains/High winds… no problem ⛺️The Pioneer lite 2 standing strong up in the highlands of Scotland. It’.mp4',
        '/videos/brainrot/mountains/My ascent of the Matterhorn 10.08.2025 🏔️..With my climbing partner @franckguide74 .Follow my a.mp4',
        '/videos/brainrot/mountains/Nearing that time of year where this video must be reposted 🤣Scotland’s weather is not for the .mp4',
        '/videos/brainrot/mountains/This one was a total heartbreaker. Could you see what happened Did you see what I was lining up .mp4',
    ],
    'News': [
        '/videos/information/news/info_1.mp4',
        '/videos/information/news/info_2.mp4',
        '/videos/information/news/info_3.mp4',
    ],
    'Tech': [
        '/videos/information/tech/Did you know this terminal shortcut Comment below! ⚡.mp4',
        '/videos/information/tech/Do you want another way to do subdomain enumeration Use this tool. 👀#SubdomainEnumeration #ethi.mp4',
        '/videos/information/tech/We just dropped Nano Banana Pro, built on Gemini 3. 🍌🔘 Generate infographics and diagrams with.mp4',
    ],
    'Events': [
        '/videos/events/local_jazz_fest.mp4',
        '/videos/events/farmers_market.mp4',
        '/videos/events/tech_meetup.mp4'
    ]
};

// Helper to get videos for a whole group (e.g. all Brainrot)
export const getVideosForGroup = (groupName) => {
    const categories = VIDEO_GROUPS[groupName] || [];
    let allVideos = [];
    // capitalize first letter to match keys in VIDEOS_BY_CATEGORY
    // Actually, let's just map explicitly
    categories.forEach(cat => {
        const key = cat.charAt(0).toUpperCase() + cat.slice(1);
        if (VIDEOS_BY_CATEGORY[key]) {
            allVideos = [...allVideos, ...VIDEOS_BY_CATEGORY[key]];
        }
    });
    return allVideos;
};
