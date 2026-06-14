/** Clouds in the upper sky only  kept away from the title area. */
export default function IntroClouds() {
  return (
    <div className="intro-clouds" aria-hidden="true">
      <div className="intro-cloud intro-cloud--far intro-cloud--a" />
      <div className="intro-cloud intro-cloud--far intro-cloud--b" />
      <div className="intro-cloud intro-cloud--mid intro-cloud--d" />
      <div className="intro-cloud intro-cloud--far intro-cloud--g" />
      <div className="intro-cloud intro-cloud--mid intro-cloud--h" />
      <div className="intro-cloud intro-cloud--far intro-cloud--i" />
      <div className="intro-cloud intro-cloud--mid intro-cloud--j" />
    </div>
  );
}
