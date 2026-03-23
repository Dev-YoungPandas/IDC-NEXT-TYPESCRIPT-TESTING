// All queries in one place (easier to maintain)

export const GET_DAN_PAGE_QUERY = `
  query GetDanPage {
    pageBy(uri: "/dan-max/") {
      id
      title
      slug
      date
        seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        mediaDetails { width height }
      }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
    }
      dan {
        photographerName
        heroVideo {
        id
        mediaItemUrl
        mimeType
        mediaDetails {
          width
          height
        }
      }
        centerImage {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        frontPageHeading1
        frontPageHeading2
        frontPageHeading3
        frontPageHeading4
        section2Paragraph
        section2Heading1
        section2Heading2
        section2Heading3
        section2Heading4
        section2Count1
        section2Count2
        section2Count3
        section2Count4

        section2Button
        section2ImagePart1 {
          id
          sourceUrl
        }
        section2Image2Part1 {
          id
          sourceUrl
        }
        section2Image3Part1 {
          id
          sourceUrl
        }

        section2Image4Part1 {
        id
          sourceUrl
        }


        section2ImagePart2 {
          id
          sourceUrl
        }
    
        section2Image2Part2 {
          id
          sourceUrl
        }
        section2Image3Part2 {
          id
          sourceUrl
        }

        section2Image4Part2 {
          id
          sourceUrl
        }


        section2ImagePart3 {
          id
          sourceUrl
        }
    
        section2Image2Part3 {
          id
          sourceUrl
        }
        section2Image3Part3 {
          id
          sourceUrl
        }

        section2Image4Part3 {
          id
          sourceUrl
        }


      section3Paragraph1
      section3Paragraph2
      section3Paragraph3
      section3Heading1

        section3Image1 {
          id
          sourceUrl
          altText
        }
        section3Image2 {
          id
          sourceUrl
          altText
        }


        section4Paragraph1
        section4Heading1
        section4Img1{
        id
        sourceUrl
        altText
      }
        section4Img2{
        id
        sourceUrl
        altText
      }
        section4Img3{
        id
        sourceUrl
        altText
      }
        section4Img4{
        id
        sourceUrl
        altText
      }
        section4Img5{
        id
        sourceUrl
        altText
      }
        section4Img6{
        id
        sourceUrl
        altText
      }
      section4Img7{
        id
        sourceUrl
        altText
      }
        section4Img8{
        id
        sourceUrl
        altText
      }
      section4Img9{
        id
        sourceUrl
        altText
      }
      section4Img10{
        id
        sourceUrl
        altText
      }
      section4Img11{
        id
        sourceUrl
        altText
      }
      section4Img12{
        id
        sourceUrl
        altText
      }

      section5Heading
      section5Paragraph
      section5Paragraph2
      section5Paragraph3
      section5Paragraph4
      section5Image{
        id
        sourceUrl
        altText
      }
      danMarquee

      marqueeTopLineImage{
      id
      sourceUrl
      altText
        }

      marqueeBottomLineImage{
      id
      sourceUrl
      altText
        }
      }
    }
  }
`;


