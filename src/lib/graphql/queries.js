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
      }
    }
  }

`


