import { DefaultLayout } from "@/layouts/default-layout";
import { Characters } from "./Characters";
import { CloserLook } from "./CloserLook";
import { Creators } from "./Creators";
import { DotField } from "./DotField";
import { Clips } from "./Clips";
import { Faq } from "./Faq";
import { LineHero } from "./LineHero";
import { PhoneToAvatar } from "./PhoneToAvatar";
import { Translation } from "./Translation";
import { Versus } from "./Versus";

export default function FrameView() {
  return (
    <DefaultLayout mode="dark">
      <div className="frame-page flex-1" data-theme="dark">
        <DotField />
        <main className="relative z-[1]">
          <LineHero />
          <Clips />
          <PhoneToAvatar />
          <CloserLook />
          <Characters />
          <Translation />
          <Creators />
          <Versus />
          <Faq />
        </main>
      </div>
    </DefaultLayout>
  );
}
