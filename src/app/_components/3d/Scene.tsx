"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./Model";

type Props = {
  activeMenu: string;
};

export default function Scene({ activeMenu }: Props) {
  return (
    <div className="fixed top-0 h-screen w-full">
      <Canvas>
        <Model activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
