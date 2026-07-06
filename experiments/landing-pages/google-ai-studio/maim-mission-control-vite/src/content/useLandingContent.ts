import { useEffect, useState } from 'react';
import type { LandingContent } from './types';

const CMS_CONTENT_URL = import.meta.env.VITE_MAIM_CMS_CONTENT_URL as string | undefined;
const LOCAL_CONTENT_URL = '/cms/maim-command-room-content.json';

export function useLandingContent() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [source, setSource] = useState<'loading' | 'fallback' | 'remote'>('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadContent() {
      const urls = CMS_CONTENT_URL ? [CMS_CONTENT_URL, LOCAL_CONTENT_URL] : [LOCAL_CONTENT_URL];

      for (const url of urls) {
        try {
          const response = await fetch(url, {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          });

          if (!response.ok) continue;

          const nextContent = await response.json() as LandingContent;
          setContent(nextContent);
          setSource(url === CMS_CONTENT_URL ? 'remote' : 'fallback');
          return;
        } catch (error) {
          if ((error as Error).name === 'AbortError') return;
        }
      }

      setSource('fallback');
    }

    void loadContent();

    return () => controller.abort();
  }, []);

  return { content, source };
}
