"use client";

import { useRef, useState } from "react";
import { content } from "@/data/content";
import { getLenis } from "@/components/lenis-singleton";
import StageTransition from "@/components/StageTransition";
import LoadingScreen from "@/components/LoadingScreen";
import PinScreen from "@/components/PinScreen";
import IntroScreen from "@/components/IntroScreen";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import ReasonsWhy from "@/components/ReasonsWhy";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Distance from "@/components/Distance";
import ReunionList from "@/components/ReunionList";
import Wishes from "@/components/Wishes";
import Surprise from "@/components/Surprise";
import Closing from "@/components/Closing";
import MusicPlayer from "@/components/MusicPlayer";

type Stage = "loading" | "locked" | "intro" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");
  const [showMusicHint, setShowMusicHint] = useState(false);
  // Every fresh page load re-asks for the PIN when one is set — nothing is
  // remembered across visits, so re-opening the link always shows the lock
  // screen again instead of skipping straight to "Open your gift".
  const nextAfterLoading = useRef<"locked" | "intro">(content.accessPin ? "locked" : "intro");

  const handleLoadingDone = () => setStage(nextAfterLoading.current);

  const handleUnlock = () => {
    setStage("intro");
  };

  const handleOpened = () => {
    setStage("main");
    setShowMusicHint(true);
  };

  const handleReplay = () => {
    setStage("intro");
    setShowMusicHint(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <>
      {stage !== "main" ? (
        <StageTransition stageKey={stage}>
          {stage === "loading" ? <LoadingScreen onDone={handleLoadingDone} /> : null}

          {stage === "locked" ? (
            <PinScreen
              pin={content.accessPin}
              partnerName={content.partnerName}
              hint={content.pinHint}
              onUnlock={handleUnlock}
            />
          ) : null}

          {stage === "intro" ? (
            <IntroScreen partnerName={content.partnerName} onOpened={handleOpened} />
          ) : null}
        </StageTransition>
      ) : null}

      <main>
        <Hero
          partnerName={content.partnerName}
          age={content.age}
          birthdayDate={content.birthdayDate}
          photo={content.heroPhoto}
        />

        <LoveLetter
          partnerName={content.partnerName}
          senderName={content.senderName}
          paragraphs={content.loveLetterParagraphs}
        />

        <ReasonsWhy partnerName={content.partnerName} reasons={content.reasonsWhy} />

        <Gallery photos={content.galleryPhotos} />

        <Timeline
          events={content.timeline}
          relationshipStartDateISO={content.relationshipStartDateISO}
          nextMeetupDateISO={content.nextMeetupDateISO}
          nextMeetupLocation={content.nextMeetupLocation}
          nextMeetupWhenLabel={content.nextMeetupWhenLabel}
        />

        <Distance
          paragraphs={content.distanceParagraphs}
          nextMeetupLocation={content.nextMeetupLocation}
          nextMeetupWhenLabel={content.nextMeetupWhenLabel}
        />

        <ReunionList items={content.reunionBucketList} location={content.nextMeetupLocation} />

        <Wishes intro={content.wishesIntro} partnerName={content.partnerName} wishes={content.wishes} />

        <Surprise
          hugMessage={content.hugMessage}
          secretButtonLabel={content.secretButtonLabel}
          secretMessage={content.secretMessage}
          sweetLines={content.sweetLines}
        />

        <Closing
          partnerName={content.partnerName}
          senderName={content.senderName}
          photo={content.closingPhoto}
          onReplay={handleReplay}
        />
      </main>

      <MusicPlayer songUrl={content.songUrl} songTitle={content.songTitle} showHint={showMusicHint} />
    </>
  );
}
