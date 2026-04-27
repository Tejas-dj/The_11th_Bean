import { Hero }          from '@/components/home/Hero';
import { ValuesStrip }   from '@/components/home/ValuesStrip';
import { ThreePillars }  from '@/components/home/ThreePillars';
import { OriginHook }    from '@/components/home/OriginHook';
import { MenuPreview }   from '@/components/home/MenuPreview';
import { PodcastTeaser } from '@/components/home/PodcastTeaser';
import { SocialStrip }   from '@/components/home/SocialStrip';
import { ArchDivider }   from '@/components/shared/ArchDivider';

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesStrip />
      <ArchDivider color="#F2E8D9" />
      <ThreePillars />
      <ArchDivider color="#EAE0CE" />
      <OriginHook />
      <ArchDivider color="#F2E8D9" />
      <MenuPreview />
      <ArchDivider color="#FAF7F2" />
      <PodcastTeaser />
      <ArchDivider color="#F2E8D9" />
      <SocialStrip />
    </>
  );
}
