import { formatVideoInfo } from './videoService';
import { CUSTOM_VIDEO_METADATA } from './videoManifest';

describe('Video Service & Manifest', () => {
  test('formats known client video filenames with metadata', () => {
    const filename = 'aryanxpansion_reel_DcV3ZayT3RP.mp4';
    const info = formatVideoInfo(filename, 'client');
    expect(info.client).toBe('Aryan Xpansion');
    expect(info.tag).toBe('Client Reel');
    expect(info.title).toContain('Aryan Xpansion');
  });

  test('formats known personal video filenames with metadata', () => {
    const filename = 'vaibhavs.ai_reel_DRycwO7jy9.mp4';
    const info = formatVideoInfo(filename, 'personal');
    expect(info.client).toBe('Vaibhav Singh');
    expect(info.tag).toBe('Personal Edit');
    expect(info.title).toContain('Vaibhav AI');
  });

  test('cleans and humanizes arbitrary new video filenames', () => {
    const filename = 'cinematic_drone_tokyo_night.mp4';
    const info = formatVideoInfo(filename, 'personal');
    expect(info.title).toBe('Cinematic Drone Tokyo Night');
    expect(info.tag).toBe('Personal Edit');
  });

  test('manifest contains valid metadata entries with titles and descriptions', () => {
    expect(CUSTOM_VIDEO_METADATA).toBeDefined();
    const sample = CUSTOM_VIDEO_METADATA['aryanxpansion_reel_DcV3ZayT3RP.mp4'];
    expect(sample).toBeDefined();
    expect(sample.title).toBe('Aryan Xpansion — Tech Reel #1');
    expect(sample.client).toBe('Aryan Xpansion');
  });
});
