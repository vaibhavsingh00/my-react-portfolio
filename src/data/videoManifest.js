/**
 * Video Manifest and Metadata Registry
 * 
 * HOW TO MANAGE VIDEOS:
 * 1. Automatic Discovery:
 *    Drop any new supported video (.mp4, .webm, .mov) directly into:
 *    - src/assets/video editing/personal/ (for personal edits)
 *    - src/assets/video editing/client/   (for client videos)
 *    The build system (Webpack via require.context) will automatically detect and include them.
 * 
 * 2. Custom Metadata (Optional):
 *    If you want to give a video a custom title, client name, description,
 *    or a custom thumbnail image instead of the auto-generated one, add an entry to
 *    `CUSTOM_VIDEO_METADATA` below using the exact filename.
 */

export const CUSTOM_VIDEO_METADATA = {
  // --- Client Videos ---
  'aryanxpansion_reel_DcV3ZayT3RP.mp4': {
    title: 'Aryan Xpansion — Tech Reel #1',
    client: 'Aryan Xpansion',
    description: 'High-energy tech & lifestyle social media reel with dynamic pacing.',
    tag: 'Client Reel'
  },
  'aryanxpansion_reel_DcdlrSfTsF5.mp4': {
    title: 'Aryan Xpansion — Tech Reel #2',
    client: 'Aryan Xpansion',
    description: 'Cinematic visual reel featuring smooth transitions and sound design.',
    tag: 'Client Reel'
  },
  'aryanxpansion_reel_DdBnVL5TMGA.mp4': {
    title: 'Aryan Xpansion — Tech Reel #3',
    client: 'Aryan Xpansion',
    description: 'Fast-paced storytelling edit designed for maximum Instagram engagement.',
    tag: 'Client Reel'
  },
  'aryanxpansion_reel_Dd_cZYeopDn.mp4': {
    title: 'Aryan Xpansion — Tech Reel #4',
    client: 'Aryan Xpansion',
    description: 'Color-graded short-form video edit with custom typography overlays.',
    tag: 'Client Reel'
  },
  'rawharshh_post_DW1Ngj_TkhN.mp4': {
    title: 'Raw Harsh — Creator Spotlight #1',
    client: 'Raw Harsh',
    description: 'Visual storytelling reel showcasing creative lifestyle moments.',
    tag: 'Client Post'
  },
  'rawharshh_post_DXEgPeDTD-I.mp4': {
    title: 'Raw Harsh — Creator Spotlight #2',
    client: 'Raw Harsh',
    description: 'Engaging social media post edit with audio-visual synchronization.',
    tag: 'Client Post'
  },
  'rawharshh_post_DXrHRd2z9M6.mp4': {
    title: 'Raw Harsh — Creator Spotlight #3',
    client: 'Raw Harsh',
    description: 'Punchy motion cuts, rhythmic sound design, and vibrant color grade.',
    tag: 'Client Post'
  },
  'rawharshh_post_DXtsnLok7GK.mp4': {
    title: 'Raw Harsh — Creator Spotlight #4',
    client: 'Raw Harsh',
    description: 'Short-form visual hook designed to capture viewer attention instantly.',
    tag: 'Client Post'
  },
  'rawharshh_post_DY10BKLyxjW.mp4': {
    title: 'Raw Harsh — Creator Spotlight #5',
    client: 'Raw Harsh',
    description: 'Dynamic visual sequences with clean transitions and sound fx.',
    tag: 'Client Post'
  },
  'rawharshh_post_DZPf0fFy3ZN.mp4': {
    title: 'Raw Harsh — Creator Spotlight #6',
    client: 'Raw Harsh',
    description: 'High-retention reel edit optimized for social media algorithms.',
    tag: 'Client Post'
  },
  'rawharshh_post_DdGn4oDTBW6.mp4': {
    title: 'Raw Harsh — Creator Spotlight #7',
    client: 'Raw Harsh',
    description: 'Cinematic reel edit with speed ramping and subtle motion blur.',
    tag: 'Client Post'
  },
  'rawyashhh_reel_DUasxzNiJVK.mp4': {
    title: 'Raw Yash — Motion Reel #1',
    client: 'Raw Yash',
    description: 'Aesthetic motion video edit featuring ambient soundscapes.',
    tag: 'Client Reel'
  },
  'rawyashhh_reel_DUnm5zECDk0.mp4': {
    title: 'Raw Yash — Motion Reel #2',
    client: 'Raw Yash',
    description: 'Snappy pacing with beat-matched cuts for Instagram Reels.',
    tag: 'Client Reel'
  },
  'rawyashhh_reel_DWEZaIvj9iD.mp4': {
    title: 'Raw Yash — Motion Reel #3',
    client: 'Raw Yash',
    description: 'Vibrant color grading and crisp audio mastering.',
    tag: 'Client Reel'
  },
  'rawyashhh_reel_DYkTG_Cojqy.mp4': {
    title: 'Raw Yash — Motion Reel #4',
    client: 'Raw Yash',
    description: 'Creative short-form edit emphasizing visual contrast and flow.',
    tag: 'Client Reel'
  },
  'rawyashhh_reel_DYo9zAkPSoH.mp4': {
    title: 'Raw Yash — Motion Reel #5',
    client: 'Raw Yash',
    description: 'Smooth kinetic typography and background music synchronization.',
    tag: 'Client Reel'
  },
  'rawyashhh_reel_DZIiYz5P6Qh.mp4': {
    title: 'Raw Yash — Motion Reel #6',
    client: 'Raw Yash',
    description: 'Impactful closing reel with custom sound design and grading.',
    tag: 'Client Reel'
  },

  // --- Personal Edits ---
  'vaibhavs.ai_reel_DRycwO7jy9.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #1',
    client: 'Vaibhav Singh',
    description: 'Self-produced AI concept video exploring future tech and visual identity.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DT0bJbgjxak.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #2',
    client: 'Vaibhav Singh',
    description: 'Creative visual experiment blending AI animation with cinematic pacing.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DUGllFJj-pW.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #3',
    client: 'Vaibhav Singh',
    description: 'Deep narrative edit with immersive audio composition and visual FX.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DUV5yNVDyK2.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #4',
    client: 'Vaibhav Singh',
    description: 'Futuristic motion design reel exploring generative art aesthetics.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DUbCKkwj3TU.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #5',
    client: 'Vaibhav Singh',
    description: 'Dynamic concept reel with atmospheric sound design.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DV9GQnSj9ch.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #6',
    client: 'Vaibhav Singh',
    description: 'High-fidelity cinematic reel exploring AI video rendering and storytelling.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DVxs3yrj6O9.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #7',
    client: 'Vaibhav Singh',
    description: 'Extended visual reel highlighting cutting-edge editing workflows.',
    tag: 'Personal Edit'
  },
  'vaibhavs.ai_reel_DXGV7KKj5Q1.mp4': {
    title: 'Vaibhav AI — Cinematic Vision #8',
    client: 'Vaibhav Singh',
    description: 'Fast-paced AI reel featuring seamless visual continuity.',
    tag: 'Personal Edit'
  }
};