export const GET_YUKI_PAGE_QUERY =
  `
 query GetYukiPage {
    pageBy(uri: "/yuki-sato/") {
      id
      title
      slug
      date
        seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        mediaDetails { width height }
      }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
    }
      yuki {
        photographerName
        heroVideo {
        id
        mediaItemUrl
        mimeType
        mediaDetails {
          width
          height
        }
      }
        centerImage {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        frontPageHeading1
        frontPageHeading2
        frontPageHeading3
        frontPageHeading4
        section2Paragraph
        section2Heading1
        section2Heading2
        section2Heading3
        section2Heading4
        section2Count1
        section2Count2
        section2Count3
        section2Count4
        section2Button
        
        section2ImagePart1 {
          id
          sourceUrl
        }
        section2Image2Part1 {
          id
          sourceUrl
        }
        section2Image3Part1 {
          id
          sourceUrl
        }
  
       section2ImagePart2 {
          id
          sourceUrl
        }
    
        section2Image2Part2 {
          id
          sourceUrl
        }
        section2Image3Part2 {
          id
          sourceUrl
        }

    
      section2ImagePart3 {
          id
          sourceUrl
        }
    
      section2Image2Part3 {
          id
          sourceUrl
        }
        section2Image3Part3 {
          id
          sourceUrl
        }

    
      section3Paragraph1
      section3Paragraph2
      section3Paragraph3
      section3Heading1

        section3Image1 {
          id
          sourceUrl
          altText
        }
        section3Image2 {
          id
          sourceUrl
          altText
        }
       
        section3Video1 {
        id
        mediaItemUrl
        mimeType

        }

        section2Video4 {
        id
        mediaItemUrl
        mimeType
        
        }

        section4Paragraph1
        section4Heading1
        section4Img1{
        id
        sourceUrl
        altText
      }
        section4Img2{
        id
        sourceUrl
        altText
      }
        section4Img3{
        id
        sourceUrl
        altText
      }
        section4Img4{
        id
        sourceUrl
        altText
      }
        section4Img5{
        id
        sourceUrl
        altText
      }
        section4Img6{
        id
        sourceUrl
        altText
      }
      section4Img7{
        id
        sourceUrl
        altText
      }
        section4Img8{
        id
        sourceUrl
        altText
      }
      section4Img9{
        id
        sourceUrl
        altText
      }
      section4Img10{
        id
        sourceUrl
        altText
      }
      section4Img11{
        id
        sourceUrl
        altText
      }
      section4Img12{
        id
        sourceUrl
        altText
      }
        section4Img13{
        id
        sourceUrl
        altText
      }

      section4Img14{
        id
        sourceUrl
        altText
      }

      section4Img15{
        id
        sourceUrl
        altText
      }

      section4Img16{
        id
        sourceUrl
        altText
      }

      section4Img17{
        id
        sourceUrl
        altText
      }

      section4Img18{
        id
        sourceUrl
        altText
      }

      section5Heading
      section5Paragraph
      section5Paragraph2
      section5Paragraph3
      section5Paragraph4
      section5Image{
        id
        sourceUrl
        altText
      }

      danMarquee
      marqueeImage{
      id
      sourceUrl
      altText
      
      }

      marqueeTopLineImage{
      id
      sourceUrl
      altText
        }

      marqueeBottomLineImage{
      id
      sourceUrl
      altText
        }
      }


    }
  }

`


