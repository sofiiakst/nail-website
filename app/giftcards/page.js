"use client";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import GiftCardsPage from "../components/GiftCardsPage";
import LoyaltyCardsPage from "../components/LoyaltyCardsPage";

export default function Page() {
  return (
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={1}>
        <GiftCardsPage />
      </ParallaxLayer>
      <ParallaxLayer offset={0.5} speed={0.3}>
        <LoyaltyCardsPage />
      </ParallaxLayer>
    </Parallax>
  );
}
