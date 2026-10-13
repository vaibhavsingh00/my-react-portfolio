import { CUSTOM_VIDEO_METADATA } from './videoManifest';

/**
 * Format filename into clean display info.
 * Checks custom metadata registry first, then falls back to intelligent parsing.
 */
export function formatVideoInfo(filename, categoryType = 'personal') {
  // Check custom metadata manifest first
  if (CUSTOM_VIDEO_METADATA && CUSTOM_VIDEO_METADATA[filename]) {
    const meta = CUSTOM_VIDEO_METADATA[filename];
    return {
      title: meta.title || filename,
      client: meta.client || (categoryType === 'client' ? 'Client Project' : 'Personal Project'),
      tag: meta.tag || (categoryType === 'client' ? 'Client' : 'Personal Edit'),
      description: meta.description || '',
      thumbnail: meta.thumbnail || null
    };
  }

  // Strip file extension
  const base = filename.replace(/\.(mp4|webm|mov)$/i, '');

  if (base.startsWith('aryanxpansion_reel_')) {
    return {
      title: 'Aryan Xpansion — Tech Reel',
      client: 'Aryan Xpansion',
      tag: 'Client Reel',
      description: 'Client video reel created for Aryan Xpansion.',
      thumbnail: null
    };
  }

  if (base.startsWith('rawharshh_post_')) {
    return {
      title: 'Raw Harsh — Social Media Edit',
      client: 'Raw Harsh',
      tag: 'Client Post',
      description: 'Short-form visual edit created for Raw Harsh.',
      thumbnail: null
    };
  }

  if (base.startsWith('rawyashhh_reel_')) {
    return {
      title: 'Raw Yash — Motion Reel',
      client: 'Raw Yash',
      tag: 'Client Reel',
      description: 'Motion reel edit produced for Raw Yash.',
      thumbnail: null
    };
  }

  if (base.startsWith('vaibhavs.ai_reel_')) {
    return {
      title: 'Vaibhav AI — Cinematic Vision',
      client: 'Vaibhav Singh',
      tag: 'Personal Edit',
      description: 'Personal AI video concept and cinematic reel by Vaibhav.',
      thumbnail: null
    };
  }

  // General fallback for any new video added in the future
  const cleanTitle = base
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: cleanTitle || filename,
    client: categoryType === 'client' ? 'Client Project' : 'Vaibhav Singh',
    tag: categoryType === 'client' ? 'Client' : 'Personal Edit',
    description: `A video edit from the ${categoryType === 'client' ? 'Client' : 'Personal Edits'} collection.`,
    thumbnail: null
  };
}

/**
 * Load videos using Webpack's require.context
 */
export function getVideosFromContext(reqContext, categoryType) {
  if (!reqContext) return [];

  try {
    const keys = reqContext.keys();
    // Sort keys alphabetically for stable order
    keys.sort();

    return keys.map((key, index) => {
      const filename = key.replace(/^\.\//, '');
      const videoModule = reqContext(key);
      const src = videoModule && videoModule.default ? videoModule.default : videoModule;
      const info = formatVideoInfo(filename, categoryType);

      return {
        id: `${categoryType}-${index + 1}-${filename.replace(/[^a-zA-Z0-9]/g, '_')}`,
        filename,
        src,
        title: info.title,
        displayTitle: info.title,
        seriesIndex: index + 1,
        client: info.client,
        tag: info.tag,
        description: info.description,
        thumbnail: info.thumbnail,
        category: categoryType
      };
    });
  } catch (err) {
    console.error(`Failed to load videos for category "${categoryType}":`, err);
    return [];
  }
}

// Discover supported videos from asset directories using Webpack's require.context
let personalVideos = [];
let clientVideos = [];

try {
  const personalContext = require.context(
    '../assets/video editing/personal',
    false,
    /\.(mp4|webm|mov)$/i
  );
  personalVideos = getVideosFromContext(personalContext, 'personal');
} catch (e) {
  // Gracefully handles non-webpack environments (such as Node / Jest)
}

try {
  const clientContext = require.context(
    '../assets/video editing/client',
    false,
    /\.(mp4|webm|mov)$/i
  );
  clientVideos = getVideosFromContext(clientContext, 'client');
} catch (e) {
  // Gracefully handles non-webpack environments (such as Node / Jest)
}

export { personalVideos, clientVideos };

export function getPersonalVideos() {
  return personalVideos;
}

export function getClientVideos() {
  return clientVideos;
}