export const GET_CAMILLA_PAGE_QUERY =
  `

query GetCamillaPage {
    pageBy(uri: "/camilla-rutherford/") {
      id
    title
    slug
    date
      seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        mediaDetails { width height }
      }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
    }
    camilla {
      photographerName
       heroVideo {
        id
        mediaItemUrl
        mimeType
        mediaDetails {
          width
          height
        }
      }
      centerImage {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      frontPageHeading1
      frontPageHeading2
      frontPageHeading3
      frontPageHeading4
      section2Paragraph
        section2Heading1
        section2Heading2
        section2Heading3
        section2Heading4
        section2Count1
        section2Count2
        section2Count3
        section2Count4
        section2Button

        camillaMotionImage1 {
        id
        sourceUrl
        }

        camillaMotionImage2 {
        id
        sourceUrl
        }

        camillaMotionImage3 {
        id
        sourceUrl
        }

        camillaMotionImage4 {
        id
        sourceUrl
        }

        camillaMotionImage5 {
        id
        sourceUrl
        }

        camillaMotionImage6 {
        id
        sourceUrl
        }

        camillaMotionImage7 {
        id
        sourceUrl

        }

        camillaMotionImage8 {
        id
        sourceUrl
        }

     
        section2ImagePart1 {
          id
          sourceUrl
        }
        section2Image2Part1 {
          id
          sourceUrl
        }
        section2Image3Part1 {
          id
          sourceUrl
        }

        section2Image4Part1 {
        id
          sourceUrl
        }


        section2ImagePart2 {
          id
          sourceUrl
        }
    
        section2Image2Part2 {
          id
          sourceUrl
        }
        section2Image3Part2 {
          id
          sourceUrl
        }

        section2Image4Part2 {
          id
          sourceUrl
        }


        section2ImagePart3 {
          id
          sourceUrl
        }
    
        section2Image2Part3 {
          id
          sourceUrl
        }
        section2Image3Part3 {
          id
          sourceUrl
        }

        section2Image4Part3 {
          id
          sourceUrl
        }

      section3Video1 {
        id
        mediaItemUrl
        mimeType

        }


        section2Video4 {
        id
        mediaItemUrl
        mimeType

        }
      section3Paragraph1
      section3Paragraph2
      section3Paragraph3
      section3Heading1
      
      section3Image1{
        id
        sourceUrl
        altText
      }
      section3Image2{
        id
        sourceUrl
        altText
      }
      
      section4Paragraph1
      section4Heading1
      section4Img1{
        id
        sourceUrl
        altText
      }
      section4Img2{
        id
        sourceUrl
        altText
      }
      section4Img3{
        id
        sourceUrl
        altText
      }
      section4Img4{
        id
        sourceUrl
        altText
      }
      section4Img5{
        id
        sourceUrl
        altText
      }
      section4Img6{
        id
        sourceUrl
        altText
      }
      section4Img7{
        id
        sourceUrl
        altText
      }
      section4Img8{
        id
        sourceUrl
        altText
      }
      section4Img9{
        id
        sourceUrl
        altText
      }
      section4Img10{
        id
        sourceUrl
        altText
      }
      section4Img11{
        id
        sourceUrl
        altText
      }
      section4Img12{
        id
        sourceUrl
        altText
      }

      awardParagraphMain
      awardHeadingMain
      awardMainYear

      aw1Heading
      aw2Heading
      aw3Heading
      aw4Heading
      aw5Heading
      aw6Heading
      aw7Heading
      aw8Heading
      aw9Heading
      aw10Heading
      aw11Heading
      aw12Heading
      aw13Heading
      aw14Heading
      aw15Heading
      aw16Heading
      aw17Heading
      aw18Heading

      aw1Paragraph
      aw2Paragraph
      aw3Paragraph
      aw4Paragraph
      aw5Paragraph

      aw6Paragraph
      aw7Paragraph
      aw8Paragraph
      aw9Paragraph
      aw10Paragraph
      aw11Paragraph
      aw12Paragraph
      aw13Paragraph
      aw14Paragraph
      aw15Paragraph
      aw16Paragraph
      aw17Paragraph
      aw18Paragraph

      aw1Year
      aw2Year
      aw3Year
      aw4Year
      aw5Year
      aw6Year
      aw7Year
      aw8Year
      aw9Year
      aw10Year
      aw11Year
      aw12Year
      aw13Year
      aw14Year
      aw15Year
      aw16Year
      aw17Year
      aw18Year

      aw1Image{
        id
        sourceUrl
        altText
      }

       aw2Image{
        id
        sourceUrl
        altText
      }

       aw3Image{
        id
        sourceUrl
        altText
      }

       aw4Image{
        id
        sourceUrl
        altText
      }

       aw5Image{
        id
        sourceUrl
        altText
      }

       aw6Image{
        id
        sourceUrl
        altText
      }

       aw7Image{
        id
        sourceUrl
        altText
      }

       aw8Image{
        id
        sourceUrl
        altText
      }

       aw9Image{
        id
        sourceUrl
        altText
      }

       aw10Image{
        id
        sourceUrl
        altText
      }

       aw11Image{
        id
        sourceUrl
        altText
      }

       aw12Image{
        id
        sourceUrl
        altText
      }

       aw13Image{
        id
        sourceUrl
        altText
      }

       aw14Image{
        id
        sourceUrl
        altText
      }

       aw15Image{
        id
        sourceUrl
        altText
      }

       aw16Image{
        id
        sourceUrl
        altText
      }

       aw17Image{
        id
        sourceUrl
        altText
      }

       aw18Image{
        id
        sourceUrl
        altText
      }

      section5Heading
      section5Paragraph
      section5Paragraph2
      section5Paragraph3
      section5Paragraph4
      section5Paragraph2Work

      section5Paragraph3Data3
      section5Paragraph4Data4

      
      section5Paragraph3Work
      section5Paragraph4Work
      
      section5Paragraph2Name
      section5Paragraph3Name
      section5Paragraph4Name
      
      section5Image{
        id
        sourceUrl
        altText
      }
      danMarquee
      marqueeImage{
      id
      sourceUrl
      altText
      
      }
      
      section5Paragraph3Image3{
      id
        sourceUrl
        altText
      }
      
      section5Paragraph4Image4{
      id
      sourceUrl
      altText

      }

      marqueeTopLineImage{
      id
      sourceUrl
      altText
        }

      marqueeBottomLineImage{
      id
      sourceUrl
      altText
        }


      }
    }
  }
`


