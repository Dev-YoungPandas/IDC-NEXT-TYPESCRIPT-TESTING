import ContactPage from "@/components/contact/ContactPage";
import MenuOverlay from "@/components/home/Menuoverlay";
import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_CONTACT_PAGE } from "@/lib/graphql/queries";
import { Metadata } from "next";

const FALLBACK_TITLE = 'Contact | IDC';
const FALLBACK_DESC =
    'Get in touch with IDC Worldwide — photography production excellence since 1999. Based in Auckland, New Zealand.';


export async function generateMetadata(): Promise<Metadata> {
    try {
        const raw = await fetchGraphQL(GET_CONTACT_PAGE);
        const seo = raw?.pageBy?.seo;

        return {
            title: seo?.title || FALLBACK_TITLE,
            description: seo?.metaDesc || FALLBACK_DESC,
            openGraph: {
                title: seo?.opengraphTitle || seo?.title || FALLBACK_TITLE,
                description: seo?.opengraphDescription || seo?.metaDesc || FALLBACK_DESC,
                ...(seo?.opengraphImage?.sourceUrl && {
                    images: [{
                        url: seo.opengraphImage.sourceUrl,
                        ...(seo.opengraphImage.mediaDetails?.width && { width: Number(seo.opengraphImage.mediaDetails.width) }),
                        ...(seo.opengraphImage.mediaDetails?.height && { height: Number(seo.opengraphImage.mediaDetails.height) }),
                    }],
                }),
            },
            twitter: {
                card: 'summary_large_image',
                title: seo?.twitterTitle || seo?.title || FALLBACK_TITLE,
                description: seo?.twitterDescription || seo?.metaDesc || FALLBACK_DESC,
                ...(seo?.twitterImage?.sourceUrl && {
                    images: [seo.twitterImage.sourceUrl],
                }),
            },
        };
    } catch {
        return { title: FALLBACK_TITLE, description: FALLBACK_DESC };
    }
}

export default async function Contact() {
    let contactData = null;

    try {
        const raw = await fetchGraphQL(GET_CONTACT_PAGE);
        contactData = raw?.pageBy?.contact ?? null;

        // contactData 


    } catch (err) {
        console.error('contact page fetch error:', err);

    }

    return (
        <>

            <MenuOverlay />
            <ContactPage data={contactData} />


        </>
    )
}