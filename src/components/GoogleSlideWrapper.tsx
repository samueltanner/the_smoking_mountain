const GoogleSlideWrapper = ({
  presentationUrl,
}: {
  presentationUrl?: string
}) => {
  return (
    <div
      className="rounded-3xl overflow-hidden flex items-center justify-center"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "56.25%",
      }}
    >
      <iframe
        src={presentationUrl}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
        title="Google Slides Presentation"
        onWheel={(e) => e.preventDefault()}
      />
    </div>
  )
}

export default GoogleSlideWrapper