export const GET_SACHA_PAGE_QUERY =
  `
query GetSachaPage {
    pageBy(uri: "/sacha-stejko/") {
      id
    title
    slug
    date
      seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        mediaDetails { width height }
      }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
    }
    sacha {
      photographerName
       heroVideo {
        id
        mediaItemUrl
        mimeType
        mediaDetails {
          width
          height
        }
      }
      centerImage {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      frontPageHeading1
      frontPageHeading2
      frontPageHeading3
      frontPageHeading4
      section2Paragraph
      section2Heading1
      section2Heading2
      section2Heading3
      section2Heading4
      section2Count1
        section2Count2
        section2Count3
        section2Count4
      section2Button
      section2Images {
          id
          sourceUrl
        }
        section2Image2 {
          id
          sourceUrl
        }
        section2Image3 {
          id
          sourceUrl
        }
        section2Image4 {
          id
          sourceUrl
        }
      section3Paragraph1
      section3Paragraph2
      section3Paragraph3
      section3Heading1
      
      section3Image1{
        id
        sourceUrl
        altText
      }
      section3Image2{
        id
        sourceUrl
        altText
      }
      
      section4Paragraph1
      section4Heading1
      section4Img1{
        id
        sourceUrl
        altText
      }
      section4Img2{
        id
        sourceUrl
        altText
      }
      section4Img3{
        id
        sourceUrl
        altText
      }
      section4Img4{
        id
        sourceUrl
        altText
      }
      section4Img5{
        id
        sourceUrl
        altText
      }
      section4Img6{
        id
        sourceUrl
        altText
      }
      section4Img7{
        id
        sourceUrl
        altText
      }
      section4Img8{
        id
        sourceUrl
        altText
      }
      section4Img9{
        id
        sourceUrl
        altText
      }
      section4Img10{
        id
        sourceUrl
        altText
      }
      section4Img11{
        id
        sourceUrl
        altText
      }
      section4Img12{
        id
        sourceUrl
        altText
      }
      
      section5Heading
      section5Paragraph
      section5Paragraph2
      section5Paragraph3
      section5Paragraph4
      section5Paragraph2Work
      section5Paragraph3Work
      section5Paragraph4Work
      section5Paragraph2Name
      section5Paragraph3Name
      section5Paragraph4Name
      
      section5Image{
        id
        sourceUrl
        altText
      }
      danMarquee
      marqueeTopLineImage{
      id
      sourceUrl
      altText
        }

      marqueeBottomLineImage{
      id
      sourceUrl
      altText
        }
      }
    }
  }
`



