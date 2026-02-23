import "../../styles/herosection.css";


export default function Herosection({data}: {data:any}) {



  return (
    <div className="hero-image">

      <img
        src={data.centerImage?.sourceUrl}
        alt={data.centerImage?.altText || data.photographerName}
        fetchPriority="high"
        loading="eager"
        decoding="sync"
      />
    </div>
  )
}