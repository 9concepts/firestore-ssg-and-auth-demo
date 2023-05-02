let count = 0;

export const RenderingCounter = () => {
  count++;

  return <div suppressHydrationWarning={true}>{count} Rendering</div>;
};