export const GET_DEAN_PAGE_QUERY =
  `
query GetDeanPage {
    pageBy(uri: "/dean-mackenzie/") {
      id
    title
    slug
    date
      seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        mediaDetails { width height }
      }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
    }
    dean {
      photographerName
       heroVideo {
        id
        mediaItemUrl
        mimeType
        mediaDetails {
          width
          height
        }
      }
      centerImage {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      frontPageHeading1
      frontPageHeading2
      frontPageHeading3
      frontPageHeading4
      section2Paragraph
      section2Heading1
      section2Heading2
      section2Heading3
      section2Heading4
      section2Count1
        section2Count2
        section2Count3
        section2Count4
      section2Button
      section2ImagePart1 {
          id
          sourceUrl
        }
        section2Image2Part1 {
          id
          sourceUrl
        }
        section2Image3Part1 {
          id
          sourceUrl
        }
  
       section2ImagePart2 {
          id
          sourceUrl
        }
    
        section2Image2Part2 {
          id
          sourceUrl
        }
        section2Image3Part2 {
          id
          sourceUrl
        }

    
      section2ImagePart3 {
          id
          sourceUrl
        }
    
      section2Image2Part3 {
          id
          sourceUrl
        }
        section2Image3Part3 {
          id
          sourceUrl
        }
      

        
      section3Paragraph1
      section3Paragraph2
      section3Paragraph3
      section3Heading1
      
      section3Image1{
        id
        sourceUrl
        altText
      }
      section3Image2{
        id
        sourceUrl
        altText
      }
      
      section4Paragraph1
      section4Heading1
      section4Img1{
        id
        sourceUrl
        altText
      }
      section4Img2{
        id
        sourceUrl
        altText
      }
      section4Img3{
        id
        sourceUrl
        altText
      }
      section4Img4{
        id
        sourceUrl
        altText
      }
      section4Img5{
        id
        sourceUrl
        altText
      }
      section4Img6{
        id
        sourceUrl
        altText
      }
      section4Img7{
        id
        sourceUrl
        altText
      }
      section4Img8{
        id
        sourceUrl
        altText
      }
      section4Img9{
        id
        sourceUrl
        altText
      }
      section4Img10{
        id
        sourceUrl
        altText
      }
      section4Img11{
        id
        sourceUrl
        altText
      }
      section4Img12{
        id
        sourceUrl
        altText
      }
      
      section5Heading
      section5Paragraph
      section5Paragraph2
      section5Paragraph3
      section5Paragraph4
      section5Paragraph2Work

      section5Paragraph3Data3

      section5Paragraph3Work
      section5Paragraph4Work
      
      section5Paragraph2Name
      section5Paragraph3Name
      section5Paragraph4Name
      
      section5Image{
        id
        sourceUrl
        altText
      }

       section5Paragraph3Image3{
        id
        sourceUrl
        altText
      }
      danMarquee
      marqueeImage{
      id
      sourceUrl
      altText
      
      }

      marqueeTopLineImage{
      id
      sourceUrl
      altText
        }

      marqueeBottomLineImage{
      id
      sourceUrl
      altText
        }
      }
    }
  }
`



export const GET_GUY_PAGE_QUERY =
  `
query GetGuyPage {
    pageBy(uri: "/guy-coombes/") {
      id
    title
    slug
    date
      seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        mediaDetails { width height }
      }
      twitterTitle
      twitterDescription
      twitterImage { sourceUrl }
    }
    guy {
      photographerName
       heroVideo {
        id
        mediaItemUrl
        mimeType
        mediaDetails {
          width
          height
        }
      }
      centerImage {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      frontPageHeading1
      frontPageHeading2
      frontPageHeading3
      frontPageHeading4
      section2Paragraph
        section2Heading1
        section2Heading2
        section2Heading3
        section2Heading4
        section2Count1
        section2Count2
        section2Count3
        section2Count4
        section2Button
     section2ImagePart1 {
          id
          sourceUrl
        }
        section2Image2Part1 {
          id
          sourceUrl
        }
        section2Image3Part1 {
          id
          sourceUrl
        }

      section2Image4Part1 {
        id
          sourceUrl
        }

      
       section2ImagePart2 {
          id
          sourceUrl
        }
    
      section2Image2Part2 {
          id
          sourceUrl
        }
        section2Image3Part2 {
          id
          sourceUrl
        }

      section2Image4Part2 {
          id
          sourceUrl
        }
     
      
      
      section2ImagePart3 {
          id
          sourceUrl
        }
    
      section2Image2Part3 {
          id
          sourceUrl
        }
        section2Image3Part3 {
          id
          sourceUrl
        }

      section2Image4Part3 {
          id
          sourceUrl
        }
      section3Paragraph1
      section3Paragraph2
      section3Paragraph3
      section3Heading1

        section3Video1 {
        id
        mediaItemUrl
        mimeType

        }

       
      
      section3Image1{
        id
        sourceUrl
        altText
      }
      section3Image2{
        id
        sourceUrl
        altText
      }
      
      section4Paragraph1
      section4Heading1
      section4Img1{
        id
        sourceUrl
        altText
      }
      section4Img2{
        id
        sourceUrl
        altText
      }
      section4Img3{
        id
        sourceUrl
        altText
      }
      section4Img4{
        id
        sourceUrl
        altText
      }
      section4Img5{
        id
        sourceUrl
        altText
      }
      section4Img6{
        id
        sourceUrl
        altText
      }
      section4Img7{
        id
        sourceUrl
        altText
      }
      section4Img8{
        id
        sourceUrl
        altText
      }
      section4Img9{
        id
        sourceUrl
        altText
      }
      section4Img10{
        id
        sourceUrl
        altText
      }
      section4Img11{
        id
        sourceUrl
        altText
      }
      section4Img12{
        id
        sourceUrl
        altText
      }
        section4Img13{
        id
        sourceUrl
        altText
      }
      
      section4Img14{
        id
        sourceUrl
        altText
      }

      section4Img15{
        id
        sourceUrl
        altText
      }

      section4Img16{
        id
        sourceUrl
        altText
      }

      section4Img17{
        id
        sourceUrl
        altText
      }

      section4Img18{
        id
        sourceUrl
        altText
      }

      section4Img19{
        id
        sourceUrl
        altText
      }

      section4Img20{
        id
        sourceUrl
        altText
      }

      section4Img21{
        id
        sourceUrl
        altText
      }

      section4Img22{
        id
        sourceUrl
        altText
      }

      section4Img23{
        id
        sourceUrl
        altText
      }

      section4Img24{
        id
        sourceUrl
        altText
      }

      section4Img25{
        id
        sourceUrl
        altText
      }

      section4Img26{
        id
        sourceUrl
        altText
      }

      section4Img27{
        id
        sourceUrl
        altText
      }

      section4Img28{
        id
        sourceUrl
        altText
      }

      section4Img29{
        id
        sourceUrl
        altText
      }

      section4Img30{
        id
        sourceUrl
        altText
      }
      section5Heading
      section5Paragraph
      section5Paragraph2
      section5Paragraph3
      section5Paragraph4
      section5Paragraph2Work

      section5Paragraph3Work
      section5Paragraph3Data3

      section5Paragraph2Name
      section5Paragraph3Name
      
      awardParagraphMain
      awardHeadingMain
      awardMainYear

      
      aw1Heading
      aw2Heading
      aw1Paragraph
      aw2Paragraph
      aw1Image{
        id
        sourceUrl
        altText
      }

       aw2Image{
        id
        sourceUrl
        altText
      }


      
      section5Image{
        id
        sourceUrl
        altText
      }
      section5Paragraph3Image3{
        id
        sourceUrl
        altText
      }
      danMarquee
      marqueeImage{
      id
      sourceUrl
      altText
      
      }

      marqueeTopLineImage{
      id
      sourceUrl
      altText
        }

      marqueeBottomLineImage{
      id
      sourceUrl
      altText
        }
      }
    }
  }
`


