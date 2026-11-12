"use client";

import "./PhoneToAvatar.css";
import { PHONE_SHOTS } from "../media.constants";
import { useSound } from "../use-sound";
import { VolumeButton } from "../VolumeButton";
import { usePhoneToAvatar } from "./use-phone-to-avatar";

export function PhoneToAvatar() {
  const { muted, toggle, hoverSound } = useSound();
  const { root, selfie, avatar, near } = usePhoneToAvatar(muted);

  return (
    <section id="phone" ref={root} className="fm-phone">
      <header className="fm-phone-head">
        <h2 className="fm-caps fm-phone-title">
          Just your phone.
          <span>Any phone.</span>
        </h2>
        <p className="fm-phone-lede">Film yourself on whatever phone you have, new or old. Frame turns it into a steady, camera-ready avatar.</p>
      </header>
      <div className="fm-phone-stage" {...hoverSound}>
        <div className="fm-phone-avatar">
          <video ref={avatar} src={near ? PHONE_SHOTS.avatar.video : undefined} poster={PHONE_SHOTS.avatar.src} aria-label={PHONE_SHOTS.avatar.alt} muted loop playsInline preload={near ? "auto" : "none"} />
          <VolumeButton muted={muted} onToggle={toggle} />
        </div>
        <div className="fm-phone-device">
          <div className="fm-phone-screen">
            <video ref={selfie} src={near ? PHONE_SHOTS.selfie.video : undefined} poster={PHONE_SHOTS.selfie.src} aria-label={PHONE_SHOTS.selfie.alt} muted loop playsInline preload={near ? "auto" : "none"} />
            <span className="fm-phone-island" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
