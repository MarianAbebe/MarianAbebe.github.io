"use client";
import { useRouter } from "next/navigation";

export function IntroActions() {
  const router = useRouter();
  const enter = (remember: boolean) => { if (remember) localStorage.setItem("mission-intro-seen", "true"); router.push("/mars"); };
  return <div className="intro-actions"><button className="primary-button" onClick={() => enter(true)}>INITIATE LAUNCH <span aria-hidden="true">→</span></button><button className="text-button" onClick={() => enter(true)}>SKIP INTRO</button></div>;
}