export const GET_HOMEPAGE_QUERY =
  `
query GetHomePage {
    pageBy(uri: "/homepage-idc/") {
      id
      title
      slug
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails { width height }
        }
        twitterTitle
        twitterDescription
        twitterImage { sourceUrl }
      }
      homepageidc {
        photographerName1
        photographerName2
        photographerName3
        photographerName4
        photographerName5
        photographerName6
        photographer1Video1 {
          id
          mediaItemUrl
          mimeType
        }
        photographer2Video2 {
          id
          mediaItemUrl
          mimeType
        }
        photographer3Video3 {
          id
          mediaItemUrl
          mimeType
        }
        photographer4Video4 {
          id
          mediaItemUrl
          mimeType
        }
        photographer5Video5 {
          id
          mediaItemUrl
          mimeType
        }
        photographer6Video6 {
          id
          mediaItemUrl
          mimeType
        }
      }
    }
  }
`






export const GET_PRODUCTION_QUERY = `
  query GetProductionTestimonial {
    pageBy(uri: "/production/") {
      id
      title
      slug
      productionPageData {
        productionTestimonialHeading
        productionTestimonialParagraph1
        productionTestimonialPara1Role1
        productionTestimonialPara1Name1
        productionTestimonialParagraph2
        productionTestimonialPara2Role2
        productionTestimonialPara2Name2
        productionTestimonialParagraph3
        productionTestimonialPara3Role3
        productionTestimonialPara3Name3
        productionTestimonialParagraph4

        productionTestimonialMarqueeHeading
        productionTestimonialMarqueeParagraph
        productionTestimonialMarqueeContact

        productionCtaBgImage {
           sourceUrl
        }

      faqsTitle1
      faqsTitle2
      faqsTitle3
      faqsTitle4
      faqsTitle5

      faqsParagraph1
      faqsParagraph2
      faqsParagraph3
      faqsParagraph4
      faqsParagraph5
        
      }
    }
  }
`;



// Add to src/lib/graphql/queries.js

