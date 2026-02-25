// All queries in one place (easier to maintain)

export const GET_DAN_PAGE_QUERY = `
  query GetDanPage {
    pageBy(uri: "/dan-max/") {
      id
      title
      slug
      date
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
      section2Button
      section2Images{
        id
        sourceUrl
        altText
        
        
      }
 section2Image2 {
          id
          sourceUrl
        }
        section2Image3 {
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
      marqueeImage{
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
        section2Button
      section2Images{
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
        
      }
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
      }
    }
  }
`