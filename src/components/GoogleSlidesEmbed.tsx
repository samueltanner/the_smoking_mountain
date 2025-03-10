const GoogleSlidesEmbed = ({ presentationId }: { presentationId: string }) => {
  const embedUrl = `https://docs.google.com/presentation/d/${presentationId}/embed?slide=id.p1`

  return (
    <div className="relative w-full max-w-md">
      <iframe
        src={embedUrl}
        width="100%"
        height="500"
        frameBorder="0"
        allowFullScreen
        title="Google Slides First Slide"
      />
    </div>
  )
}

export default GoogleSlidesEmbed
