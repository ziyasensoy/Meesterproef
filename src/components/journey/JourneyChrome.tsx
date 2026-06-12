import AtmosphereLayers from "@/components/journey/AtmosphereLayers";
import DepthHud from "@/components/journey/DepthHud";
import OceanCanvas from "@/components/journey/OceanCanvas";
import SurfaceHorizon from "@/components/journey/SurfaceHorizon";

export default function JourneyChrome() {
  return (
    <>
      <OceanCanvas />
      <SurfaceHorizon />
      <DepthHud />
      <AtmosphereLayers />
    </>
  );
}