export const GET_PHOTOGRAPHY_SERVICE_QUERY = `
  query GetProductionTestimonial {
  pageBy(uri: "/photography-service/") {
    id
    title
    slug
    date
    photographyService {
      photographyServiceHerosectionHeading
      photographyServiceHeroBottom1
      photographyServiceHeroBottom2
      photographyServiceHeroBottom3
      photographyServiceHeroBottom4
      photographyServiceSec2Heading
      photographyServiceSec2Paragraph
      photographyServiceSec2AccordionTitle1
      photographyServiceSec2AccordionTitle2
      photographyServiceSec2AccordionTitle3

      faqsTitle1
      faqsTitle2
      faqsTitle3
      faqsTitle4
      faqsTitle5

      faqsParagraph1
      faqsParagraph2
      faqsParagraph3
      faqsParagraph4
      faqsParagraph5
      
    }
    productionPageData {
      productionTestimonialHeading
      productionTestimonialParagraph1
      productionTestimonialPara1Role1
      productionTestimonialPara1Name1
      productionTestimonialParagraph2
      productionTestimonialPara2Role2
      productionTestimonialPara2Name2
     
      productionTestimonialMarqueeHeading
      productionTestimonialMarqueeParagraph
      productionTestimonialMarqueeContact

      productionCtaBgImage{
        sourceUrl
      }

    }
  }
}
`;

// ═══════════════════════════════════════════════════════════════════════════
// ADD this query export to: src/lib/graphql/queries.ts
// ═══════════════════════════════════════════════════════════════════════════

export const GET_TESTIMONIALS_PAGE_QUERY = `
  query GetTestimonialsPage {
    pageBy(uri: "/testimonials/") {
      id
      title
      slug
      date
      testimonials {
        tpHeroHeading

        tpPersonName1
        tpPersonName2
        tpPersonName3
        tpPersonName4
        tpPersonName5
        tpPersonName6

        tpCompanyLogo1 { sourceUrl }
        tpCompanyLogo2 { sourceUrl }
        tpCompanyLogo3 { sourceUrl }
        tpCompanyLogo4 { sourceUrl }
        tpCompanyLogo5 { sourceUrl }
        tpCompanyLogo6 { sourceUrl }

        tpQuoteText1
        tpQuoteText2
        tpQuoteText3
        tpQuoteText4
        tpQuoteText5
        tpQuoteText6

        tpDesignationText1
        tpDesignationText2
        tpDesignationText3
        tpDesignationText4
        tpDesignationText5
        tpDesignationText6

        tpCompanyText1
        tpCompanyText2
        tpCompanyText3
        tpCompanyText4
        tpCompanyText5
        tpCompanyText6

        tpAgencyLogo1 { sourceUrl }
        tpAgencyLogo2 { sourceUrl }
        tpAgencyLogo3 { sourceUrl }
        tpAgencyLogo4 { sourceUrl }
        tpAgencyLogo5 { sourceUrl }
        tpAgencyLogo6 { sourceUrl }
        tpAgencyLogo7 { sourceUrl }
        tpAgencyLogo8 { sourceUrl }
        tpAgencyLogo9 { sourceUrl }
        tpAgencyLogo10 { sourceUrl }
        tpAgencyLogo11 { sourceUrl }
        tpAgencyLogo12 { sourceUrl }
        tpAgencyLogo13 { sourceUrl }
        tpAgencyLogo14 { sourceUrl }
        tpAgencyLogo15 { sourceUrl }
        tpAgencyLogo16 { sourceUrl }

        tpAgencyName1
        tpAgencyName2
        tpAgencyName3
        tpAgencyName4
        tpAgencyName5
        tpAgencyName6
        tpAgencyName7
        tpAgencyName8
        tpAgencyName9
        tpAgencyName10
        tpAgencyName11
        tpAgencyName12
        tpAgencyName13
        tpAgencyName14
        tpAgencyName15
        tpAgencyName16


      sctaHeading
      sctaSubheading
      
      sctaInputFullName
      sctaInputEmail
      sctaInputCompany
      
      sctaBg{
        sourceUrl
      }
      
      sctaFilmStripTop{
        sourceUrl
      }
      
      sctaFilmStripBottom {
        sourceUrl
      }
      }
    }
  }
`;

