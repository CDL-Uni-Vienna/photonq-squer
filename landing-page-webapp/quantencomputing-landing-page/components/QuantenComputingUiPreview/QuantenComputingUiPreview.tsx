import React from "react";

export default function QuantenComputingUiPreview() {
  return (
    <div className={"md:flex justify-between space-y-5 md:space-y-0"}>
      <PreviewComponent
        title={"Learn quantum computing from the start"}
        scr={"/images/blog-screen.png"}
      />
      <PreviewComponent
        title={"Run intuitive experiments"}
        scr={"/images/add-screen.png"}
      />
      <PreviewComponent
        title={"Get results for your experiments"}
        scr={"/images/results-screen.png"}
      />
    </div>
  );
}

function PreviewComponent(props: { title: string; scr: string }) {
  return (
    <div className={"text-center w-full relative"}>
      <img className={"w-full h-auto"} src={props.scr} />
      <p
        className={"font-bold text-xl absolute bottom-0 inset-x-0 text-center"}
      >
        {props.title}
      </p>
    </div>
  );
}
