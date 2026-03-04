

import "../../styles/camillamotionpage.css"

export default function CamillaMotionPage({ data }: { data?: any }) {


    // console.log(data, "data camillamotion")



    return (
        <div className="camilla-motion-parent">


            <div className="camilla-img-container image-1">
                {/* <img src="https://idc.yp-studio.com/media/2025/02/05110216/Spotlight_Awards_Kids_Winner-Badge-2023.png" alt="" /> */}

                <img src={data?.camillaMotionImage1?.sourceUrl} alt="" />
            </div>

            <div className="camilla-img-container image-2">
                <img src={data?.camillaMotionImage2?.sourceUrl} alt="" />

                {/* <img src="https://idc.yp-studio.com/media/2025/02/05110216/create_winner_seal22.php_.png" alt="" /> */}


            </div>

            <div className="camilla-img-container image-3">

                <img src={data?.camillaMotionImage3?.sourceUrl} alt="" />


            </div>


            <div className="camilla-img-container image-4">

                <img src={data?.camillaMotionImage4?.sourceUrl} alt="" />


            </div>

            <div className="camilla-img-container image-5">

                <img src={data?.camillaMotionImage5?.sourceUrl} alt="" />

            </div>

            <div className="camilla-img-container image-6">

                <img src={data?.camillaMotionImage6?.sourceUrl} alt="" />

            </div>

            <div className="camilla-img-container image-7">
                <img src={data?.camillaMotionImage7?.sourceUrl} alt="" />

            </div>

            <div className="camilla-img-container image-8">

                <img src={data?.camillaMotionImage8?.sourceUrl} alt="" />

            </div>

        </div>
    )




}